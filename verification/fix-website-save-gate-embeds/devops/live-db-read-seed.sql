CREATE TABLE "Messages" (id bigint primary key, "updatedAt" timestamp default now(), data jsonb not null);
-- expected to MATCH (V2 component beside only-empty embeds): ids 1-6
INSERT INTO "Messages"(id,data) VALUES
 (1,'{"flags":32768,"components":[{"type":10,"content":"x"}],"embeds":[{}]}'),
 (2,'{"flags":32768,"components":[{"type":17,"components":[]}],"embeds":[{"title":""}]}'),
 (3,'{"flags":32768,"components":[{"type":10}],"embeds":[{"_key":"a"}]}'),
 (4,'{"flags":32768,"components":[{"type":14}],"embeds":[{"fields":[]}]}'),
 (5,'{"flags":32768,"components":[{"type":10}],"embeds":[{},{"title":"","url":null}]}'),
 (6,'{"flags":32768,"components":[{"type":10}],"embeds":[null]}'),
-- expected NOT to match: 11 real embed content, 12 mixed, 13 classic only, 14 no embeds key, 15 empty embeds array, 16 action row only (type 1), 17 components not an array, 18 embeds not an array
 (11,'{"flags":32768,"components":[{"type":10}],"embeds":[{"title":"hi"}]}'),
 (12,'{"flags":32768,"components":[{"type":10}],"embeds":[{},{"description":"d"}]}'),
 (13,'{"flags":0,"content":"c","embeds":[{}]}'),
 (14,'{"flags":32768,"components":[{"type":10}]}'),
 (15,'{"flags":32768,"components":[{"type":10}],"embeds":[]}'),
 (16,'{"flags":0,"components":[{"type":1}],"embeds":[{}]}'),
 (17,'{"components":{"a":1},"embeds":[{}]}'),
 (18,'{"components":[{"type":10}],"embeds":"x"}'),
 (19,'{"flags":32768,"components":[{"type":10}],"embeds":[{"color":0}]}');
