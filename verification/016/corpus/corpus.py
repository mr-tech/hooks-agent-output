#!/usr/bin/env python3
"""Corpus of Components V2 send bodies for plan 016, AC1-1 (and QA Phase 1 extra members).

A reconstruction. The research run's own probe files were deleted at its run end
(research/closed/components-v2-send-validity-2026-11-11.md, "Process facts"), so each body below
is rebuilt from that document's Appendix builders and its Evidence-table "Shape" text. Where the
text leaves a detail open (which side a Text Display sits on, which emoji), the choice is the one
the document's error-body paths fix (e.g. E5's `components.1` puts the empty Text Display second),
or, where no path fixes it, noted per case in `RECON_NOTES`.

The expected verdicts are NOT in this file. They are read by `research_table.py` from the research
document's own text at record commit c9f8e3a, so this file cannot supply its own oracle.

Usage: python3 -I corpus.py <out.json>     (writes the corpus; prints the case count)
"""
import json
import sys

MEDIA = "https://cdn.discordapp.com/embed/avatars/0.png"
LINK = "https://hooks.gg"


def td(s="hello"):
    return {"type": 10, "content": s}


def td_nokey():
    return {"type": 10}


def thumb(url=MEDIA, **kw):
    return {"type": 11, "media": {"url": url}, **kw}


def button(**kw):  # label=None drops the key
    b = {"type": 2, "style": 5, "label": "Link", "url": LINK}
    b.update(kw)
    return {k: v for k, v in b.items() if v is not None}


def section(children, acc):
    return {"type": 9, "components": children, **({"accessory": acc} if acc else {})}


def gallery(items):
    return {"type": 12, "items": items}


def item(url=MEDIA, **kw):
    return {"media": {"url": url}, **kw}


def row(buttons):
    return {"type": 1, "components": buttons}


def container(children):
    return {"type": 17, "components": children}


def file_(url):
    return {"type": 13, "file": {"url": url}}


SEP = {"type": 14, "divider": True, "spacing": 1}
EMOJI = {"name": "\U0001F44D"}


def v2(components, **top):
    return {"flags": 32768, "components": components, **top}


