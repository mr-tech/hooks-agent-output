
describe('DiscordContentEditor on desktop, opened without typing', () => {
  it('leaves an unset value unset on the message while the editor is open', () => {
    held.changes = [];
    open(mountDom(<Harness initial={undefined} />));
    expect(held.value).toBeUndefined();
  });

  it('leaves a set value equal on the message while the editor is open', () => {
    held.changes = [];
    open(mountDom(<Harness initial='Old' />));
    expect(held.value).toBe('Old');
  });
});
