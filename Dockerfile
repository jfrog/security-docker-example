FROM busybox:latest as build

# Create 3rd party vulenrable packages
 COPY tests/xmas/pip.list tests/xmas/setup.sh /tmp/
 RUN /tmp/setup.sh && rm /tmp/setup.sh /tmp/pip.list

# 1st party
RUN mkdir -p /exposures/node_modules


####



COPY gadgets_scanners/exposure/tests/data/hardcoded-secrets/req.secret.keys/applicable.txt \
 /exposures/req.secret.keys.py

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.exec/applicable/main.js \
  /exposures/req.web.node-js.exec.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.hashing/applicable/main.js \
    /exposures/req.web.node-js.hashing.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.helmet/applicable/main.js \
    /exposures/req.web.node-js.helmet.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.throttle/applicable/main.js \
    /exposures/req.web.node-js.throttle.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.tls/applicable/main.js \
 /exposures/req.web.node-js.tls.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.web.node-js.tls-version/applicable_min_version/main.js \
  /exposures/req.web.node-js.tls-version.js

COPY gadgets_scanners/exposure/tests/data/python/req.sw.python.crypto.sizes/applicable_pycrypto/main.py \
    /exposures/req.sw.python.crypto.sizes.py

COPY gadgets_scanners/exposure/tests/data/python/req.sw.python.crypto.standard/applicable/main.py \
 /exposures/req.sw.python.crypto.standard.py

COPY gadgets_scanners/exposure/tests/data/python/req.sw.python.remove-commands/applicable/main.py \
    /exposures/req.sw.python.remove-commands.py

COPY gadgets_scanners/exposure/tests/data/python/req.sw.python.tls.certificates/applicable/main.py \
    /exposures/req.sw.python.tls.certificates.py

COPY gadgets_scanners/exposure/tests/data/python/req.sw.python.tls.version/applicable_openssl/main.py \
    /exposures/req.sw.python.tls.version.py

COPY gadgets_scanners/exposure/tests/data/python/req.web.flask.https-redirect/applicable/main.py \
    /exposures/req.web.flask.https-redirect.py

# 3rd party Python
RUN mkdir -p /lib/python3.8/site-packages/zstandard-0.17.0.dist-info \
    /lib/python3.8/site-packages/zstandard