# --- the research's 76 shapes, in Evidence-table order ---------------------------------------
RESEARCH = {
    "A1": v2([td()]),
    "A2": v2([td()], content="", embeds=[]),
    "A3": v2([]),
    "A4": v2([td()], content=" \n "),
    "A5": v2([td()], content="x"),
    "B1": v2([td("")]),
    "B2": v2([td(" ")]),
    "B3": v2([td("\n")]),
    "B4": v2([td(" ")]),
    "B5": v2([td("​")]),
    "B6": v2([td_nokey()]),
    "B7": v2([td(), td("")]),
    "B8": v2([td(), td(" ")]),
    "B9": v2([section([td("")], thumb())]),
    "B10": v2([section([td(" ")], thumb())]),
    "B11": v2([container([td("")])]),
    "B12": v2([container([td(" ")])]),
    "C1": v2([section([td()], thumb())]),
    "C2": v2([section([], thumb())]),
    "C3": v2([section([td()], thumb(""))]),
    "C4": v2([section([td()], None)]),
    "C5": v2([section([td()], button())]),
    "C6": v2([section([td()], button(url=""))]),
    "C7": v2([section([td()], button(label=None))]),
    "C8": v2([section([td()], button(label=""))]),
    "C9": v2([section([td()], button(label=" "))]),
    "C10": v2([section([td()], thumb(description=""))]),
    "C11": v2([section([td()], thumb(description=" "))]),
    "D1": v2([gallery([item()])]),
    "D2": v2([gallery([])]),
    "D3": v2([gallery([item("")])]),
    "D4": v2([gallery([item(description="")])]),
    "D5": v2([gallery([item(description=" ")])]),
    "D6": v2([{"type": 12}]),
    "E1": v2([td(), file_("")]),
    "E2": v2([td(), file_(MEDIA)]),
    "E3": v2([td(), file_("attachment://missing.png")]),
    "F1": v2([SEP]),
    "F2": v2([td(), SEP]),
    "G1": v2([container([td()])]),
    "G2": v2([container([])]),
    "G3": v2([{"type": 17}]),
    "H1": v2([td(), row([button()])]),
    "H2": v2([td(), row([])]),
    "H3": v2([td(), row([button(url="")])]),
    "H4": v2([td(), row([button(label=None)])]),
    "H5": v2([td(), row([button(label="")])]),
    "H6": v2([td(), row([button(label=" ")])]),
    "H7": v2([row([button()])]),
    "I1": v2([td(), row([button(url="abc")])]),
    "I2": v2([section([td()], thumb("abc"))]),
    "I3": v2([gallery([item("abc")])]),
    "W1": v2([td("\t")]),
    "W2": v2([td("\r\n")]),
    "W3": v2([td("　")]),
    "W4": v2([td(" ")]),
    "W5": v2([td("﻿")]),
    "W6": v2([td("\u0085")]),
    "W7": v2([td(" ")]),
    "W8": v2([td(" hello ")]),
    "X1": v2([td(), row([button(label=None, emoji=EMOJI)])]),
    "X2": v2([container([td(), row([])])]),
    "X3": v2([container([td(), gallery([])])]),
    "X4": v2([container([SEP])]),
    "X5": v2([td(), row([button(url="ftp://example.com")])]),
    "X6": v2([section([td()], thumb("ftp://example.com/a.png"))]),
    "X7": v2([container([section([td("")], thumb())])]),
    "N1": v2([td() for _ in range(40)]),
    "N2": v2([td() for _ in range(41)]),
    "N3": v2([container([td() for _ in range(39)])]),
    "N4": v2([container([td() for _ in range(40)])]),
    "N5": v2([section([td()], thumb()) for _ in range(13)] + [td()]),
    "N6": v2([section([td()], thumb()) for _ in range(13)] + [td(), td()]),
    "N7": v2([td() for _ in range(39)] + [gallery([item() for _ in range(10)])]),
    "N8": v2([td() for _ in range(38)] + [row([button()])]),
    "N9": v2([td() for _ in range(39)] + [row([button()])]),
}

RECON_NOTES = {
    "A2": "key order content, embeds after components; Discord reads JSON by key, order immaterial",
    "E2": "the https URL is the Appendix's MEDIA constant (the Shape text says only 'an https file.url')",
    "F2": "Separator placed after the Text Display; no error path fixes the order (accepted shape)",
    "H1": "Text Display first, by H2-H6's error paths at components.1",
    "X1": "emoji is {name: thumbs-up}; the research does not record which emoji it used",
    "N5": "the extra Text Display(s) placed after the Sections; accepted/refused by count, not position",
}

# --- QA Phase 1 extra members (not research cases; first measured by this pass) ---------------
# Placement of the per-field limbs L6 to L10 inside a Container, which the research did not send,
# each beside a nested accepted control; and the 1024/1025 description bound at the shape the
# description research sent (its DESCBOUND list), so L10's length limb has a corpus member here.
DESC1024 = "d" * 1024
EXTRA = {
    "Q-ctl-row": v2([container([td(), row([button()])])]),
    "Q-ctl-sec-thumb": v2([container([section([td()], thumb())])]),
    "Q-ctl-sec-btn": v2([container([section([td()], button())])]),
    "Q-ctl-gal": v2([container([gallery([item()])])]),
    "Q-row-url-empty": v2([container([td(), row([button(url="")])])]),
    "Q-row-url-abc": v2([container([td(), row([button(url="abc")])])]),
    "Q-row-url-ftp": v2([container([td(), row([button(url="ftp://example.com")])])]),
    "Q-row-label-absent": v2([container([td(), row([button(label=None)])])]),
    "Q-sec-btn-url-empty": v2([container([section([td()], button(url=""))])]),
    "Q-sec-btn-label-space": v2([container([section([td()], button(label=" "))])]),
    "Q-sec-thumb-url-empty": v2([container([section([td()], thumb(""))])]),
    "Q-sec-thumb-url-abc": v2([container([section([td()], thumb("abc"))])]),
    "Q-sec-thumb-desc-empty": v2([container([section([td()], thumb(description=""))])]),
    "Q-gal-url-empty": v2([container([gallery([item("")])])]),
    "Q-gal-desc-empty": v2([container([gallery([item(description="")])])]),
    "Q-gal-desc-1025": v2([container([gallery([item(description="g" * 1025)])])]),
    "Q-file-in-container": v2([container([td(), file_(MEDIA)])]),
    "Q-sec-empty-in-container": v2([container([section([], thumb())])]),
    "Q-thumb-desc-1024": v2([section([td("a")], thumb(description=DESC1024))]),
    "Q-thumb-desc-1025": v2([section([td("a")], thumb(description=DESC1024 + "d"))]),
    "Q-gal-desc-1024": v2([td("a"), gallery([item(description="g" * 1024)])]),
    "Q-gal-desc-1025-top": v2([td("a"), gallery([item(description="g" * 1025)])]),
    "Q-gal-second-item-url-empty": v2([gallery([item(), item("")])]),
}


