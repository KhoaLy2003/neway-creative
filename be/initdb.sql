USE ContentDigitalCalendar;
-- contentdigitalcalendar.address definition

CREATE TABLE `address` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.category definition

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.customer definition

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `email_address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `UK_9uaghg9t4xiowjt9ndqickscs` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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


-- contentdigitalcalendar.hibernate_sequence definition

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.`role` definition

CREATE TABLE `role` (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.calendar definition

CREATE TABLE `calendar` (
  `calendar_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_delete` bit(1) NOT NULL,
  `link_notion` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `FK66kxtkmwjm0n1wc4x2a5q214p` (`category_id`),
  CONSTRAINT `FK66kxtkmwjm0n1wc4x2a5q214p` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  KEY `FK8u191vih7gvdry0ugh95n6639` (`calendar_id`),
  KEY `FKlb8mofup9mi791hraxt9wlj5u` (`order_id`),
  CONSTRAINT `FK8u191vih7gvdry0ugh95n6639` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`calendar_id`),
  CONSTRAINT `FKlb8mofup9mi791hraxt9wlj5u` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
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
  KEY `FKby2skjf3ov608yb6nm16b49lg` (`customer_id`),
  KEY `FK33pd2iqamm9gp5c14r1catra2` (`order_id`),
  CONSTRAINT `FK33pd2iqamm9gp5c14r1catra2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `FKby2skjf3ov608yb6nm16b49lg` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.user_role definition

CREATE TABLE `user_role` (
  `role_id` bigint NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`customer_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `FKlieglpaoo4b1etajmq897a598` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.users definition

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `address_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hbvhqvjgmhd5omxyo67ynvbyp` (`address_id`),
  CONSTRAINT `FKditu6lr4ek16tkxtdsne0gxib` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (is_delete,name) VALUES
	 (0,'Business'),
	 (0,'Education'),
	 (0,'Health & Fitness'),
	 (0,'Travel'),
	 (0,'Food & Drink');

INSERT INTO `calendar`
(`calendar_id`,
`created_at`,
`updated_at`,
`description`,
`image`,
`is_delete`,
`link_notion`,
`price`,
`title`,
`category_id`)
VALUES
(1, '2024-02-16 10:00:00', '2024-02-16 10:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ultricies odio, nec aliquam felis. Integer euismod euismod ipsum ut commodo.', 'image1.jpg', 0, 'https://www.notion.so/calendar1', 10.99, 'Sample Calendar 1', 1),
(2, '2024-02-16 11:00:00', '2024-02-16 11:00:00', 'Vivamus sagittis vestibulum sem, nec fermentum leo interdum quis. Phasellus sed libero mi.', 'image2.jpg', 0, 'https://www.notion.so/calendar2', 14.99, 'Sample Calendar 2', 2),
(3, '2024-02-16 12:00:00', '2024-02-16 12:00:00', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quis semper orci.', 'image3.jpg', 0, 'https://www.notion.so/calendar3', 9.99, 'Sample Calendar 3', 3),
(4, '2024-02-16 13:00:00', '2024-02-16 13:00:00', 'Fusce rutrum augue nec faucibus finibus. Nullam non massa elit.', 'image4.jpg', 0, 'https://www.notion.so/calendar4', 12.99, 'Sample Calendar 4', 1),
(5, '2024-02-16 14:00:00', '2024-02-16 14:00:00', 'Suspendisse potenti. Quisque non nibh ut nisi vehicula fermentum. Proin ac tristique nisi.', 'image5.jpg', 0, 'https://www.notion.so/calendar5', 11.99, 'Sample Calendar 5', 2),
(6, '2024-02-16 15:00:00', '2024-02-16 15:00:00', 'Donec ac sem eu sapien convallis interdum. Nullam auctor urna non justo lobortis, nec hendrerit nunc tempus.', 'image6.jpg', 0, 'https://www.notion.so/calendar6', 8.99, 'Sample Calendar 6', 3),
(7, '2024-02-16 16:00:00', '2024-02-16 16:00:00', 'Integer placerat turpis at ligula lobortis, ac fermentum libero ultricies. Fusce vitae urna id turpis consequat.', 'image7.jpg', 0, 'https://www.notion.so/calendar7', 15.99, 'Sample Calendar 7', 1),
(8, '2024-02-16 17:00:00', '2024-02-16 17:00:00', 'Etiam convallis libero quis diam finibus ultrices. Fusce ac vestibulum quam. In euismod sem vitae enim pulvinar rhoncus.', 'image8.jpg', 0, 'https://www.notion.so/calendar8', 10.49, 'Sample Calendar 8', 2),
(9, '2024-02-16 18:00:00', '2024-02-16 18:00:00', 'Mauris aliquam lorem ac libero vestibulum, vel dictum justo consequat. Vivamus sit amet velit libero.', 'image9.jpg', 0, 'https://www.notion.so/calendar9', 13.29, 'Sample Calendar 9', 3),
(10, '2024-02-16 19:00:00', '2024-02-16 19:00:00', 'Curabitur vel velit justo. Mauris ullamcorper leo ac nulla varius tincidunt. Duis sit amet ex vel ante ultricies dignissim.', 'image10.jpg', 0, 'https://www.notion.so/calendar10', 11.79, 'Sample Calendar 10', 1);
	 
INSERT INTO `role` (name) VALUES
	 ('admin'),
	 ('member');

