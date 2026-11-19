insert into "Messages" (fk_users_id, "updatedAt", name, data) values
  (1, now(), 'QA B-15 message A', '{"content":"B-15 message A","embeds":[],"components":[]}'::json),
  (1, now(), 'QA B-15 message B', '{"content":"B-15 message B","embeds":[],"components":[]}'::json)
returning id;
