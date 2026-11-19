export const triggers: unknown[] = [];
export default class Pusher {
  constructor(_: unknown) { void _; }
  async trigger(...args: unknown[]) { triggers.push(args); }
}
