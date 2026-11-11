-- Stored messages for the QA Phase 2 browser walk (local DB only; ids from 900000000000001 up).
INSERT INTO "Messages" (fk_users_id, name, data, "updatedAt", valid) VALUES
 (1, 'qa-rowE-save',    '{"flags":32768,"content":"","embeds":[{}],"components":[{"type":17,"components":[{"type":10,"content":"qa row E"}]}]}', now(), true),
 (1, 'qa-choice-classic','{"flags":32768,"content":"hi","embeds":[],"components":[{"type":17,"components":[{"type":10,"content":"qa choice"}]}]}', now(), true),
 (1, 'qa-choice-v2',    '{"flags":32768,"content":"hi","embeds":[],"components":[{"type":17,"components":[{"type":10,"content":"qa choice"}]}]}', now(), true),
 (1, 'qa-rowE-fail',    '{"flags":32768,"content":"","embeds":[{}],"components":[{"type":17,"components":[{"type":10,"content":"qa row E fail"}]}]}', now(), true),
 (1, 'qa-pusher-control','{"content":"control","embeds":[]}', now(), true),
 (1, 'qa-unchanged-save','{"content":"plain","embeds":[]}', now(), true)
RETURNING id, name;
