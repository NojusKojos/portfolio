#!/bin/sh
msg=$(cat "$1")
len=${#msg}
if [ "$len" -lt 10 ]; then
  echo "Commit message too short (min 10 chars, got $len)"
  exit 1
fi
