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

export const upsertInputs: Record<string, unknown> = {
  idAbc: { message: { name: 'n', data, id: 'abc' } },
  noId: { message: { name: 'n', data } },
};

export const preferencesInputs: Record<string, unknown> = {
  idAbc: { message: { name: 'n', data, id: 'abc' } },
  idNumber: { message: { name: 'n', data, id: 5 } },
  nameNumberAfterNothing: { message: { name: 5, data } },
};
