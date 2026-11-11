-- Re-run seeds: R1 (row-E Save) at the tip, plus a classic-unchanged control for the portal dump.
INSERT INTO "Messages" (fk_users_id, name, data, "updatedAt", valid) VALUES
 (1, 'qa-rowE-save-rerun', '{"flags":32768,"content":"","embeds":[{}],"components":[{"type":17,"components":[{"type":10,"content":"qa row E"}]}]}', now(), true),
 (1, 'qa-rowE-save-rerun2', '{"flags":32768,"content":"","embeds":[{}],"components":[{"type":17,"components":[{"type":10,"content":"qa row E"}]}]}', now(), true)
RETURNING id, name;
