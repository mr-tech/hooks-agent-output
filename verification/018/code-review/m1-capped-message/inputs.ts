const badUrlEmbed = () => ({
  author: { name: 'a', url: 'x', icon_url: 'x' },
  url: 'x',
  footer: { text: 'f', icon_url: 'x' },
  image: { url: 'x' },
  thumbnail: { url: 'x' },
});

const data = {
  avatar_url: 'x',
  embeds: [badUrlEmbed(), badUrlEmbed(), badUrlEmbed()],
  components: [
    { type: 10, content: 'a'.repeat(2500) },
    { type: 10, content: 'b'.repeat(2500) },
  ],
};

export const inputs: Record<string, unknown> = {
  refine20th_id21st: { message: { name: 'n', data, id: 'abc' } },
  refine20th_noId: { message: { name: 'n', data } },
};

export const reduce = (issues: { code: string, path: (string | number)[], message: string }[]) => issues
  .map(({ code, path, message }) => ({ code, path: path.join('.'), message }));
