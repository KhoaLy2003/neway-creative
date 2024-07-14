SET NAMES utf8mb4;

-- ContentDigitalCalendar.category definition

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ContentDigitalCalendar.customer definition

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

-- ContentDigitalCalendar.post definition

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


-- ContentDigitalCalendar.calendar definition

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

-- ContentDigitalCalendar.`order` definition

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


-- ContentDigitalCalendar.package definition

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


-- ContentDigitalCalendar.order_package definition

CREATE TABLE `order_package` (
  `order_id` int NOT NULL,
  `package_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`package_id`),
  KEY `FK6xkhpw0bjh9w3wubhwjjg40v4` (`package_id`),
  CONSTRAINT `FK6xkhpw0bjh9w3wubhwjjg40v4` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`),
  CONSTRAINT `FKpt6age72ikn4b77xrv5wgh0qk` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- customer --
INSERT INTO `customer`
(created_at, updated_at, email_address, name, otp, otp_generated_time, password, `role`, status)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test@gmail.com', 'test', '1234', CURRENT_TIMESTAMP, '$2a$10$HzHsp4I1MQ6da5FG7S8QK.arBeQv2Xwk7CHlz1clRb.PAV3Q//mXq', 
'CUSTOMER', 'ACTIVE');

-- category --
INSERT INTO `category` (is_delete,name) VALUES
	 (0,'Cơ bản'),
	 (0,'Đồ uống'),
	 (0,'Sức khỏe'),
	 (0,'Thú cưng');

