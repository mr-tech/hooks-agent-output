#!/usr/bin/env python3
"""Write the corpus as a TypeScript test fixture, each member carrying Discord's MEASURED verdict.

The verdict is the status this pass's re-send received (resend-results.json and
resend-results-batch2.json), never a value the website computes. For the 76 research members it
equals the research's recorded verdict (re-send summary: 76 of 76). The fixture is copied
byte-identical into the website at src/utils/__tests__/helpers/discordV2SendCorpus.ts; its sha256
is recorded in the QA document and checked at Phase 2.

The fixture text deliberately carries no case-id or limb token outside data fields (Test
Conventions, ID-token class over comment lines): ids are `id` values, titles should use `shape`.

Usage: python3 -I make_fixture.py <out.ts>
"""
import json
import sys

corpus = json.load(open("corpus.json", encoding="utf-8"))
rt = json.load(open("research-table.json", encoding="utf-8"))["rows"]
measured = {}
for f in ("resend-results.json", "resend-results-batch2.json"):
    d = json.load(open(f, encoding="utf-8"))
    for r in d["results"]:
        measured[r["id"]] = (r["discord"], d["summary"]["started"][:10])

QA_SHAPES = {
    "Q-ctl-row": "Container holding a Text Display and a valid Action Row",
    "Q-ctl-sec-thumb": "Container holding a valid Section with a Thumbnail",
    "Q-ctl-sec-btn": "Container holding a valid Section with a link-button accessory",
    "Q-ctl-gal": "Container holding a valid Media Gallery",
    "Q-row-url-empty": "Container holding an Action Row whose link button url is ''",
    "Q-row-url-abc": "Container holding an Action Row whose link button url is 'abc'",
    "Q-row-url-ftp": "Container holding an Action Row whose link button url is ftp://",
    "Q-row-label-absent": "Container holding an Action Row whose link button has no label key",
    "Q-sec-btn-url-empty": "Container holding a Section whose link-button accessory url is ''",
    "Q-sec-btn-label-space": "Container holding a Section whose link-button accessory label is one space",
    "Q-sec-thumb-url-empty": "Container holding a Section whose Thumbnail media.url is ''",
    "Q-sec-thumb-url-abc": "Container holding a Section whose Thumbnail media.url is 'abc'",
    "Q-sec-thumb-desc-empty": "Container holding a Section whose Thumbnail description is ''",
    "Q-gal-url-empty": "Container holding a Media Gallery whose item media.url is ''",
    "Q-gal-desc-empty": "Container holding a Media Gallery whose item description is ''",
    "Q-gal-desc-1025": "Container holding a Media Gallery whose item description is 1025 characters",
    "Q-file-in-container": "Container holding a Text Display and a File with an https url",
    "Q-sec-empty-in-container": "Container holding a Section with components []",
    "Q-thumb-desc-1024": "Section whose Thumbnail description is 1024 characters",
    "Q-thumb-desc-1025": "Section whose Thumbnail description is 1025 characters",
    "Q-gal-desc-1024": "Media Gallery item description of 1024 characters, beside a Text Display",
    "Q-gal-desc-1025-top": "Media Gallery item description of 1025 characters, beside a Text Display",
    "Q-gal-second-item-url-empty": "Media Gallery whose first item is valid and second item media.url is ''",
    "Q2-btn-emoji-empty-object": "link button with no label key and emoji {}",
    "Q2-btn-emoji-name-empty": "link button with no label key and emoji {name: ''}",
    "Q2-btn-url-absent": "link button with no url key",
    "Q2-thumb-media-empty-object": "Section whose Thumbnail media is {}",
    "Q2-thumb-media-absent": "Section whose Thumbnail has no media key",
    "Q2-item-media-absent": "Media Gallery item with no media key",
    "Q2-file-key-absent": "File with no file key",
    "Q2-section-components-absent": "Section with no components key",
    "Q2-row-components-absent": "Action Row with no components key, beside a Text Display",
    "Q2-label-nbsp": "link button label of one no-break space U+00A0",
    "Q2-label-u0085": "link button label of one next-line U+0085",
    "Q2-label-ufeff": "link button label of one U+FEFF",
    "Q2-td-u0085-space": "only a Text Display of U+0085 then a space",
    "Q2-td-space-u0085-newline": "only a Text Display of a space, U+0085, a newline",
    "Q2-td-ufeff-space": "only a Text Display of U+FEFF then a space",
    "Q2-td-u0085-in-text": "only a Text Display of 'a' then U+0085",
    "Q2-td-u200b-space": "only a Text Display of U+200B then a space",
}

members = []
for c in corpus:
    cid = c["id"]
    verdict, day = measured[cid]
    if c["set"] == "research":
        assert verdict == rt[cid]["discord"], cid
        shape = rt[cid]["shape"]
    else:
        shape = QA_SHAPES[cid]
    members.append({"id": cid, "source": c["set"], "shape": shape, "discord": verdict,
                    "measuredOn": day, "body": c["body"]})

head = """// Components V2 send bodies with the verdict Discord returned when each was sent from a webhook
// in the agents' test server. The verdict is a measured fact about Discord, not a value computed
// by this codebase. Generated by make_fixture.py in the agent-output record, beside the probe that
// sent these bodies; edit the generator, not this file.

export interface DiscordV2SendCorpusMember {
  readonly id: string;
  readonly source: 'research' | 'qa-extra' | 'qa-extra-2';
  readonly shape: string;
  readonly discord: 'accepted' | 'refused';
  readonly measuredOn: string;
  readonly body: { readonly flags: number; readonly components: readonly unknown[]; readonly [key: string]: unknown };
}

export const DISCORD_V2_SEND_CORPUS: readonly DiscordV2SendCorpusMember[] = """
with open(sys.argv[1], "w", encoding="utf-8", newline="\n") as f:
    f.write(head)
    f.write(json.dumps(members, ensure_ascii=True, indent=2))
    f.write(";\n")
acc = sum(m["discord"] == "accepted" for m in members)
print(f"members={len(members)} accepted={acc} refused={len(members) - acc}")
