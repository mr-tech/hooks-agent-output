"""Apply one QA gap mutant, by id, to the export in the current directory.

Reads the mutant file named by MUTANTS (default: effort-final/website-gap-mutants.json
beside this script's parent) and the id named by MUT_ID; the replacement must apply exactly once.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
path = os.environ.get('MUTANTS') or os.path.join(HERE, '..', 'effort-final', 'website-gap-mutants.json')
mut_id = os.environ['MUT_ID']

mutant = next(m for m in json.load(open(path)) if m['id'] == mut_id)
text = open(mutant['file']).read()
if text.count(mutant['old']) != 1:
    sys.exit('mutant %s: old text occurs %d times in %s' % (mut_id, text.count(mutant['old']), mutant['file']))
open(mutant['file'], 'w').write(text.replace(mutant['old'], mutant['new']))
print('applied', mut_id, 'to', mutant['file'])