COPY tests/xmas/zstandard-0.17.0.dist-info/* /lib/python3.8/site-packages/zstandard-0.17.0.dist-info/
COPY tests/xmas/zstandard/* /lib/python3.8/site-packages/zstandard/

COPY gadgets_scanners/exposure/tests/data/python/req.python.supply-chain.eval/applicable/main.py \
    /lib/python3.8/site-packages/zstandard/req.python.supply-chain.eval.py

COPY gadgets_scanners/exposure/tests/data/python/req.python.supply-chain.process-network-input/applicable/main.py \
  /lib/python3.8/site-packages/zstandard/req.python.supply-chain.process-network-input.py

COPY gadgets_scanners/exposure/tests/data/python/req.python.supply-chain.sensitive-files/applicable/main.py \
    /lib/python3.8/site-packages/zstandard/req.python.supply-chain.sensitive-files.py

COPY gadgets_scanners/exposure/tests/data/python/req.python.supply-chain.spawn-shell/applicable/main.py \
  /lib/python3.8/site-packages/zstandard/req.python.supply-chain.spawn-shell.py

COPY gadgets_scanners/exposure/tests/data/python/req.python.supply-chain.obfuscation/applicable/main.py \
  /lib/python3.8/site-packages/zstandard/req.python.supply-chain.obfuscation.py

COPY gadgets_scanners/exposure/tests/data/python/req.python.malware-domain-generation/applicable/main.py \
 /lib/python3.8/site-packages/zstandard/req.python.malware-domain-generation.py

# 3rd party JS
RUN mkdir -p /usr/local/lib/node_modules/ini
COPY tests/xmas/ini/* /usr/local/lib/node_modules/ini/

COPY gadgets_scanners/exposure/tests/data/javascript/req.nodejs.supply-chain.eval/applicable/main.js \
  /usr/local/lib/node_modules/ini/req.nodejs.supply-chain.eval.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.nodejs.supply-chain.process-network-input/applicable_client/main.js \
 /usr/local/lib/node_modules/ini/req.nodejs.supply-chain.process-network-input.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.nodejs.supply-chain.sensitive-files/applicable/main.js \
  /usr/local/lib/node_modules/ini/req.nodejs.supply-chain.sensitive-files.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.nodejs.supply-chain.spawn-shell/applicable/main.js \
    /usr/local/lib/node_modules/ini/req.nodejs.supply-chain.spawn-shell.js

COPY gadgets_scanners/exposure/tests/data/javascript/req.nodejs.supply-chain.obfuscation/applicable/main.js \
    /usr/local/lib/node_modules/ini/req.nodejs.supply-chain.obfuscation.js

# Envoy Service
RUN mkdir -p /etc/envoy

COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.admin-localhost/applicable/envoy.yaml \
    /etc/envoy/req.sw.envoy.admin-localhost.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.downstream.enable/applicable/envoy.yaml \
   /etc/envoy/req.sw.envoy.tls.downstream.enable.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.downstream.no-renegotiation/applicable/envoy.yaml \
   /etc/envoy/req.sw.envoy.tls.downstream.no-renegotiation.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.downstream.verify-client/applicable/envoy.yaml \
 /etc/envoy/req.sw.envoy.tls.downstream.verify-client.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.upstream.enable/applicable/envoy.yaml \
    /etc/envoy/req.sw.envoy.tls.upstream.enable.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.upstream.no-renegotiation/applicable/envoy.yaml \
 /etc/envoy/req.sw.envoy.tls.upstream.no-renegotiation.yaml
COPY gadgets_scanners/exposure/tests/data/envoy/req.sw.envoy.tls.upstream.verify-altname/applicable/envoy.yaml \
 /etc/envoy/req.sw.envoy.tls.upstream.verify-altname.yaml

# Etcd Service
RUN mkdir -p /etc/etcd

COPY gadgets_scanners/exposure/tests/data/etcd/req.sw.etcd.tls-client/applicable/etcd.conf.yml \
    /etc/etcd/req.sw.etcd.tls-client.yaml
COPY gadgets_scanners/exposure/tests/data/etcd/req.sw.etcd.tls-peer/applicable/etcd.conf.yml \
    /etc/etcd/req.sw.etcd.tls-peer.yaml

# Prometheus Service
RUN mkdir -p /etc/prometheus

COPY gadgets_scanners/exposure/tests/data/prometheus/req.sw.prometheus.basic-auth/applicable/prometheus.conf.yml \
    /etc/prometheus/req.sw.prometheus.basic-auth.yml
COPY gadgets_scanners/exposure/tests/data/prometheus/req.sw.prometheus.tls/applicable/prometheus.conf.yml \
/etc/prometheus/req.sw.prometheus.tls.yml
COPY gadgets_scanners/exposure/tests/data/prometheus/req.sw.prometheus.tls.ciphersuites/applicable/prometheus.conf.yml \
    /etc/prometheus/req.sw.prometheus.tls.ciphersuites.yml
COPY gadgets_scanners/exposure/tests/data/prometheus/req.sw.prometheus.tls.mutual/applicable/prometheus.conf.yml \
 /etc/prometheus/req.sw.prometheus.tls.mutual.yml
COPY gadgets_scanners/exposure/tests/data/prometheus/req.sw.prometheus.tls.version/applicable/prometheus.conf.yml \
    /etc/prometheus/req.sw.prometheus.tls.version.yml

FROM scratch
COPY --from=build / /

# Nginx
# RUN mkdir -p /etc/nginx
COPY gadgets_scanners/exposure/tests/data/nginx/req.web.nginx.tls.version/applicable_invalid_args_1.conf /etc/nginx/nginx.conf

# Apache
# RUN mkdir -p /etc/httpd
COPY gadgets_scanners/exposure/tests/data/apache/req.web.apache.cors/applicable_wildcard.conf /etc/httpd/httpd.conf

# 3rd party Python - applicable
RUN mkdir -p /lib/python3.8/site-packages/PyYAML-5.2-py3.8.egg-info /applicable
COPY tests/xmas/PyYAML-5.2-py3.8.egg-info/* /lib/python3.8/site-packages/PyYAML-5.2-py3.8.egg-info/
COPY gadgets_scanners/applicable/tests/data/python/yaml-full-load/applicable/*.py /applicable/
COPY gadgets_scanners/applicable/tests/data/python/CVE_2021_35042/applicable/main.py /applicable/app.py

# Secrets
COPY gadgets_scanners/exposure/tests/data/passwords/req.pass.check-default/applicable/applicable.yaml \
  /exposures/req.pass.check-default.yaml


