# Test docker image for exposures

 
To build test docker image for exposures

```shell
$  make build-xmas-docker 
```

docker image is based on alpine \
need to keep the image small so we \
can add this image file to XRAY tests. \
Dockerfile should be updated on each \
new scanner.

Adding new 3rd party files:

### Python
In python new sources should be added to \
xmas/zstandard/ \
In addition need to add new record of the file in: \
xmas/zstandard-0.17.0.dist-info/RECORD

### Javascript
In JS new sources should be added to \
xmas/ini/
