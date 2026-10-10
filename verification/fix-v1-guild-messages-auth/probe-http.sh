#!/bin/bash
# usage: probe.sh <label>
G=123456789012345678
for ep in "guilds/$G/messages" "guilds/$G/messages/1"; do
  for c in none wrong empty post right; do
    case $c in
      none) a=();; wrong) a=(-H 'Authorization: Bearer not-the-key');; empty) a=(-H 'Authorization: Bearer ');;
      post) a=(-X POST);; right) a=(-H 'Authorization: Bearer probe-key');;
    esac
    s=$(curl -s -o /dev/null -w '%{http_code} %{size_download}' "${a[@]}" "http://127.0.0.1:3917/api/v1/$ep")
    echo "$1 /api/v1/$ep $c -> $s"
  done
done
