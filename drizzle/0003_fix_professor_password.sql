UPDATE `tier_users`
SET `password_hash` = 'pbkdf2_sha256$100000$XQASu1Qtn2kVK0dP/h+UtA==$pSBUzrhyp5X7srKmWlvrcx4jWxN+OhwjsDamoSG5h6E=',
    `active` = 1
WHERE lower(`email`) = lower('professor@tiereducation.com.br');
--> statement-breakpoint
PRAGMA optimize;