-- calendar --
INSERT INTO `calendar` (created_at,updated_at,description,image,is_delete,title,category_id) VALUES
	 ('2024-06-10 13:00:14','2024-06-10 13:00:14','Đây là lịch ý tưởng mà bất kể bạn đang trong lĩnh vực nào cũng có thể sử dụng ngay tức khắc. Chỉ với vài cú click, bạn đã có ngay 90 ý tưởng dùng để đăng bài mỗi ngày.
Gói basic không bao gồm các bài viết có sẵn như gói Advanced và Premium. Tuy nhiên, bạn vẫn có thể tự sáng tạo nội dung theo cách mình muốn với ideas của bộ lịch cung cấp.','https://res.cloudinary.com/df75ybox6/image/upload/v1718976025/ideasy/kxsqchb8mjksebd6gpjw.png',0,'Lịch ý tưởng cho mọi ngành nghề',1),
	 ('2024-06-10 13:00:24','2024-06-10 13:00:24',' Được thiết kế đặc biệt cho những doanh nghiệp hoạt động trong lĩnh vực cà phê, bộ lịch này mang đến 90 ý tưởng sáng tạo, từ các bài đăng giới thiệu sản phẩm, câu chuyện thương hiệu, cho đến những mẹo vặt về pha chế cà phê. 
Mỗi ý tưởng đều được tinh chỉnh để phù hợp với xu hướng và thị hiếu của khách hàng yêu thích cà phê. Với bộ lịch này, bạn sẽ dễ dàng thu hút và giữ chân khách hàng bằng những nội dung chất lượng và độc đáo.','https://res.cloudinary.com/df75ybox6/image/upload/v1718976025/ideasy/aadelk7x5xmyy4sv6kog.png',0,'Cà phê và Đồ uống',2),
	 ('2024-06-10 13:00:40','2024-06-10 13:00:40','Đặc biệt dành riêng cho cộng đồng yoga, bộ lịch này chứa 90 ý tưởng sáng tạo được thiết kế để giúp bạn kết nối sâu sắc hơn với học viên và người theo dõi. 
Từ các bài đăng về lợi ích của từng động tác, hướng dẫn tập luyện, đến những lời khuyên về dinh dưỡng và lối sống lành mạnh, bộ lịch này giúp bạn duy trì một luồng nội dung liên tục và hấp dẫn. Chỉ cần vài bước đơn giản, bạn sẽ có ngay nguồn cảm hứng không ngừng để chia sẻ đam mê và kiến thức yoga của mình đến với khách hàng của mình.','https://res.cloudinary.com/df75ybox6/image/upload/v1718976025/ideasy/ljs8soqjgby652isjxey.png',0,'Sức khỏe và Yoga',3),
	 ('2024-06-10 13:00:50','2024-06-10 13:00:50','Bộ lịch này được tạo ra để hỗ trợ các chuyên gia trong lĩnh vực thú y, mang lại 90 ý tưởng nội dung phong phú và cụ thể. Từ các bài viết về chăm sóc thú cưng, kiến thức y khoa, đến những câu chuyện thành công trong việc chữa trị, tất cả đều giúp bạn xây dựng một hình ảnh chuyên nghiệp và gần gũi. 
Bộ lịch giúp bạn dễ dàng chia sẻ kiến thức và tương tác với khách hàng, nâng cao uy tín và thu hút nhiều người quan tâm đến dịch vụ của bạn.','https://res.cloudinary.com/df75ybox6/image/upload/v1718976025/ideasy/o2tajdu1t18epkpjzusc.png',0,'Thú cưng và thú y',4);

-- package --
INSERT INTO `package` (created_at,updated_at,duration_unit,duration_value,link_notion,package_type,price,calendar_id) VALUES
	 ('2024-06-10 13:00:21','2024-06-10 13:00:21','MONTHS',3,'https://valiant-fork-3c7.notion.site/Basic-L-ch-Content-Ideasy-b88d3a83360a4f2ca3b1c7d6d2e2fdae?pvs=4','BASIC',500000,1),
	 ('2024-06-10 13:00:32','2024-06-10 13:00:32','MONTHS',3,'https://valiant-fork-3c7.notion.site/Advanced-L-ch-C-ph-Ideasy-ede0c6aa2a3a494688ed62ee8abed132?pvs=4','ADVANCED',800000,2),
	 ('2024-06-10 13:00:44','2024-06-10 13:00:44','MONTHS',3,'https://valiant-fork-3c7.notion.site/Advanced-L-ch-Yoga-Ideasy-081b80acd1d4481caeec93f9bd7f7efa?pvs=4','ADVANCED',800000,3),
	 ('2024-06-10 13:00:53','2024-06-10 13:00:53','MONTHS',3,'https://valiant-fork-3c7.notion.site/Advanced-L-ch-Th-Y-Ideasy-e2a80a05640c459ca737d501b4cd5710?pvs=4','ADVANCED',800000,4);

-- post --
INSERT INTO `post` (created_at,updated_at,content,description,status,thumbnail,title) VALUES
	 ('2024-06-15 00:00:00','2024-06-15 00:00:00','<p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1/16/1f43e.png" alt="🐾" width="16" height="16"> Ideasy - Nâng Niu Tình Yêu Thú Cưng! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1/16/1f43e.png" alt="🐾" width="16" height="16"></p><p>Bạn có phải là một người yêu thú cưng, luôn muốn dành những điều tuyệt vời nhất cho những người bạn bốn chân của mình không? <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t2f/1/16/1f436.png" alt="🐶" width="16" height="16"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6c/1/16/2764.png" alt="❤️" width="16" height="16"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/taa/1/16/1f431.png" alt="🐱" width="16" height="16"></p><p>Hãy để Ideasy - chuyên gia lên lịch contents đồng hành cùng bạn, chăm sóc và yêu thương thú cưng với trái tim đầy tận tụy và niềm đam mê. Chúng tôi hiểu rằng thú cưng không chỉ là bạn đồng hành, mà còn là một phần không thể thiếu của gia đình bạn. <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t77/1/16/1f3e1.png" alt="🏡" width="16" height="16"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t68/1/16/1f495.png" alt="💕" width="16" height="16"></p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Ngay bây giờ hãy kết nối cùng Ideasy - chuyên gia lên lịch contents để được:</p><p>• Chia sẻ kiến thức chăm sóc thú cưng</p><p>• Giải đáp thắc mắc về dinh dưỡng cho thú cưng</p><p>• Xây dựng cộng đồng cùng với thú cưng của bạn ngay hôm nay</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t13/1/16/1f308.png" alt="🌈" width="16" height="16"> Hãy cùng Ideasy - chuyên gia lên lịch contents tạo nên một thế giới đầy yêu thương và chăm sóc cho thú cưng của bạn! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t13/1/16/1f308.png" alt="🌈" width="16" height="16"></p><p><a href="https://www.facebook.com/hashtag/ideasy?__eep__=6&amp;__cft__[0]=AZU5x2dKM46MW7lwsU8QeJvMU9nVSw_v0VTUROXXjEHpE5g9IHG3LRZxchxqMSbamgAVvgnMkG58xXCM6YHMpOXq5Ci2bxfqKWchDfJRldZLF7s5OFtG8PDaHagmYYwLLEiADb8jY6pMhf0tewuP4qAABp71sjCIbzLI-Q7DEl9DPXowP-y9ki2SwjZoY9N6MZZxU7EWV5d5n_mt3KZ8D05j&amp;__tn__=*NK-R">#Ideasy</a> <a href="https://www.facebook.com/hashtag/lichcontent?__eep__=6&amp;__cft__[0]=AZU5x2dKM46MW7lwsU8QeJvMU9nVSw_v0VTUROXXjEHpE5g9IHG3LRZxchxqMSbamgAVvgnMkG58xXCM6YHMpOXq5Ci2bxfqKWchDfJRldZLF7s5OFtG8PDaHagmYYwLLEiADb8jY6pMhf0tewuP4qAABp71sjCIbzLI-Q7DEl9DPXowP-y9ki2SwjZoY9N6MZZxU7EWV5d5n_mt3KZ8D05j&amp;__tn__=*NK-R">#LichContent</a> <a href="https://www.facebook.com/hashtag/marketing?__eep__=6&amp;__cft__[0]=AZU5x2dKM46MW7lwsU8QeJvMU9nVSw_v0VTUROXXjEHpE5g9IHG3LRZxchxqMSbamgAVvgnMkG58xXCM6YHMpOXq5Ci2bxfqKWchDfJRldZLF7s5OFtG8PDaHagmYYwLLEiADb8jY6pMhf0tewuP4qAABp71sjCIbzLI-Q7DEl9DPXowP-y9ki2SwjZoY9N6MZZxU7EWV5d5n_mt3KZ8D05j&amp;__tn__=*NK-R">#Marketing</a> <a href="https://www.facebook.com/hashtag/doanhnghiep?__eep__=6&amp;__cft__[0]=AZU5x2dKM46MW7lwsU8QeJvMU9nVSw_v0VTUROXXjEHpE5g9IHG3LRZxchxqMSbamgAVvgnMkG58xXCM6YHMpOXq5Ci2bxfqKWchDfJRldZLF7s5OFtG8PDaHagmYYwLLEiADb8jY6pMhf0tewuP4qAABp71sjCIbzLI-Q7DEl9DPXowP-y9ki2SwjZoY9N6MZZxU7EWV5d5n_mt3KZ8D05j&amp;__tn__=*NK-R">#DoanhNghiep</a></p><p>----------------------------------------------</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: ideasylichytuongsangtao@gmail.com</p>','','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1718976635/ideasy/kefphjkcorvscfq77yva.jpg','Nâng Niu Tình Yêu Thú Cưng'),
	 ('2024-06-05 00:00:00','2024-06-05 00:00:00','<p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t91/1/16/2615.png" alt="☕" width="16" height="16"> Ideasy - Khám Phá Văn Hóa Cà Phê Đích Thực! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/te0/1/16/1f31f.png" alt="🌟" width="16" height="16"></p><p>Bạn có phải là người mê mẩn hương vị cà phê, từng giọt đều chứa đựng niềm đam mê và sự sáng tạo không? <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t34/1/16/1f914.png" alt="🤔" width="16" height="16"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t91/1/16/2615.png" alt="☕" width="16" height="16"></p><p>Hãy cùng Ideasy - chuyên gia lên lịch contents bước vào hành trình khám phá thế giới cà phê đầy mới mẻ, nơi mỗi khoảnh khắc trở nên sống động và đáng nhớ hơn bao giờ hết! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf4/1/16/2728.png" alt="✨" width="16" height="16"></p><p>Chúng tôi không chỉ xem cà phê là một thức uống thông thường, mà còn coi trọng nó như một phần của di sản văn hóa, một nét đẹp trong lối sống hàng ngày. <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3f/1/16/1f30d.png" alt="🌍" width="16" height="16"><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta/1/16/1f343.png" alt="🍃" width="16" height="16"></p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Tại Ideasy - chuyên giá lịch contents, bạn sẽ được hỗ trợ:</p><p>- Mở rộng kiến thức</p><p>- Khám phá điều kỳ diệu</p><p>- Kết nối đam mê</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16"> Hãy cùng Ideasy - chuyên gia lịch contents đắm chìm trong thế giới cà phê và tận hưởng từng khoảnh khắc tuyệt vời! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16"></p><p><a href="https://www.facebook.com/hashtag/ideasy?__eep__=6&amp;__cft__[0]=AZX-HaEt7hOkiryj0xj51_9TNecJgJLfeon03w5RofgHqtvqccVHvSehs9Iyx4CfZgScJUnpRutFgC3srJPRPU_5_kVCBVuKW177yE2PbZbYvQ8ZHelFQ9lCYlKSHGQFxFgoP2Pi1TEIwwHTE-zBoHxwCBaSVpTvDQocWyZyVxzRhMcEC7IFCIvSQ_2IogAhAV3e_ordQRwA3P8hrlQ8GIq-&amp;__tn__=*NK-R">#Ideasy</a> <a href="https://www.facebook.com/hashtag/lichcontent?__eep__=6&amp;__cft__[0]=AZX-HaEt7hOkiryj0xj51_9TNecJgJLfeon03w5RofgHqtvqccVHvSehs9Iyx4CfZgScJUnpRutFgC3srJPRPU_5_kVCBVuKW177yE2PbZbYvQ8ZHelFQ9lCYlKSHGQFxFgoP2Pi1TEIwwHTE-zBoHxwCBaSVpTvDQocWyZyVxzRhMcEC7IFCIvSQ_2IogAhAV3e_ordQRwA3P8hrlQ8GIq-&amp;__tn__=*NK-R">#LichContent</a> <a href="https://www.facebook.com/hashtag/marketing?__eep__=6&amp;__cft__[0]=AZX-HaEt7hOkiryj0xj51_9TNecJgJLfeon03w5RofgHqtvqccVHvSehs9Iyx4CfZgScJUnpRutFgC3srJPRPU_5_kVCBVuKW177yE2PbZbYvQ8ZHelFQ9lCYlKSHGQFxFgoP2Pi1TEIwwHTE-zBoHxwCBaSVpTvDQocWyZyVxzRhMcEC7IFCIvSQ_2IogAhAV3e_ordQRwA3P8hrlQ8GIq-&amp;__tn__=*NK-R">#Marketing</a> <a href="https://www.facebook.com/hashtag/doanhnghiep?__eep__=6&amp;__cft__[0]=AZX-HaEt7hOkiryj0xj51_9TNecJgJLfeon03w5RofgHqtvqccVHvSehs9Iyx4CfZgScJUnpRutFgC3srJPRPU_5_kVCBVuKW177yE2PbZbYvQ8ZHelFQ9lCYlKSHGQFxFgoP2Pi1TEIwwHTE-zBoHxwCBaSVpTvDQocWyZyVxzRhMcEC7IFCIvSQ_2IogAhAV3e_ordQRwA3P8hrlQ8GIq-&amp;__tn__=*NK-R">#DoanhNghiep</a> <a href="https://www.facebook.com/hashtag/tangtuongtac?__eep__=6&amp;__cft__[0]=AZX-HaEt7hOkiryj0xj51_9TNecJgJLfeon03w5RofgHqtvqccVHvSehs9Iyx4CfZgScJUnpRutFgC3srJPRPU_5_kVCBVuKW177yE2PbZbYvQ8ZHelFQ9lCYlKSHGQFxFgoP2Pi1TEIwwHTE-zBoHxwCBaSVpTvDQocWyZyVxzRhMcEC7IFCIvSQ_2IogAhAV3e_ordQRwA3P8hrlQ8GIq-&amp;__tn__=*NK-R">#TangTuongTac</a></p><p>------------------------------</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: ideasylichytuongsangtao@gmail.com</p>','','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1718976622/ideasy/reituhsmv1bqz88vd2rl.jpg','Khám Phá Văn Hóa Cà Phê Đích Thực'),
	 ('2024-05-29 00:00:00','2024-05-29 00:00:00','<p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/te5/1/16/1f9d8.png" alt="🧘" width="16" height="16">Ideasy - Lan Tỏa Đam Mê Yoga Cùng Lịch Sáng Tạo Nội Dung Hiệu Quả<img src="https://static.xx.fbcdn.net/images/emoji.php/v9/te5/1/16/1f9d8.png" alt="🧘" width="16" height="16"></p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf0/1/16/1f338.png" alt="🌸" width="16" height="16"> Bạn là người yêu thích Yoga và mong muốn mang chia sẻ cũng như kêu gọi mọi người tham gia cùng bạn? Tuy nhiên bạn không biết bắt đầu từ đâu và nên bắt đầu như thế nào?</p><p>Đừng lo, Ideasy sẽ mang đến giải pháp vô cùng tiện lợi cho bạn! <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf4/1/16/2728.png" alt="✨" width="16" height="16"></p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Ideasy - Lịch ý tưởng sáng tạo nội dung, đồng hành cùng bạn trên con đường chia sẻ đam mê!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t80/1/16/1f64f.png" alt="🙏" width="16" height="16">Ideasy hiểu rằng, Yoga không chỉ là tập luyện thể chất mà còn là một hành trình tâm linh, nơi bạn khám phá bản thân và tìm kiếm sự cân bằng trong cuộc sống. Do đó, bạn cũng mong muốn lan tỏa nguồn năng lượng tích cực đến với cộng đồng.</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Chính vì vậy, Ideasy cung cấp cho bạn công cụ LỊCH Ý TƯỞNG SÁNG TẠO NỘI DUNG chuyên dụng dùng cho chủ đề Yoga và sức khỏe, giúp bạn:</p><p>• Truyền cảm hứng và lan tỏa tinh thần Yoga</p><p>• Hướng dẫn tập luyện hiệu quả</p><p>• Xây dựng cộng đồng Yoga gắn kết</p><p><a href="https://www.facebook.com/hashtag/ideasy?__eep__=6&amp;__cft__[0]=AZUvgi6smz42i_-bes4qjQWO7y2z1pE_h_fpqPPusCFkPZvUUdRZUbDXI66T-iAK3skaWTzH59HVcwSs0Rh0T1uSsyQEN7nHwZFEskk0As_0zeUUtj5Ceu1HroEdD50AASrwf3IFUspHXV4cNN_tRAPjiX2CHAyMlTsGGmV0Kqok5pdTaqiwOURtREbDdQ-nYg3p5OrXdGgcUGTWfc16WYf5&amp;__tn__=*NK-R">#Ideasy</a> <a href="https://www.facebook.com/hashtag/lichcontent?__eep__=6&amp;__cft__[0]=AZUvgi6smz42i_-bes4qjQWO7y2z1pE_h_fpqPPusCFkPZvUUdRZUbDXI66T-iAK3skaWTzH59HVcwSs0Rh0T1uSsyQEN7nHwZFEskk0As_0zeUUtj5Ceu1HroEdD50AASrwf3IFUspHXV4cNN_tRAPjiX2CHAyMlTsGGmV0Kqok5pdTaqiwOURtREbDdQ-nYg3p5OrXdGgcUGTWfc16WYf5&amp;__tn__=*NK-R">#LichContent</a> <a href="https://www.facebook.com/hashtag/marketing?__eep__=6&amp;__cft__[0]=AZUvgi6smz42i_-bes4qjQWO7y2z1pE_h_fpqPPusCFkPZvUUdRZUbDXI66T-iAK3skaWTzH59HVcwSs0Rh0T1uSsyQEN7nHwZFEskk0As_0zeUUtj5Ceu1HroEdD50AASrwf3IFUspHXV4cNN_tRAPjiX2CHAyMlTsGGmV0Kqok5pdTaqiwOURtREbDdQ-nYg3p5OrXdGgcUGTWfc16WYf5&amp;__tn__=*NK-R">#Marketing</a> <a href="https://www.facebook.com/hashtag/doanhnghiep?__eep__=6&amp;__cft__[0]=AZUvgi6smz42i_-bes4qjQWO7y2z1pE_h_fpqPPusCFkPZvUUdRZUbDXI66T-iAK3skaWTzH59HVcwSs0Rh0T1uSsyQEN7nHwZFEskk0As_0zeUUtj5Ceu1HroEdD50AASrwf3IFUspHXV4cNN_tRAPjiX2CHAyMlTsGGmV0Kqok5pdTaqiwOURtREbDdQ-nYg3p5OrXdGgcUGTWfc16WYf5&amp;__tn__=*NK-R">#DoanhNghiep</a> <a href="https://www.facebook.com/hashtag/tangtuongtac?__eep__=6&amp;__cft__[0]=AZUvgi6smz42i_-bes4qjQWO7y2z1pE_h_fpqPPusCFkPZvUUdRZUbDXI66T-iAK3skaWTzH59HVcwSs0Rh0T1uSsyQEN7nHwZFEskk0As_0zeUUtj5Ceu1HroEdD50AASrwf3IFUspHXV4cNN_tRAPjiX2CHAyMlTsGGmV0Kqok5pdTaqiwOURtREbDdQ-nYg3p5OrXdGgcUGTWfc16WYf5&amp;__tn__=*NK-R">#TangTuongTac</a></p><p>---------------------------------------------------------------------------------------------</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185</p><p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: ideasylichytuongsangtao@gmail.com</p>','','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1718976643/ideasy/s3c8ydmot204et4i0o0x.jpg','Lan Tỏa Đam Mê Yoga Cùng Lịch Sáng Tạo Nội Dung Hiệu Quả'),
	 ('2024-05-19 00:00:00','2024-05-19 00:00:00','<p>5 bí quyết viết content marketing thu hút<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16">Kỹ năng content marketing là công cụ đắc lực để thu hút khách hàng và thúc đẩy doanh số bán hàng. Tuy nhiên, để viết được content thu hút, bạn cần nắm được một số bí quyết sau:<br><br>• Xác định rõ đối tượng mục tiêu: Bạn cần hiểu rõ khách hàng của mình là ai, họ quan tâm đến điều gì, họ đang gặp vấn đề gì. Từ đó, bạn mới có thể sáng tạo nội dung phù hợp để thu hút họ.<br><br>• Lựa chọn chủ đề phù hợp: Chọn những chủ đề mà đối tượng mục tiêu của bạn quan tâm. Đồng thời, chủ đề cũng cần liên quan đến sản phẩm hay dịch vụ mà bạn cung cấp.<br><br>• Viết nội dung hấp dẫn và dễ đọc: Sử dụng ngôn ngữ đơn giản, dễ hiểu, tránh dùng những từ ngữ chuyên ngành khó hiểu. Kết hợp hình ảnh, video để bài viết thêm sinh động và thu hút.<br><br>• Kêu gọi hành động: Khuyến khích người đọc thực hiện một hành động cụ thể, ví dụ như truy cập website, đăng ký nhận bản tin, mua hàng,...<br><br>• Đo lường và phân tích hiệu quả: Theo dõi hiệu quả của các bài viết content marketing để điều chỉnh chiến lược phù hợp.<br><br>------------------<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185<br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: ideasylichytuongsangtao@gmail.com</p>','','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1716114699/ideasy/g49uqelmcwjxzz2arkcw.jpg','Bí quyết viết content thu hút'),
	 ('2024-05-15 00:00:00','2024-05-15 00:00:00','<p><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/16/1f4cc.png" alt="📌" width="16" height="16"> Bạn đang tìm kiếm giải pháp sáng tạo nội dung hiệu quả để thu hút khách hàng và thúc đẩy doanh số bán hàng? Ideasy chính là lựa chọn hoàn hảo dành cho bạn!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"> Ideasy - Lịch Contents Linh Hoạt: <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"><br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/taa/1/16/1f310.png" alt="🌐" width="16" height="16"> Gói cơ bản: Lên lịch nội dung cho 2 kênh mạng xã hội (Facebook, Instagram)<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" alt="🔥" width="16" height="16"> Gói nâng cao:<br>• Lên lịch nội dung cho 3 kênh mạng xã hội (Facebook, Instagram, YouTube)<br>• Tặng 5 bài ý tưởng nội dung<br>• Phân tích hiệu quả nội dung<br>• Hỗ trợ 24/7<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1/16/1f48e.png" alt="💎" width="16" height="16"> Gói cao cấp:<br>• Lên lịch nội dung cho 6 kênh mạng xã hội (Facebook, Instagram, Twitter, YouTube, LinkedIn, TikTok)<br>• Tặng 15 bài content tự động<br>• Tối ưu thời gian đăng bài<br>• Tư vấn chiến lược nội dung<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"> Dịch Vụ Trọn Gói: <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb4/1/16/2b50.png" alt="⭐" width="16" height="16"><br>• Thiết kế hình ảnh minh họa<br>• Thêm video<br>• Admin<br>• Đăng bài tự động<br>• Nhắc nhở chia sẻ lịch<br>• Tạo lịch<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16"> Ideasy Cam Kết:<br>• Đội ngũ sáng tạo giàu kinh nghiệm, am hiểu thị trường<br>• Giải pháp nội dung chất lượng cao, hiệu quả<br>• Dịch vụ chuyên nghiệp, tận tâm<br>• Giá cả cạnh tranh<br><br><a href="https://www.facebook.com/hashtag/ideasy?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#Ideasy</strong></a> <a href="https://www.facebook.com/hashtag/lichcontent?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#LichContent</strong></a> <a href="https://www.facebook.com/hashtag/marketing?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#Marketing</strong></a> <a href="https://www.facebook.com/hashtag/doanhnghiep?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#DoanhNghiep</strong></a> <a href="https://www.facebook.com/hashtag/tangtuongtac?__eep__=6&amp;__cft__[0]=AZVodTOy6mWcsj418SWcq9tz6s3IhD5wITssvaDtDVXzjiTdNSNm3lW5bsz3gRzJm08_lYs32mv4mno_DHgDymL3NII5MPtXT9KsRQ2ZgE4NOvWBuEcPkqgcgJ1DbEPZhmNbeB2aM86k5HGAbBh8r03OWVTN7HbTTarHff-i1AvdeMCG70-rxb76VNU__YH29gwG_X5BqozORCLBkUpo8JGB&amp;__tn__=*NK*F"><strong>#TangTuongTac</strong></a><br><br>-----------------------------------------------------------------------------<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf8/1/16/1f469_200d_1f4bb.png" alt="👩‍💻" width="16" height="16">Ideasy - Chuyên gia lên lịch content, đồng hành cùng bạn trên con đường chinh phục khách hàng!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/16/1f4f2.png" alt="📲" width="16" height="16">Liên hệ ngay để được tư vấn miễn phí!<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16">Hotline: 0376.616.185<br><br><img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png" alt="📧" width="16" height="16">Email: daoduydi1612@gmail.com</p>','','ACTIVE','https://res.cloudinary.com/df75ybox6/image/upload/v1716114694/ideasy/auoftyvadj75rnx15ste.jpg','Nâng tầm nội dung. Bất phá doanh nghiệp');
