INSERT INTO `tier_users` (`id`, `name`, `email`, `password_hash`, `role`, `active`, `created_at`)
VALUES (
  '04c757a3-ebc1-45a7-8afb-6b95e901c4b0',
  'Professor TIER',
  'professor@tiereducation.com.br',
  'pbkdf2_sha256$100000$XQASu1Qtn2kVK0dP/h+UtA==$pSBUzrhyp5X7srKmWlvrcx4jWxN+OhwjsDamoSG5h6E=',
  'teacher',
  1,
  '2026-08-26T13:50:48.0831067Z'
)
ON CONFLICT(`email`) DO UPDATE SET
  `name` = excluded.`name`,
  `password_hash` = excluded.`password_hash`,
  `role` = excluded.`role`,
  `active` = 1;
--> statement-breakpoint
PRAGMA optimize;
