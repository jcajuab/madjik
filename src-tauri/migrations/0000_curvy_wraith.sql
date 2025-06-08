CREATE TABLE `addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`street` text,
	`barangay` text,
	`city_municipality` text NOT NULL,
	`province` text NOT NULL,
	`region` text NOT NULL,
	`zip_code` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE INDEX `idx_addresses_city_municipality` ON `addresses` (`city_municipality`);--> statement-breakpoint
CREATE INDEX `idx_addresses_province` ON `addresses` (`province`);--> statement-breakpoint
CREATE INDEX `idx_addresses_deleted_at` ON `addresses` (`deleted_at`);--> statement-breakpoint
CREATE TABLE `emergency_contact_addresses` (
	`emergency_contact_id` integer,
	`address_id` integer,
	`is_primary` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	PRIMARY KEY(`emergency_contact_id`, `address_id`),
	FOREIGN KEY (`emergency_contact_id`) REFERENCES `emergency_contacts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_emergency_contact_addresses_primary` ON `emergency_contact_addresses` (`emergency_contact_id`,`is_primary`);--> statement-breakpoint
CREATE TABLE `emergency_contact_phone_numbers` (
	`emergency_contact_id` integer,
	`phone_number_id` integer,
	`is_primary` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	PRIMARY KEY(`emergency_contact_id`, `phone_number_id`),
	FOREIGN KEY (`emergency_contact_id`) REFERENCES `emergency_contacts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`phone_number_id`) REFERENCES `phone_numbers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_emergency_contact_phone_numbers_primary` ON `emergency_contact_phone_numbers` (`emergency_contact_id`,`is_primary`);--> statement-breakpoint
CREATE TABLE `emergency_contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`relationship` text NOT NULL,
	`email` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_emergency_contacts_last_name` ON `emergency_contacts` (`last_name`);--> statement-breakpoint
CREATE INDEX `idx_emergency_contacts_deleted_at` ON `emergency_contacts` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `idx_emergency_contacts_name` ON `emergency_contacts` (`last_name`,`first_name`);--> statement-breakpoint
CREATE TABLE `patient_addresses` (
	`patient_id` integer,
	`address_id` integer,
	`is_primary` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	PRIMARY KEY(`patient_id`, `address_id`),
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_patient_addresses_primary` ON `patient_addresses` (`patient_id`,`is_primary`);--> statement-breakpoint
CREATE TABLE `patient_phone_numbers` (
	`patient_id` integer,
	`phone_number_id` integer,
	`is_primary` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	PRIMARY KEY(`patient_id`, `phone_number_id`),
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`phone_number_id`) REFERENCES `phone_numbers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_patient_phone_numbers_primary` ON `patient_phone_numbers` (`patient_id`,`is_primary`);--> statement-breakpoint
CREATE TABLE `patients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mrn` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`dob` text,
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
CREATE INDEX `idx_patients_last_name` ON `patients` (`last_name`);--> statement-breakpoint
CREATE INDEX `idx_patients_deleted_at` ON `patients` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `idx_patients_name` ON `patients` (`last_name`,`first_name`);--> statement-breakpoint
CREATE TABLE `phone_numbers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`raw` text NOT NULL,
	`country_code` text NOT NULL,
	`country_calling_code` text NOT NULL,
	`e164` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_phone_numbers_e164` ON `phone_numbers` (`e164`);--> statement-breakpoint
CREATE INDEX `idx_phone_numbers_deleted_at` ON `phone_numbers` (`deleted_at`);