import useMountDefault from 'react-use/lib/useMount';
import useMountEsm from 'react-use/esm/useMount';

function cleanup() {}

export function J() { useMountDefault(() => cleanup); return null; }
export function K() { useMountEsm(() => () => cleanup()); return null; }
