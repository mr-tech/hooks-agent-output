import { useLatest, useUpdateEffect } from 'react-use';

export function L() { useLatest(1); useUpdateEffect(() => {}, []); return null; }
