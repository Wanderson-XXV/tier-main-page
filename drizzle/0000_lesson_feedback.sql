CREATE TABLE `lesson_feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`grade` text NOT NULL,
	`module_id` integer NOT NULL,
	`teacher_email` text NOT NULL,
	`teacher_name` text NOT NULL,
	`class_name` text NOT NULL,
	`taught_at` text NOT NULL,
	`completion` integer NOT NULL,
	`engagement` integer NOT NULL,
	`timing` text NOT NULL,
	`notes` text NOT NULL,
	`strengths` text NOT NULL,
	`challenges` text NOT NULL,
	`adjustments` text NOT NULL,
	`next_steps` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_feedback_lesson_created` ON `lesson_feedback` (`lesson_id`,`created_at`);
