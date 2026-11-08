#!/bin/sh
# Loopback in a fresh unshare -rn namespace: before and after `ip link set lo up`, plus the routable-link check.
probe() { python3 -I -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));s.listen(1);c=socket.socket()
try:
  c.connect(s.getsockname());print("connect ok")
except OSError as e: print("connect fail",e)'; }
echo "-- before"; ip -o link show lo | grep -o "state [A-Z]*"; probe
ip link set lo up
echo "-- after"; ip -o link show lo | grep -o "state [A-Z]*"; probe
echo "-- links other than lo: $(ip -o link show | grep -vc ': lo:')"
echo "-- default route present: $(ip route show default | grep -c .)"
