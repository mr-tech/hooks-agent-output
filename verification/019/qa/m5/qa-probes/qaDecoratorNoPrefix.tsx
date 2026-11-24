import hljs from 'highlight.js';
import { Text } from 'slate';

import flattenNodeText from './flattenNodeText';
import scanHighlight from './highlightScan';
import { styleUnit } from './unitStyles';

import type {
  Descendant, Editor, Element, NodeEntry, Path, Range,
} from 'slate';
import type { Surface } from '~/utils/markdown/engine';
import type { CharStyle } from './unitStyles';

function codeLineRanges(line: Element, path: Path, length: number): Range[] {
  if (hljs.getLanguage(line.lang) === undefined) return [];
  const start = line.children.slice(0, path.at(-1)).map((c) => flattenNodeText(c)).join('').length;
  const options = { language: line.lang, ignoreIllegals: true };
  const { value } = hljs.highlight(flattenNodeText(line), options);
  const styles: CharStyle[] = scanHighlight(value).map((classNames) => ({ classNames, syntax: false }));
  return rangesOf(path, styles, start, length);
}

type Unit = { text: string; startsInCodeBlock: boolean; lineStarts: Map<number, number> };

const STYLE_CACHE_LIMIT = 512;

function unitAround(children: Descendant[], line: number): Unit {
  const isRun = (index: number) => {
    const element = children[index] as Element | undefined;
    return element !== undefined && element.type !== 'codeBlock';
  };
  let first = line;
  while (isRun(first - 1)) first -= 1;
  let last = line;
  while (isRun(last + 1)) last += 1;
  const lineStarts = new Map<number, number>();
  let text = '';
  for (let index = first; index <= last; index += 1) {
    const element = children[index] as Element;
    if (index > first) text += '\n';
    lineStarts.set(index, text.length);
    text += element.children.map((child) => (Text.isText(child) ? child.text : '?')).join('');
  }
  return { text, startsInCodeBlock: (children[first] as Element).startCodeBlock, lineStarts };
}

function rangesOf(path: Path, styles: CharStyle[], from: number, length: number): Range[] {
  const ranges: Range[] = [];
  let start = 0;
  const same = (a: CharStyle, b: CharStyle) => a.syntax === b.syntax
    && a.classNames.length === b.classNames.length && a.classNames.every((name, i) => name === b.classNames[i]);
  for (let i = 1; i <= length; i += 1) {
    const current = styles[from + start];
    if (i < length && same(current, styles[from + i])) continue;
    if (current.syntax || current.classNames.length) {
      ranges.push({
        anchor: { path, offset: start },
        focus: { path, offset: i },
        classNames: [...current.classNames],
        syntax: current.syntax,
      });
    }
    start = i;
  }
  return ranges;
}

export default (
  editor: Editor,
  mounted: boolean,
  isEmbed: boolean,
  surface: Surface,
) => {
  const styleCache = new Map<string, CharStyle[]>();
  let pass: { children: Descendant[]; units: Map<number, Unit> } | undefined;

  const stylesOf = (unit: Unit): CharStyle[] | undefined => {
    const key = `${unit.startsInCodeBlock ? 1 : 0}:${unit.text}`;
    const cached = styleCache.get(key);
    if (cached) return cached;
    const styles = styleUnit(surface, unit.text, unit.startsInCodeBlock);
    if (!styles) return undefined;
    if (styleCache.size >= STYLE_CACHE_LIMIT) {
      styleCache.delete(styleCache.keys().next().value as string);
    }
    styleCache.set(key, styles);
    return styles;
  };

  return ([node, path]: NodeEntry): Range[] => {
    if (!Text.isText(node) || path.length !== 2) return [];
    const [lineIndex, childIndex] = path;
    const line = editor.children[lineIndex] as Element;

    if (line.lang) return codeLineRanges(line, path, node.text.length);
    if (line.type === 'codeBlock') return [];

    if (pass?.children !== editor.children) pass = { children: editor.children, units: new Map() };
    let unit = pass.units.get(lineIndex);
    if (!unit) {
      unit = unitAround(editor.children, lineIndex);
      for (const index of unit.lineStarts.keys()) pass.units.set(index, unit);
    }
    const styles = stylesOf(unit);
    if (!styles) return [];

    const before = line.children.slice(0, childIndex)
      .reduce((width, child) => width + (Text.isText(child) ? child.text.length : 1), 0);
    const from = (unit.lineStarts.get(lineIndex) as number) + before;
    return rangesOf(path, styles, from, node.text.length);
  };
};
