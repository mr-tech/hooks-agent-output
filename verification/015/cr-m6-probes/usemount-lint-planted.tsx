import * as ReactUse from 'react-use';
import { useMount, useMount as useOnMount } from 'react-use';

function cleanup() {}
const fn = () => cleanup;

export function A() { useMount(() => () => cleanup()); return null; }
export function B() { useMount(() => { return () => cleanup(); }); return null; }
export function C() { useMount(() => cleanup); return null; }
export function D() { useMount(() => { return cleanup; }); return null; }
export function E() { useOnMount(() => () => cleanup()); return null; }
export function F() { ReactUse.useMount(() => () => cleanup()); return null; }
export function G() { useMount(fn); return null; }
export function H() { useMount(function named() { return function inner() {}; }); return null; }
export function I() { useMount(() => { cleanup(); }); return null; }
