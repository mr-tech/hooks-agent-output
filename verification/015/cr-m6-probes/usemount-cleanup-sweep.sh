#!/usr/bin/env bash
# Usage: usemount-cleanup-sweep.sh <website> <sha>
# Class: a react-use useMount callback that returns a cleanup. react-use 17.4.0 lib/useMount.js wraps the
# callback in `function () { fn(); }`, so a returned function is discarded and never runs on unmount.
# Lists every useMount( call site; a member is one whose callback returns a function: the concise form
# `useMount(() => () =>` (matched below) or a block body with `return` (read each listed site by hand).
# Blind spots: a callback passed by reference (`useMount(fn)`) whose fn returns a function; an aliased import.
W=$1; SHA=$2
echo "== all useMount( call sites (production)"; git -C "$W" grep -n 'useMount(' "$SHA" -- src ':(exclude)**/__tests__/**'
echo "== concise-form members"; git -C "$W" grep -c 'useMount(() => () =>' "$SHA" -- src ':(exclude)**/__tests__/**'
echo "== positive control: the predicate on a planted line"; echo '  useMount(() => () => removeBlockStyle());' | grep -c 'useMount(() => () =>'
