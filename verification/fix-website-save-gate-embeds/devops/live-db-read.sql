WITH n AS (
  SELECT id, "updatedAt",
    CASE WHEN jsonb_typeof(data->'components') = 'array' THEN data->'components' ELSE '[]'::jsonb END AS comps,
    CASE WHEN jsonb_typeof(data->'embeds') = 'array' THEN data->'embeds' ELSE '[]'::jsonb END AS embs
  FROM "Messages"
)
SELECT id, "updatedAt", jsonb_array_length(embs) AS embed_count
FROM n
WHERE jsonb_array_length(embs) > 0
  AND EXISTS (SELECT 1 FROM jsonb_array_elements(comps) c
              WHERE (c->>'type') IN ('9','10','11','12','13','14','17'))
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(embs) e
    WHERE EXISTS (
      SELECT 1 FROM jsonb_each(CASE WHEN jsonb_typeof(e) = 'object' THEN e ELSE '{}'::jsonb END) kv
      WHERE kv.key <> '_key' AND kv.value <> 'null'::jsonb AND kv.value <> '""'::jsonb AND kv.value <> '[]'::jsonb))
ORDER BY id;
