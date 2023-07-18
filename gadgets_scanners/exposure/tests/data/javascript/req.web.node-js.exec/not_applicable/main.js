'use strict';

const Fsm = require('./fsm');
const WebServer = require('./web-server-express');
const upd_writeable_interface = require('./upd_interface/Upd_EncryptedWritable_interface');
const upd_readonly_interface = require('./upd_interface/Upd_EncryptedReadOnly_interface');
const sflash_params = require('./sflash_params/sflash_params');
const DataModel = require('./data-model');
const commonUtil = require('./common-utils');
var ErdCacheEngine = require('./erdcache/ErdCacheEngine');
var system = require('./Log_manager');
var Shell = require('shelljs');

const STATE_CHANGE_DELAY_MS = 1000;

module.exports = (backEnd, localWiFiNetworkControl, appliance, heartbeatClient, xmppClient) => {
  var log = system.getLogger('Commissioning');
  let _backEnd = backEnd;
  let _wifiControl = localWiFiNetworkControl;
  let _appliance = appliance;
  let states = {};
  let nwStateNames = Object.keys(Constants.NW_STATUS_VALUES);
  let fsm = null;
  let currentState = Constants.NW_STATUS_VALUES.uninitialized;
  let ReconnectingTimeoutObj = null;
  let wpa_status_interval_obj = null;
  let connectingTimeoutObj = null;
  let apModeTimeoutObj = null;
  let webServer = null;
  let wpa_disp_status = "";
  let nwStateDispInterval = null;
  var upgradeLog = system.getLogger('FBS');

  const _dataModel = DataModel.Api;
  const _erd = DataModel.ErdList;

  ErdCacheEngine.initialize();
  webServer = WebServer();

  backEnd.on("hello", () => {
    log.info("Received hello message from backend !");
    ErdCacheEngine.rebuildSubscriptionTable();
  });

  function nwStateErdChangeHandler (erd, data) {
    if (erd == _erd.ERD_NETWORK_STATE) {
      if (currentState != data) {
        if ((currentState != Constants.NW_STATUS_VALUES.uninitialized)
          && ((data == Constants.NW_STATUS_VALUES.off)
          || ((data == Constants.NW_STATUS_VALUES.ap) && (currentState == Constants.NW_STATUS_VALUES.off))
          || ((data == Constants.NW_STATUS_VALUES.connectedButOff) && (currentState == Constants.NW_STATUS_VALUES.connected))
          || ((data == Constants.NW_STATUS_VALUES.reconnecting) && (currentState == Constants.NW_STATUS_VALUES.connectedButOff)))) {
          stateChange(data);
        }
        else {
          log.warn("Invalid network state transition request from backend. State: ", data);
          _dataModel.ErdWrite(_erd.ERD_NETWORK_STATE, currentState);
        }
      }
    }
    else log.error("6003 handler called for ", erd.toString());
  };

  _dataModel.AddErdOnChangeHandler(_erd.ERD_SOFTWARE_UPDATE, (erd, data) => {
    log.info("Received ERD 0x602C: ", data);
    if(currentState == Constants.NW_STATUS_VALUES.uninitialized) {
      log.info("reverting the ERD 602c as commissioning is not initialized");
      _dataModel.ErdWrite(_erd.ERD_SOFTWARE_UPDATE, 0);
      return;
    }
    if(data == 1) {
      log.info("Enabling software upgrade via web server");
      webServer.setSoftwareUpdate(1);
      /** As of now considering the ERD gets called in off state only */
      stateChange(Constants.NW_STATUS_VALUES.ap);
    } else {
      log.info("Disabling software upgrade via web server");
      webServer.setSoftwareUpdate(0);
    }
  });

  function display_wpa_status() {
    log.info("Network State: ", sflash_params.GetNetworkStateParameter());
    log.info("WPA State: ", wpa_disp_status);
  }

  function check_wpa_status() {
    return new Promise(function (resolve, reject) {
      if (sflash_params.GetNetworkStateParameter() === Constants.NW_STATUS_VALUES.connected) {
        _wifiControl.wpaCurrentStatus(function (err, status) {
          if (err) {
            log.error("WPA status check: ", err);
            reject("reconnect");
          }
          else {
            wpa_disp_status = status.wpa_state;
            if ((status.wpa_state === 'DISCONNECTED')) {
              log.info("WPA State: " + status.wpa_state);
              reject("reconnect");
            } else {
              resolve("connected");
            }
          }
        });
      } else {
        reject();
      }
    });
  }

  /**
   * check_wpa_status_cb - Implemented as recursive timeout callback function.
   */
  function check_wpa_status_cb() {
    check_wpa_status()
    .then((status) => {
      wpa_status_interval_obj = setTimeout(check_wpa_status_cb, Constants.WIFI_CHECK_STATUS_INTERVAL);
    })
    .catch((err_status)=> {
      if (err_status === "reconnect") {
        log.info("Disconnected, trying to reconnect...");
        startReconnecting();
      }
    })
  }

  // Create and start ERD cache engine on appliance discovery completion
  function ApplianceDiscoveryComplete() {
    log.info("Appliance discovery complete!");
    ErdCacheEngine.erdCacheEngineCreate(null);  // use Default cache
    ErdCacheEngine.erdCacheEngineStart();
  }

  /* If the APT is not received within 15 minutes when in AP Mode,
   * the commissioning state machine should transition to Off.
   */
  const apModeTimeoutHandler = () => {
    if (Constants.NW_STATUS_VALUES.ap === sflash_params.GetNetworkStateParameter()) {
      log.info("No APT received, switching back to OFF state.");
      stateChange(Constants.NW_STATUS_VALUES.off);
    }
  };

  function wifiOff() {
    return new Promise((res, rej) => {
      if(xmppClient) {
        xmppClient.disconnect(true);
      }
      /* Reset download state machine to stop downloading if already in progress */
      heartbeatClient.resetFileDownloadStateMachine();
      _wifiControl.disableInstance(function (err) {
        log.info("Disabled WiFi Instances");
        _dataModel.SetNetworkSsid("");
        upd_writeable_interface.SetSsid("");
        upd_writeable_interface.SetKey("");
        // Setting security type with invalid value (0xFF)
        upd_writeable_interface.SetSecurity_type(0xFF);
        // Setting encryption type with invalid value (0xFF)
        upd_writeable_interface.SetEncryption_type(0xFF);
        upd_writeable_interface.SetApt("");
        sflash_params.EraseModelNumberInSFlash();
        sflash_params.WriteCurrentBlobVersionParameter("0.0.0.0");
        ErdCacheEngine.erdCacheEngineStop();
        res("WifiOff");
      });
    });
  }

  function clearTimeoutInstance(tmo) {
    if (tmo !== null) {
      clearTimeout(tmo);
    }
    return null;
  }

  /* Need to add more states here as and when required */
  states.off = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("OFF ENTRY");
        wifiOff();
        break;

      case 'exit':
        log.info("OFF EXIT");
        break;
    }
  };

  states.ap = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("AP ENTRY");
        // Erase the APT in UPD.
        upd_writeable_interface.SetApt("");
        _wifiControl.startAP(upd_readonly_interface.GetApSsid(),
          upd_readonly_interface.GetApPassphrase().toString(),
          Constants.WIFI_AP_SEC_TYPE.WIFI_AP_SEC_OPEN);
        break;

      case 'ap':
        log.info("Started AP Mode successfully");
        // Start web server
        webServer.startServer(localWiFiNetworkControl);

        webServer.on('handleWebServerNetworkEventData', handleRemoteNetwork);

        webServer.on('uploadingTarball', function() {
          log.info("Uploading .....")
          _dataModel.ErdWrite(_erd.ERD_LCD_HOSTED_FIRMWARE_STATUS, Constants.HOSTED_LCD_FIRMWARE_STATUS.DOWNLOADING);
        });

        webServer.on('sendAppyOtaToBackend', function(filename, data) {
          // Check SHA status, return if SHA has failed
          if(data == 0) {
            log.info("Error : image upload failed");
            _dataModel.ErdWrite(_erd.ERD_LCD_HOSTED_FIRMWARE_STATUS, Constants.HOSTED_LCD_FIRMWARE_STATUS.IMAGE_ERROR);
            return;
          }

          // SHA check passed, start upgrading
          _backEnd.sendSoftwareUpdateSwapStartToBackend();
          log.info("Sha checksum passed. Upgrading .....");
          _dataModel.ErdWrite(_erd.ERD_LCD_HOSTED_FIRMWARE_STATUS, Constants.HOSTED_LCD_FIRMWARE_STATUS.WRITING);
          // const flashBootStack = Shell.exec('flash_boot_stack ' + filename, function (err) {
          //   log.info("Upgrade process exited with code: ", err);
          //   if (err !==  0) {
          //     // flash_boot_stack return code is not 0. The process is terminated with some error.
          //     _dataModel.ErdWrite(_erd.ERD_LCD_HOSTED_FIRMWARE_STATUS, Constants.HOSTED_LCD_FIRMWARE_STATUS.IMAGE_ERROR);
          //   }
          // });
          // flashBootStack.stdout.on('data', (data) => {
          //   upgradeLog.info(data.toString());
          // });
          //
          // flashBootStack.stderr.on('data', (data) => {
          //   log.error(data.toString());
          //   upgradeLog.error(data.toString());
          // });
        });

        heartbeatClient.setFirstHeartbeatAttempt(true);
        if(apModeTimeoutObj === null) {
          apModeTimeoutObj = setTimeout(apModeTimeoutHandler, Constants.AP_MODE_TIMEOUT_TIME_MS);
        }
        break;

      case 'ap_failure':
        log.warn("Failed to start AP Mode. Switching to OFF mode");
        stateChange(Constants.NW_STATUS_VALUES.off);
        break;

      case 'exit':
        log.info("AP EXIT");
        // Check if we were downloading tarball through web server
        _dataModel.ErdRead(_erd.ERD_SOFTWARE_UPDATE, (erdSwUpdate, dataSwUpdate) => {
          if (dataSwUpdate == 1) {
            _dataModel.ErdWrite(_erd.ERD_SOFTWARE_UPDATE, 0);
            if (_dataModel.GetLCDHostedFirmwareStatus() == Constants.HOSTED_LCD_FIRMWARE_STATUS.DOWNLOADING) {
              _dataModel.ErdWrite(_erd.ERD_LCD_HOSTED_FIRMWARE_STATUS, Constants.HOSTED_LCD_FIRMWARE_STATUS.IDLE);
            }
          }
        });

        _wifiControl.stopAP();
        if(apModeTimeoutObj !== null) {
          clearTimeout(apModeTimeoutObj);
          apModeTimeoutObj = null;
        }
        if (webServer) {
          webServer.removeAllListeners('handleWebServerNetworkEventData');
          webServer.removeAllListeners('uploadingTarball');
          webServer.removeAllListeners('sendAppyOtaToBackend');
          webServer.shutDown();
        }
        break;
    }
  };

  states.connecting = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("CONNECTING ENTRY");
        if (connectingTimeoutObj === null) {
          connectingTimeoutObj = setTimeout(connectingTimeoutCB, Constants.WIFI_CONNECTING_TIMEOUT);
        }
        _dataModel.SetNetworkSsid(upd_writeable_interface.GetSsid());
        _wifiControl.connectToNetwork(upd_writeable_interface.GetSsid(),
        upd_writeable_interface.GetKey(), upd_writeable_interface.GetSecurity_type());
        break;

      case 'failure':
        if(connectingTimeoutObj !== null) {
          log.warn("Got Failure, trying again...");
          _wifiControl.connectToNetwork(upd_writeable_interface.GetSsid(),
          upd_writeable_interface.GetKey(), upd_writeable_interface.GetSecurity_type());
        } else {
          wifiOff()
          .then(() => {
            _dataModel.SetNetworkSsid("");
            stateChange(Constants.NW_STATUS_VALUES.ap);
          });
        }
        break;

      case 'online':
        stateChange(Constants.NW_STATUS_VALUES.connected);
        break;

      case 'exit':
        connectingTimeoutObj = clearTimeoutInstance(connectingTimeoutObj);
        log.info("CONNECTING EXIT");
        break;
    }
  };

  states.connected = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("CONNECTED ENTRY");
        if(_appliance.GetApplianceDiscoveryStatus() === true){
          ApplianceDiscoveryComplete();
        } else {
          _appliance.on('appliance_discovery_complete', ApplianceDiscoveryComplete);
        }
        _dataModel.SetRssi();
        wpa_status_interval_obj = setTimeout(check_wpa_status_cb, Constants.WIFI_CHECK_STATUS_INTERVAL);
        nwStateDispInterval = setInterval(display_wpa_status, 60 * 1000);
        heartbeatClient.triggerHeartbeat();
        break;

      case 'online':
        clearTimeout(wpa_status_interval_obj);
        wpa_status_interval_obj = setTimeout(check_wpa_status_cb, Constants.WIFI_CHECK_STATUS_INTERVAL);
        clearTimeout(nwStateDispInterval);
        nwStateDispInterval = setInterval(display_wpa_status, 60 * 1000);
        break;

      case 'exit':
        log.info("CONNECTED EXIT");
        _appliance.removeAllListeners('appliance_discovery_complete');
        if (wpa_status_interval_obj) {
          clearInterval(wpa_status_interval_obj);
        }
        if (nwStateDispInterval) {
          clearInterval(nwStateDispInterval);
        }
        break;
    }
  };

  states.connectedButOff = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("CONNECTED BUT OFF ENTRY");
        _dataModel.SetNetworkSsid(upd_writeable_interface.GetSsid());
        _wifiControl.disableInstance(function (err) {
          log.info("Disabled WiFi Instances");
        });
        break;

      case 'exit':
        log.info("CONNECTED BUT OFF EXIT");
        break;
    }
  };

  states.reconnecting = (stage) => {
    switch (stage) {
      case 'entry':
        log.info("RECONNECTING ENTRY");
        _dataModel.SetNetworkSsid(upd_writeable_interface.GetSsid());
        _wifiControl.connectToNetwork(upd_writeable_interface.GetSsid(),
          upd_writeable_interface.GetKey(), upd_writeable_interface.GetSecurity_type());
        if (ReconnectingTimeoutObj === null) {
          ReconnectingTimeoutObj = setTimeout(ReconnectingTimeoutCB, Constants.RECONNECTING_RESET_TIMEOUT);
        }
        break;

      case 'failure':
        _wifiControl.connectToNetwork(upd_writeable_interface.GetSsid(),
          upd_writeable_interface.GetKey(), upd_writeable_interface.GetSecurity_type());
        break;

      case 'online':
        stateChange(Constants.NW_STATUS_VALUES.connected);
        break;

      case 'exit':
        ReconnectingTimeoutObj = clearTimeoutInstance(ReconnectingTimeoutObj);
        log.info("RECONNECTING EXIT");
        break;
    }
  };

  var connectingTimeoutCB = () => {
    var _nwState = null;

    _nwState = sflash_params.GetNetworkStateParameter();
    if (_nwState === Constants.NW_STATUS_VALUES.connecting) {
      log.warn("Unable to connect to Network, bailing to AP mode");
      sflash_params.Diagnostics.IncrementRouterFailures();
      connectingTimeoutObj = null;
    }
  }

  var ReconnectingTimeoutCB = () => {
    var _nwState = null;

    _nwState = sflash_params.GetNetworkStateParameter();
    if (_nwState === Constants.NW_STATUS_VALUES.reconnecting) {
      sflash_params.Diagnostics.IncrementRouterFailures();
      log.fatal("Could not Reconnect in Five minute, resetting");
      sflash_params.Diagnostics.IncrementReconnectingTimeoutResets();
      system.exitProcess();
    }
  }

  var startReconnecting = () => {
    if (nwStateDispInterval) {
      clearInterval(nwStateDispInterval);
    }
    _wifiControl.connectToNetwork(upd_writeable_interface.GetSsid(),
      upd_writeable_interface.GetKey(), upd_writeable_interface.GetSecurity_type());
  }

  /**
   * Takes care of Initalizing the commissioning state machine
   * with the initial state.
   */
  const initalize = () => {
    log.info("Initializing");
    //Retreive our current state from sflash param
    currentState = sflash_params.GetNetworkStateParameter();
    log.info("OUR INITIAL N/W STATUS VALUE: " + currentState);

    if (!commonUtil.objectContainsValue(Constants.NW_STATUS_VALUES, currentState)) {
      log.error("Wrong Network Status Value: ", currentState.toString());
      currentState = Constants.NW_STATUS_VALUES.off;
      sflash_params.WriteNetworkStateParameter(currentState);
    }

    /*if state on power down was "connected to home router" then we need to
      transition to "connecting to home router" as we need to re-connect */
    if (currentState === Constants.NW_STATUS_VALUES.connected) {
      currentState = Constants.NW_STATUS_VALUES.reconnecting;
      sflash_params.WriteNetworkStateParameter(currentState);
    }

    /* Initalize data model for network state*/
    _dataModel.ErdWrite(_erd.ERD_NETWORK_STATE, currentState);
    fsm = Fsm(states[nwStateNames[currentState]]);
    _dataModel.AddErdOnChangeHandler(_erd.ERD_NETWORK_STATE, nwStateErdChangeHandler);
  }

  const stateChange = (newState) => {
    log.info("Received state: " + nwStateNames[newState]);

    if (!commonUtil.objectContainsValue(Constants.NW_STATUS_VALUES, newState)) {
      log.error("Wrong Network Status Value");
      return;
    }

    if(_dataModel.GetMissingUPDFaultStatus()) {
      log.error("Can't transit as UPD is missing");
      _dataModel.ErdWrite(_erd.ERD_NETWORK_STATE, currentState);
      return;
    }

    if (currentState === newState) {
      log.warn("Already in the same state. No need of tranistion");
      return;
    }

    if ((currentState == Constants.NW_STATUS_VALUES.off) && (newState != Constants.NW_STATUS_VALUES.ap)) {
      log.error("OFF state can only transit to AP state");
      return;
    }

    if ((currentState == Constants.NW_STATUS_VALUES.connected)
      && ((newState == Constants.NW_STATUS_VALUES.ap)
        || (newState == Constants.NW_STATUS_VALUES.connecting))) {
      log.error("Connected state can not transit to AP or Connecting state");
      return;
    }

    if ((currentState === Constants.NW_STATUS_VALUES.connectedButOff)
      && (newState !== Constants.NW_STATUS_VALUES.reconnecting)
      && (newState !== Constants.NW_STATUS_VALUES.off)) {
      log.error("Not allowed to tranistion other than reconnecting or off.");
      return;
    }
    // This is a new state, so lets save it to sflash param
    sflash_params.WriteNetworkStateParameter(newState);

    log.info("NETWORK STATUS CHANGED, OUR NETWORK STATUS VALUE:", newState);
    log.info("NETWORK STATUS CHANGED, HERE IS OUR CURRENT STATE: ", currentState);

    currentState = newState;
    //Update network state into data model
    _dataModel.ErdWrite(_erd.ERD_NETWORK_STATE, newState);

    fsm.transition(states[nwStateNames[newState]]);
  }

  /**
   * Commissioning Network State Change functionality
   */
  function handleRemoteNetwork(newState) {
    log.info("Received state: ", newState);
    stateChange(newState);
  }

  /**
   * Almost all wifi APIs are async. We trigger the wifi API's from
   * commissioning network state entry stage.
   * For e.g. AP => ENTRY => _wifiControl.startAP();
   * Once Wifi is successfully starts in AP mode, local-wifi-network-control.js,
   * emits corresponding state event.
   * For e.g For AP - nWStatus => ap
   * This way commissioning module know that corresponding wifi API is succeeded
   * and can go to "RUN" stage.
   * We can rest of the functionality needed in the "RUN" stage.
   */
  _wifiControl.on('handleLocalWiFiStatusChange', (nwStatus) => {
    switch (nwStatus) {
      case 'init':
        if (!fsm) {
          log.info("The very first time wifi is initialized.");
          initalize();
        }

        break;

      default:
        fsm.sendStage(nwStatus, null);
        break;
    };
  });

};
