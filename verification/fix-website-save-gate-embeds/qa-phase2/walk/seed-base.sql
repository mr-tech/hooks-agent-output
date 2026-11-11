-- Base-tree (6d78b19) red runs: the same shapes as R1 and R2.
INSERT INTO "Messages" (fk_users_id, name, data, "updatedAt", valid) VALUES
 (1, 'qa-base-rowE-save', '{"flags":32768,"content":"","embeds":[{}],"components":[{"type":17,"components":[{"type":10,"content":"qa row E"}]}]}', now(), true),
 (1, 'qa-base-choice-classic','{"flags":32768,"content":"hi","embeds":[],"components":[{"type":17,"components":[{"type":10,"content":"qa choice"}]}]}', now(), true)
RETURNING id, name;
