SET NAMES utf8mb4;

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
  `content` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- contentdigitalcalendar.calendar definition

CREATE TABLE `calendar` (
  `calendar_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` text NOT NULL,
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
  `price` bigint NOT NULL,
  `status` varchar(255) NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK1oduxyuuo3n2g98l3j7754vym` (`customer_id`),
  CONSTRAINT `FK1oduxyuuo3n2g98l3j7754vym` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
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


-- contentdigitalcalendar.order_package definition

CREATE TABLE `order_package` (
  `order_id` int NOT NULL,
  `package_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`package_id`),
  KEY `FK6xkhpw0bjh9w3wubhwjjg40v4` (`package_id`),
  CONSTRAINT `FK6xkhpw0bjh9w3wubhwjjg40v4` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`),
  CONSTRAINT `FKpt6age72ikn4b77xrv5wgh0qk` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `customer`
(created_at, updated_at, email_address, name, otp, otp_generated_time, password, `role`, status)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test@gmail.com', 'test', '1234', CURRENT_TIMESTAMP, '$2a$10$HzHsp4I1MQ6da5FG7S8QK.arBeQv2Xwk7CHlz1clRb.PAV3Q//mXq', 
'CUSTOMER', 'ACTIVE');

INSERT INTO `category` (is_delete,name) VALUES
	 (0,'Cơ bản'),
	 (0,'Đồ uống'),
	 (0,'Sức khỏe'),
	 (0,'Thú cưng');

-- Lịch ý tưởng cho mọi ngành nghề --
INSERT INTO `calendar`
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Đây là lịch ý tưởng mà bất kể bạn đang trong lĩnh vực nào cũng có thể sử dụng ngay tức khắc. Chỉ với vài cú click, bạn đã có ngay 90 ý tưởng dùng để đăng bài mỗi ngày.
Gói basic không bao gồm các bài viết có sẵn như gói Advanced và Premium. Tuy nhiên, bạn vẫn có thể tự sáng tạo nội dung theo cách mình muốn với ideas của bộ lịch cung cấp.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446937/samples/cup-on-a-table.jpg', 0, 'Lịch ý tưởng cho mọi ngành nghề', 1);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://valiant-fork-3c7.notion.site/Basic-L-ch-Content-Ideasy-b88d3a83360a4f2ca3b1c7d6d2e2fdae?pvs=4', 'BASIC', 500000, 1);


-- Cà phê và Đồ uống --
INSERT INTO `calendar`
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ' Được thiết kế đặc biệt cho những doanh nghiệp hoạt động trong lĩnh vực cà phê, bộ lịch này mang đến 90 ý tưởng sáng tạo, từ các bài đăng giới thiệu sản phẩm, câu chuyện thương hiệu, cho đến những mẹo vặt về pha chế cà phê. 
Mỗi ý tưởng đều được tinh chỉnh để phù hợp với xu hướng và thị hiếu của khách hàng yêu thích cà phê. Với bộ lịch này, bạn sẽ dễ dàng thu hút và giữ chân khách hàng bằng những nội dung chất lượng và độc đáo.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446916/samples/ecommerce/accessories-bag.jpg', 0, 'Cà phê và Đồ uống', 2);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://valiant-fork-3c7.notion.site/Advanced-L-ch-C-ph-Ideasy-ede0c6aa2a3a494688ed62ee8abed132?pvs=4', 'ADVANCED', 800000, 2);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'PREMIUM', 1500000, 2);


-- Sức khỏe và Yoga --
INSERT INTO `calendar`
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Đặc biệt dành riêng cho cộng đồng yoga, bộ lịch này chứa 90 ý tưởng sáng tạo được thiết kế để giúp bạn kết nối sâu sắc hơn với học viên và người theo dõi. 
Từ các bài đăng về lợi ích của từng động tác, hướng dẫn tập luyện, đến những lời khuyên về dinh dưỡng và lối sống lành mạnh, bộ lịch này giúp bạn duy trì một luồng nội dung liên tục và hấp dẫn. Chỉ cần vài bước đơn giản, bạn sẽ có ngay nguồn cảm hứng không ngừng để chia sẻ đam mê và kiến thức yoga của mình đến với khách hàng của mình.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446933/samples/breakfast.jpg', 0, 'Sức khỏe và Yoga', 3);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://valiant-fork-3c7.notion.site/Advanced-L-ch-Yoga-Ideasy-081b80acd1d4481caeec93f9bd7f7efa?pvs=4', 'ADVANCED', 800000, 3);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'PREMIUM', 1500000, 3);


-- Thú cưng và thú y --
INSERT INTO `calendar`
(created_at, updated_at, description, image, is_delete, title, category_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bộ lịch này được tạo ra để hỗ trợ các chuyên gia trong lĩnh vực thú y, mang lại 90 ý tưởng nội dung phong phú và cụ thể. Từ các bài viết về chăm sóc thú cưng, kiến thức y khoa, đến những câu chuyện thành công trong việc chữa trị, tất cả đều giúp bạn xây dựng một hình ảnh chuyên nghiệp và gần gũi. 
Bộ lịch giúp bạn dễ dàng chia sẻ kiến thức và tương tác với khách hàng, nâng cao uy tín và thu hút nhiều người quan tâm đến dịch vụ của bạn.',
'https://res.cloudinary.com/dfdwupiah/image/upload/v1707446919/samples/landscapes/nature-mountains.jpg', 0, 'Thú cưng và thú y', 4);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://valiant-fork-3c7.notion.site/Advanced-L-ch-Th-Y-Ideasy-e2a80a05640c459ca737d501b4cd5710?pvs=4', 'ADVANCED', 800000, 4);

INSERT INTO `package`
(created_at, updated_at, duration_unit, duration_value, link_notion, package_type, price, calendar_id)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MONTHS', 3, 'https://example.com/package-basic', 'PREMIUM', 1500000, 4);

-- POST --
INSERT INTO post (created_at,updated_at,content,description,status,thumbnail,title) VALUES
('2024-05-19','2024-05-19',
'<p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/16/1f4cc.png" alt="📌" width="16" height="16"> Bạn đang tìm kiếm giải pháp sáng tạo nội dung hiệu quả để thu hút khách hàng và thúc đẩy doanh số bán hàng? Ideasy chính là lựa chọn hoàn hảo dành cho bạn!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"> Ideasy - Lịch Contents Linh Hoạt: <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"><br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/taa/1/16/1f310.png" alt="🌐" width="16" height="16"> Gói cơ bản: Lên lịch nội dung cho 2 kênh mạng xã hội (Facebook, Instagram)<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16"> Gói nâng cao:<br>• Lên lịch nội dung cho 3 kênh mạng xã hội (Facebook, Instagram, YouTube)<br>• Tặng 5 bài ý tưởng nội dung<br>• Phân tích hiệu quả nội dung<br>• Hỗ trợ 24/7<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1/16/1f48e.png" alt="💎" width="16" height="16"> Gói cao cấp:<br>• Lên lịch nội dung cho 6 kênh mạng xã hội (Facebook, Instagram, Twitter, YouTube, LinkedIn, TikTok)<br>• Tặng 15 bài content tự động<br>• Tối ưu thời gian đăng bài<br>• Tư vấn chiến lược nội dung<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"> Dịch Vụ Trọn Gói: <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"><br>• Thiết kế hình ảnh minh họa<br>• Thêm video<br>• Admin<br>• Đăng bài tự động<br>• Nhắc nhở chia sẻ lịch<br>• Tạo lịch<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16"> Ideasy Cam Kết:<br>• Đội ngũ sáng tạo giàu kinh nghiệm, am hiểu thị trường<br>• Giải pháp nội dung chất lượng cao, hiệu quả<br>• Dịch vụ chuyên nghiệp, tận tâm<br>• Giá cả cạnh tranh<br><br><a href="https://www.facebook.com/hashtag/ideasy?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#Ideasy</strong></a> <a href="https://www.facebook.com/hashtag/lichcontent?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#LichContent</strong></a> <a href="https://www.facebook.com/hashtag/marketing?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#Marketing</strong></a> <a href="https://www.facebook.com/hashtag/doanhnghiep?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#DoanhNghiep</strong></a> <a href="https://www.facebook.com/hashtag/tangtuongtac?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#TangTuongTac</strong></a><br><br>-----------------------------------------------------------------------------<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: daoduydi1612@gmail.com</p>',
'','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1716114694/ideasy/auoftyvadj75rnx15ste.jpg','Nâng tầm nội dung. Bất phá doanh nghiệp'),
('2024-05-15','2024-05-15',
'<p>5 bí quyết viết content marketing thu hút<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Kỹ năng content marketing là công cụ đắc lực để thu hút khách hàng và thúc đẩy doanh số bán hàng. Tuy nhiên, để viết được content thu hút, bạn cần nắm được một số bí quyết sau:<br><br>• Xác định rõ đối tượng mục tiêu: Bạn cần hiểu rõ khách hàng của mình là ai, họ quan tâm đến điều gì, họ đang gặp vấn đề gì. Từ đó, bạn mới có thể sáng tạo nội dung phù hợp để thu hút họ.<br><br>• Lựa chọn chủ đề phù hợp: Chọn những chủ đề mà đối tượng mục tiêu của bạn quan tâm. Đồng thời, chủ đề cũng cần liên quan đến sản phẩm hay dịch vụ mà bạn cung cấp.<br><br>• Viết nội dung hấp dẫn và dễ đọc: Sử dụng ngôn ngữ đơn giản, dễ hiểu, tránh dùng những từ ngữ chuyên ngành khó hiểu. Kết hợp hình ảnh, video để bài viết thêm sinh động và thu hút.<br><br>• Kêu gọi hành động: Khuyến khích người đọc thực hiện một hành động cụ thể, ví dụ như truy cập website, đăng ký nhận bản tin, mua hàng,...<br><br>• Đo lường và phân tích hiệu quả: Theo dõi hiệu quả của các bài viết content marketing để điều chỉnh chiến lược phù hợp.<br><br>------------------<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: ideasylichytuongsangtao@gmail.com</p>',
'','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1716114699/ideasy/g49uqelmcwjxzz2arkcw.jpg','Bí quyết viết content thu hút');