CREATE TABLE `patients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mrn` integer NOT NULL,
	`first_name` text NOT NULL,
	`middle_name` text,
	`last_name` text,
	`sex` text NOT NULL,
	`blood_type` text,
	`civil_status` text,
	`email` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_patients_mrn` ON `patients` (`mrn`);--> statement-breakpoint
CREATE INDEX `idx_patients_sex` ON `patients` (`sex`);--> statement-breakpoint
CREATE INDEX `idx_patients_blood_type` ON `patients` (`blood_type`);--> statement-breakpoint
CREATE INDEX `idx_patients_deleted_at` ON `patients` (`deleted_at`);