#!/bin/bash

help() {
  echo "$0 <sermver string>"
  echo "E.g $0 1.11.111-beta+1, $0 2.0.0"
}

# Semantic Version string to numerical version
semver2num() {
  IN="$1"
  C=2
  NUMVER=0
  while IFS='.' read -ra ADDR; do
    for i in "${ADDR[@]}"; do
      N=$(($i<<10*$C))
      let NUMVER=$NUMVER+$N
      let C=$C-1
      if [ $C -eq -1 ]; then
        break;
      fi
    done
  done <<< "$IN"
  echo $NUMVER
}

# Numerical version to Semabtic Version string
num2semver() {
  NUMVER=$1
  S2=$(($NUMVER & 1023))
  S1=$(($NUMVER >>10 & 1023))
  S0=$(($NUMVER >>20 & 1023))

  echo "$S0.$S1.$S2"
}

if [ $# -eq 0 ]; then
  echo "Missing semver string" >&2
  help
  exit 1
fi

VSTRING="${1}"
echo "Bump version to: ${VSTRING}"
echo "Set package.json version to ${VSTRING}"
echo "Set Android apk versionName to ${VSTRING}"

set -ex
sed -i "0,/\"version\":\s*\".*\",/s/\"version\":\s*\".*\",/\"version\": \"${VSTRING}\",/" package.json
sed -i "0,/\"version\":\s*\".*\",/s/\"version\":\s*\".*\",/\"version\": \"${VSTRING}\",/" package-lock.json
if [ -f "android/app/build.gradle" ]; then
  version_code=$(semver2num "${VSTRING}")
  echo "Set Android apk versionCode to ${version_code}"

  sed -i "0,/^\s*versionCode.*/s/versionCode.*/versionCode ${version_code}/" android/app/build.gradle
  sed -i "0,/^\s*versionName.*/s/versionName.*/versionName \"${VSTRING}\"/" android/app/build.gradle
fi
