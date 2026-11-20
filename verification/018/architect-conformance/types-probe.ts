import { z } from '/usr/local/bin/hooks/website/node_modules/zod';
const el = z.object({ n: z.number() });
const today = z.array(el).max(3);
const piped = z.array(z.unknown()).max(3).pipe(z.array(el));
function boundedArray<T extends z.ZodTypeAny>(schema: T, max: number) {
  return z.array(z.unknown()).max(max).pipe(z.array(schema)) as unknown as z.ZodType<z.output<z.ZodArray<T>>, z.ZodTypeDef, z.input<z.ZodArray<T>>>;
}
const typed = boundedArray(el, 3);
type InToday = z.input<typeof today>; type InPiped = z.input<typeof piped>; type InTyped = z.input<typeof typed>;
export const a: InToday = [{ n: 'wrong' }];   // expect error
export const b: InPiped = [{ n: 'wrong' }];   // error iff input type kept
export const c: InTyped = [{ n: 'wrong' }];   // expect error
export const d: z.output<typeof piped> = [{ n: 1 }];
