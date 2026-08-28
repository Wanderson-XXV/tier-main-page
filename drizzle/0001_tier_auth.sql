CREATE TABLE `tier_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'teacher' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tier_users_email_unique` ON `tier_users` (`email`);
--> statement-breakpoint
CREATE TABLE `tier_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `tier_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tier_sessions_token_hash_unique` ON `tier_sessions` (`token_hash`);
--> statement-breakpoint
CREATE INDEX `idx_tier_sessions_expires_at` ON `tier_sessions` (`expires_at`);
--> statement-breakpoint
CREATE INDEX `idx_tier_sessions_user_id` ON `tier_sessions` (`user_id`);
--> statement-breakpoint
PRAGMA optimize;
