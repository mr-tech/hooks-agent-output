// Research corpus for the oracle comparison. Each case: [category, text]. Ids are assigned by position.
// node corpus.js > corpus.json
'use strict';
const cases = [
  // headings
  ['heading', '# one'], ['heading', '## two'], ['heading', '### three'], ['heading', '#### four'],
  ['heading', '#nospace'], ['heading', ' # leading space'], ['heading', '# trailing hashes ##'],
  ['heading', 'text\n# after text'], ['heading', 'text # mid line'], ['heading', '# **bold** head'],
  ['heading', '# # nested'], ['heading', '#  two spaces'], ['heading', '# a\n# b'], ['heading', '#\tTab'],
  // subtext
  ['subtext', '-# sub'], ['subtext', '-#nospace'], ['subtext', ' -# leading space'], ['subtext', '-# -# nested'],
  ['subtext', 'text\n-# after'], ['subtext', '-# **b** *i*'], ['subtext', '# -# head then sub'], ['subtext', '-# # sub then head'],
  ['subtext', 'a -# mid'],
  // masked links
  ['masked', '[text](https://example.com)'], ['masked', '[text](http://example.com/a_b)'], ['masked', '[text](example.com)'],
  ['masked', '[text](<https://example.com>)'], ['masked', '[text](https://example.com "title")'],
  ['masked', '[**bold**](https://example.com)'], ['masked', '[a [b] c](https://example.com)'],
  ['masked', '[https://evil.com](https://example.com)'], ['masked', '[text](https://example.com/a(b)c)'],
  ['masked', '[](https://example.com)'], ['masked', '[ ](https://example.com)'], ['masked', '[text]( https://example.com )'],
  ['masked', '**[text](https://example.com)**'], ['masked', '[text](https://example.com)[two](https://example.org)'],
  ['masked', '[text] (https://example.com)'], ['masked', '[`code`](https://example.com)'], ['masked', '[||sp||](https://example.com)'],
  ['masked', '[text](ftp://example.com)'], ['masked', '[text](discord://-/channels/1/2)'], ['masked', '[te\nxt](https://example.com)'],
  // bare and angle links
  ['link', 'https://example.com'], ['link', 'http://example.com/path?q=1#h'], ['link', 'https://example.com.'],
  ['link', 'https://example.com)'], ['link', '(https://example.com)'], ['link', 'https://example.com/a(b)'],
  ['link', '<https://example.com>'], ['link', '<http://example.com/a b>'], ['link', '<example.com>'],
  ['link', 'www.example.com'], ['link', 'https://example.com/**bold**'], ['link', '**https://example.com**'],
  ['link', 'https://example.com/a_b_c'], ['link', '_https://example.com_'], ['link', 'steam://run/440'],
  ['link', 'mailto:a@b.co'], ['link', '<a@b.co>'], ['link', 'https://example.com,'], ['link', 'https://exa mple.com'],
  ['link', 'x https://example.com y'], ['link', 'https://example.com\'s'], ['link', 'HTTPS://EXAMPLE.COM'],
  // spoilers
  ['spoiler', '||sp||'], ['spoiler', '||a\nb||'], ['spoiler', '|| ||'], ['spoiler', '||||'], ['spoiler', '||**b**||'],
  ['spoiler', '**||b||**'], ['spoiler', '||a||b||c||'], ['spoiler', '|||a|||'], ['spoiler', '||`code`||'], ['spoiler', '`||x||`'],
  ['spoiler', '||https://example.com||'], ['spoiler', '||unclosed'],
  // emphasis
  ['emphasis', '*i*'], ['emphasis', '_i_'], ['emphasis', '**b**'], ['emphasis', '__u__'], ['emphasis', '~~s~~'],
  ['emphasis', '***bi***'], ['emphasis', '___ui___'], ['emphasis', '__*ui*__'], ['emphasis', '**__bu__**'], ['emphasis', '*__iu__*'],
  ['emphasis', '***__biu__***'], ['emphasis', '**b *bi* b**'], ['emphasis', '*i **ib** i*'], ['emphasis', '* not italic*'],
  ['emphasis', '*loose *'], ['emphasis', '*a * b*'], ['emphasis', 'snake_case_word'], ['emphasis', '_a_b_'], ['emphasis', 'a*b*c'],
  ['emphasis', '**a*'], ['emphasis', '*a**'], ['emphasis', '****'], ['emphasis', '** b **'], ['emphasis', '__ u __'],
  ['emphasis', '~~a~~~'], ['emphasis', '~~ s ~~'], ['emphasis', '*a\nb*'], ['emphasis', '**a\n\nb**'], ['emphasis', '_a_ _b_'],
  ['emphasis', '*a**b**c*'], ['emphasis', '**a*b*c**'], ['emphasis', '~~**a**~~'], ['emphasis', '**~~a~~**'], ['emphasis', '_**a**_'],
  ['emphasis', '__a_'], ['emphasis', '_a__'], ['emphasis', '*a*b*'], ['emphasis', '\\*a*'],
  // code
  ['code', '`code`'], ['code', '``co`de``'], ['code', '` code `'], ['code', '`unclosed'], ['code', '``'], ['code', '`a``b`'],
  ['code', '`**b**`'], ['code', '**`b`**'], ['code', '```block```'], ['code', '```\nblock\n```'], ['code', '```js\nlet a = 1;\n```'],
  ['code', '```js let a```'], ['code', '```JS\nx\n```'], ['code', '```c++\nx\n```'], ['code', '```notalang\nx\n```'],
  ['code', '```\n\n\nx\n\n\n```'], ['code', 'a ```b``` c'], ['code', '```unclosed\nx'], ['code', '````x````'], ['code', '```\n```'],
  ['code', '```js\n```'], ['code', '> ```\n> x\n> ```'], ['code', '```a\nb```c```'], ['code', '`a\nb`'], ['code', '```**b**```'],
  // quotes
  ['quote', '> q'], ['quote', '>q'], ['quote', '> a\n> b'], ['quote', '> a\nb'], ['quote', '>>> a\nb\nc'], ['quote', '>>>a'],
  ['quote', 'x > q'], ['quote', 'x\n> q'], ['quote', '> > nested'], ['quote', '> **b**'], ['quote', '>  two spaces'],
  ['quote', ' > leading space'], ['quote', '> a\n\n> b'], ['quote', '> # head'], ['quote', '> - item'], ['quote', '>>> # head\n- item'],
  ['quote', '> '], ['quote', '>>> '], ['quote', '> a\n>>> b'], ['quote', '>> a'],
  // lists
  ['list', '- a'], ['list', '* a'], ['list', '+ a'], ['list', '- a\n- b'], ['list', '1. a\n2. b'], ['list', '5. a\n6. b'],
  ['list', '1) a'], ['list', '-a'], ['list', '- a\n  - b'], ['list', '- a\n - b'], ['list', '- a\n    - b'], ['list', '- a\n\n- b'],
  ['list', 'text\n- a'], ['list', 'text - a'], ['list', '- **b**'], ['list', '- a\ntext'], ['list', '1. a\n- b'], ['list', '- # head'],
  ['list', '0. a'], ['list', '1000000000000. a'], ['list', '- a\n  continued'], ['list', '-  two spaces'], ['list', '1. a\n1. b'],
  ['list', '- [x] task'], ['list', '- '],
  // timestamps
  ['timestamp', '<t:1700000000>'], ['timestamp', '<t:1700000000:R>'], ['timestamp', '<t:1700000000:F>'], ['timestamp', '<t:1700000000:x>'],
  ['timestamp', '<t:-1>'], ['timestamp', '<t:99999999999999999>'], ['timestamp', '<t:abc>'], ['timestamp', '<t:1700000000:s>'],
  ['timestamp', '<t:1700000000:S>'], ['timestamp', '**<t:1700000000>**'], ['timestamp', '`<t:1700000000>`'], ['timestamp', '<t:1700000000:>'],
  // mentions
  ['mention', '<@123456789012345678>'], ['mention', '<@!123456789012345678>'], ['mention', '<@&123456789012345678>'],
  ['mention', '<#123456789012345678>'], ['mention', '@everyone'], ['mention', '@here'], ['mention', '@Everyone'],
  ['mention', '</ping:123456789012345678>'], ['mention', '</a b c:123456789012345678>'], ['mention', '<@abc>'],
  ['mention', '**<@123456789012345678>**'], ['mention', '`<@123456789012345678>`'], ['mention', '<id:customize>'],
  ['mention', '<id:browse>'], ['mention', 'x@everyone'], ['mention', '<@123>'], ['mention', '@silent hi'],
  // emoji
  ['emoji', '<:name:123456789012345678>'], ['emoji', '<a:name:123456789012345678>'], ['emoji', ':smile:'], ['emoji', ':notanemoji:'],
  ['emoji', '\u{1F600}'], ['emoji', '\u{1F44D}\u{1F3FD}'], ['emoji', ':thumbsup::skin-tone-3:'], ['emoji', '<:name:abc>'],
  ['emoji', '**:smile:**'], ['emoji', '`:smile:`'], ['emoji', '\\:smile:'], ['emoji', '\\\u{1F600}'], ['emoji', ':smile: :smile:'],
  ['emoji', 'a:smile:b'], ['emoji', '<:a:1><:b:2>'], ['emoji', '\u00a9 \u2122'], ['emoji', ':+1:'],
  // escapes
  ['escape', '\\*a\\*'], ['escape', '\\**a**'], ['escape', '\\_a\\_'], ['escape', '\\# head'], ['escape', '\\> q'], ['escape', '\\- item'],
  ['escape', '\\`code\\`'], ['escape', '\\||sp\\||'], ['escape', '\\\\'], ['escape', '\\a'], ['escape', '\\1'], ['escape', '\\'],
  ['escape', '\\[t](https://example.com)'], ['escape', '[t\\](https://example.com)'], ['escape', '\\https://example.com'],
  ['escape', '\\<@123456789012345678>'], ['escape', '\\<t:1700000000>'], ['escape', '\\-# sub'], ['escape', '\\~~s~~'], ['escape', 'a\\\nb'],
  // whitespace and mixing
  ['mix', 'a\nb'], ['mix', 'a\n\nb'], ['mix', 'a\n\n\nb'], ['mix', 'a  \nb'], ['mix', '  leading'], ['mix', 'trailing  '],
  ['mix', '# h\ntext\n- a\n> q\n-# s'], ['mix', '**# not head**'], ['mix', '*- not list*'], ['mix', '||> q||'],
  ['mix', '> ||sp||\n> **b**'], ['mix', '- [t](https://example.com)\n- `c`'], ['mix', '# [t](https://example.com)'],
  ['mix', '-# https://example.com'], ['mix', '***a** b*'], ['mix', '__**a__**'], ['mix', '<https://example.com> **b**'],
  ['mix', '1. a\n   - b\n2. c'], ['mix', '\u00af\\_(\u30c4)_/\u00af'], ['mix', 'a\u200bb'], ['mix', '\t\ttabs'],
];
process.stdout.write(JSON.stringify(cases.map(([cat, text], i) => ({ id: i + 1, cat, text })), null, 0));