# Second batch: key-absent forms the research marked "not sent" (AC1-3's population), what counts
# as "an emoji" for L8, and D-9's two exceptions inside longer whitespace runs (L1's rule as a
# class, beyond the single-character members W5 and W6).
EXTRA2 = {
    "Q2-btn-emoji-empty-object": v2([td(), row([button(label=None, emoji={})])]),
    "Q2-btn-emoji-name-empty": v2([td(), row([button(label=None, emoji={"name": ""})])]),
    "Q2-btn-url-absent": v2([td(), row([{"type": 2, "style": 5, "label": "Link"}])]),
    "Q2-thumb-media-empty-object": v2([section([td()], {"type": 11, "media": {}})]),
    "Q2-thumb-media-absent": v2([section([td()], {"type": 11})]),
    "Q2-item-media-absent": v2([gallery([{}])]),
    "Q2-file-key-absent": v2([td(), {"type": 13}]),
    "Q2-section-components-absent": v2([{"type": 9, "accessory": thumb()}]),
    "Q2-row-components-absent": v2([td(), {"type": 1}]),
    "Q2-label-nbsp": v2([td(), row([button(label=" ")])]),
    "Q2-label-u0085": v2([td(), row([button(label="\u0085")])]),
    "Q2-label-ufeff": v2([td(), row([button(label="﻿")])]),
    "Q2-td-u0085-space": v2([td("\u0085 ")]),
    "Q2-td-space-u0085-newline": v2([td(" \u0085\n")]),
    "Q2-td-ufeff-space": v2([td("﻿ ")]),
    "Q2-td-u0085-in-text": v2([td("a\u0085")]),
    "Q2-td-u200b-space": v2([td("​ ")]),
}


# Third batch (re-key on plan revision 2): the revision's "whitespace-empty" wording ("after trim(),
# every remaining character is U+0085") against U+0085 with whitespace between, which trim() cannot
# reach because a U+0085 at the end stops it.
EXTRA3 = {
    "Q3-td-u0085-space-u0085": v2([td("\u0085 \u0085")]),
    "Q3-td-space-u0085-space-u0085-space": v2([td(" \u0085 \u0085 ")]),
    "Q3-td-u0085-u0085": v2([td("\u0085\u0085")]),
    "Q3-label-u0085-space-u0085": v2([td(), row([button(label="\u0085 \u0085")])]),
}


def build():
    out = []
    for cid, body in RESEARCH.items():
        out.append({"id": cid, "set": "research", "body": body, "note": RECON_NOTES.get(cid)})
    for cid, body in EXTRA.items():
        out.append({"id": cid, "set": "qa-extra", "body": body, "note": None})
    for cid, body in EXTRA2.items():
        out.append({"id": cid, "set": "qa-extra-2", "body": body, "note": None})
    for cid, body in EXTRA3.items():
        out.append({"id": cid, "set": "qa-extra-3", "body": body, "note": None})
    return out


if __name__ == "__main__":
    cases = build()
    with open(sys.argv[1], "w", encoding="utf-8") as f:
        json.dump(cases, f, ensure_ascii=True, indent=1)
    print(f"research={sum(c['set'] == 'research' for c in cases)} "
          f"qa-extra={sum(c['set'] == 'qa-extra' for c in cases)}")
