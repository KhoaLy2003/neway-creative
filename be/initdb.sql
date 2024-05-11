-- contentdigitalcalendar.category definition

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.customer definition

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_generated_time` datetime(6) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `UK_9uaghg9t4xiowjt9ndqickscs` (`email_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.flyway_schema_history definition

CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.post definition

CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.calendar definition

CREATE TABLE `calendar` (
  `calendar_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_delete` bit(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `FK66kxtkmwjm0n1wc4x2a5q214p` (`category_id`),
  CONSTRAINT `FK66kxtkmwjm0n1wc4x2a5q214p` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.`order` definition

CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `order_date` datetime(6) NOT NULL,
  `quantity` int NOT NULL,
  `status` int NOT NULL,
  `total_price` bigint NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK1oduxyuuo3n2g98l3j7754vym` (`customer_id`),
  CONSTRAINT `FK1oduxyuuo3n2g98l3j7754vym` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.order_detail definition

CREATE TABLE `order_detail` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `price` bigint NOT NULL,
  `calendar_id` int DEFAULT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  UNIQUE KEY `UK_cqw66mchf5sctmmy6urw685tl` (`calendar_id`),
  KEY `FKlb8mofup9mi791hraxt9wlj5u` (`order_id`),
  CONSTRAINT `FK8u191vih7gvdry0ugh95n6639` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`),
  CONSTRAINT `FKlb8mofup9mi791hraxt9wlj5u` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.package definition

CREATE TABLE `package` (
  `package_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `duration_unit` varchar(255) NOT NULL,
  `duration_value` int NOT NULL,
  `link_notion` varchar(255) NOT NULL,
  `package_type` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `calendar_id` int NOT NULL,
  PRIMARY KEY (`package_id`),
  KEY `FKqu4fc3ff5squ1hu8mhx5mfujc` (`calendar_id`),
  CONSTRAINT `FKqu4fc3ff5squ1hu8mhx5mfujc` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.payment definition

CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `amount` bigint NOT NULL,
  `payment_date` datetime(6) NOT NULL,
  `status` int NOT NULL,
  `customer_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `UK_mf7n8wo2rwrxsd6f3t9ub2mep` (`order_id`),
  KEY `FKby2skjf3ov608yb6nm16b49lg` (`customer_id`),
  CONSTRAINT `FK33pd2iqamm9gp5c14r1catra2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `FKby2skjf3ov608yb6nm16b49lg` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (is_delete,name) VALUES
	 (0,'Cafe'),
	 (0,'Yoga'),
	 (0,'Pharmacy'),
	 (0,'Life');
	
INSERT INTO calendar
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Discover a new coffee blend every day and learn the art of coffee making.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446937/samples/cup-on-a-table.jpg', 0, 'Coffee Blend of the Day', 1);

INSERT INTO calendar
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Join us for daily yoga sessions to rejuvenate your mind and body.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446916/samples/ecommerce/accessories-bag.jpg', 0, 'Daily Yoga Practice', 2);

INSERT INTO calendar
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Get daily health tips and learn about the benefits of vitamins and supplements.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446933/samples/breakfast.jpg', 0, 'Health and Wellness Tips', 3);

INSERT INTO calendar
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Start your day with an inspirational quote and a quick overview of world news.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446919/samples/landscapes/nature-mountains.jpg', 0, 'Daily Inspiration and News', 4);

INSERT INTO package
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'BASIC', 100000, 1);

INSERT INTO package
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'BASIC', 100000, 2);

INSERT INTO package
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'BASIC', 100000, 3);

INSERT INTO package
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'BASIC', 100000, 4);