#!/bin/sh

while read p; do
  pkg=$(echo $p | awk -F" " '{print $1}')
  ver=$(echo $p | awk -F" " '{print $2}')
  mkdir -p /lib/python3.8/site-packages/"${pkg}"

  echo "Metadata-Version: 1.2" >> /lib/python3.8/site-packages/"${pkg}"/METADATA
  echo "Name: ${pkg}" >> /lib/python3.8/site-packages/"${pkg}"/METADATA
  echo "Version: ${ver}" >> /lib/python3.8/site-packages/"${pkg}"/METADATA
  echo "License: MIT" >> /lib/python3.8/site-packages/"${pkg}"/METADATA
done </tmp/pip.list
