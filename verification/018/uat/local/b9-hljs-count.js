// B-9 counter, run by browser_evaluate on an editor page whose message is loaded. Editor surface = [data-slate-editor];
// preview surface = every hljs element outside it. Control: the same function on a message with no fenced blocks must give 0/0.
() => {
  const eds = [...document.querySelectorAll('[data-slate-editor]')];
  const all = [...document.querySelectorAll('[class*="hljs"]')];
  const inEd = all.filter((el) => eds.some((e) => e.contains(el)));
  const outEd = all.filter((el) => !eds.some((e) => e.contains(el)));
  const classes = (els) => [...new Set(els.flatMap((el) => [...el.classList].filter((c) => c.startsWith('hljs'))))].sort();
  return {
    slateEditors: eds.length,
    editorHljs: inEd.length, editorClasses: classes(inEd),
    previewHljs: outEd.length, previewClasses: classes(outEd),
    invalidMessageData: document.body.innerText.includes('Invalid message data.'),
  };
}
