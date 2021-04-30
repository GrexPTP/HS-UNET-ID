/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.22 : Database - hunet
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `appointments` */

DROP TABLE IF EXISTS `appointments`;

CREATE TABLE `appointments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `meeting_time` datetime NOT NULL,
  `description` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `patient_id` bigint unsigned DEFAULT NULL,
  `doctor_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3330f054416745deaa2cc130700` (`patient_id`),
  KEY `FK_4cf26c3f972d014df5c68d503d2` (`doctor_id`),
  CONSTRAINT `FK_3330f054416745deaa2cc130700` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_4cf26c3f972d014df5c68d503d2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `appointments` */

/*Table structure for table `cities` */

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `cities` */

insert  into `cities`(`id`,`created_at`,`updated_at`,`name`) values 
(1,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(2,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(3,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(4,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(5,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(6,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(7,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(8,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(9,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(10,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(11,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(12,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(13,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(14,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(15,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(16,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(17,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(18,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(19,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(20,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(21,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(22,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(23,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(24,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(25,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(26,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(27,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(28,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(29,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(30,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(31,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(32,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(33,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(34,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(35,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(36,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(37,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(38,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(39,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(40,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(41,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(42,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(43,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(44,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(45,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(46,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(47,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(48,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(49,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(50,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(51,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(52,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(53,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(54,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(55,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(56,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(57,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(58,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(59,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(60,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(61,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(62,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),
(63,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656','');

/*Table structure for table `diseases` */

DROP TABLE IF EXISTS `diseases`;

CREATE TABLE `diseases` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `images` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `diseases` */

insert  into `diseases`(`id`,`name`,`description`,`images`,`created_at`,`updated_at`,`slug`) values 
(1,'Carcinoma',NULL,NULL,'2021-01-25 15:15:33.107895','2021-01-25 15:15:33.107895','carcinoma'),
(2,'Pigmented',NULL,NULL,'2021-01-25 15:15:45.844847','2021-01-25 15:15:45.844847','pigmented'),
(3,'Normal',NULL,NULL,'2021-01-25 15:15:57.220146','2021-01-25 15:15:57.220146','normal'),
(4,'Melanoma',NULL,NULL,'2021-01-25 15:16:08.945909','2021-01-25 15:16:08.945909','melanoma');

/*Table structure for table `examination_details` */

DROP TABLE IF EXISTS `examination_details`;

CREATE TABLE `examination_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `disease_id` bigint unsigned DEFAULT NULL,
  `examination_id` bigint unsigned DEFAULT NULL,
  `percentage` float unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae5e640427b010f1845aec489f3` (`examination_id`),
  KEY `FK_231251394958259ed6da7a31e7e` (`disease_id`),
  CONSTRAINT `FK_231251394958259ed6da7a31e7e` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`),
  CONSTRAINT `FK_ae5e640427b010f1845aec489f3` FOREIGN KEY (`examination_id`) REFERENCES `examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `examination_details` */

insert  into `examination_details`(`id`,`created_at`,`updated_at`,`disease_id`,`examination_id`,`percentage`) values 
(9,'2021-01-28 10:47:52.476242','2021-01-29 14:56:08.110454',1,5,0.5),
(10,'2021-01-28 10:47:52.490783','2021-01-29 14:56:11.251273',4,5,0.4),
(11,'2021-01-28 10:47:52.503460','2021-01-29 14:56:14.255277',3,5,0.5),
(12,'2021-01-28 10:47:52.515789','2021-01-29 14:56:17.484050',2,5,0.23),
(13,'2021-01-29 07:35:58.493860','2021-01-29 14:56:22.207688',1,6,0.65),
(14,'2021-01-29 07:35:58.505630','2021-01-29 14:56:25.956381',4,6,0.2145),
(15,'2021-01-29 07:35:58.517329','2021-01-29 14:56:29.508170',3,6,0.264),
(16,'2021-01-29 07:35:58.527566','2021-01-29 14:56:34.907641',2,6,0.994);

/*Table structure for table `examinations` */

DROP TABLE IF EXISTS `examinations`;

CREATE TABLE `examinations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `customer_description` text,
  `doctor_feedback` text,
  `status` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `patient_id` bigint unsigned DEFAULT NULL,
  `doctor_id` bigint unsigned DEFAULT NULL,
  `result_image` varchar(255) NOT NULL,
  `disease_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e9c26bc427b43871d0a94efbd02` (`patient_id`),
  KEY `FK_9d06e775e6214959a566b4ea465` (`doctor_id`),
  KEY `FK_ca3adb0f4b1991a5eeca524a062` (`disease_id`),
  CONSTRAINT `FK_9d06e775e6214959a566b4ea465` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_ca3adb0f4b1991a5eeca524a062` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`),
  CONSTRAINT `FK_e9c26bc427b43871d0a94efbd02` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `examinations` */

insert  into `examinations`(`id`,`image`,`customer_description`,`doctor_feedback`,`status`,`created_at`,`updated_at`,`patient_id`,`doctor_id`,`result_image`,`disease_id`) values 
(5,'','TEST',NULL,'pending','2021-01-28 10:47:52.460351','2021-01-28 10:47:52.460351',2,NULL,'',4),
(6,'https://storage.googleapis.com/origin-image-hunet/01_29_21_07_3501_scar-stock.jpg','Test create  customerDescription',NULL,'pending','2021-01-29 07:35:58.480284','2021-01-29 07:35:58.480284',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_29_21_07_3501_scar-stock.jpg',1);

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `content` text NOT NULL,
  `description_image` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creatorId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f2089d6c82cd8ee2709f53dfd00` (`creatorId`),
  CONSTRAINT `FK_f2089d6c82cd8ee2709f53dfd00` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `news` */

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `permissions` */

/*Table structure for table `role_permission` */

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `IDX_3d0a7155eafd75ddba5a701336` (`role_id`),
  KEY `IDX_e3a3ba47b7ca00fd23be4ebd6c` (`permission_id`),
  CONSTRAINT `FK_3d0a7155eafd75ddba5a7013368` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e3a3ba47b7ca00fd23be4ebd6cf` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `role_permission` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`slug`,`created_at`,`updated_at`) values 
(1,'Admin','admin','2021-01-18 16:13:40.733776','2021-01-18 16:13:40.733776');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `role_id` bigint unsigned DEFAULT NULL,
  `birth_date` date NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `city_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_a2cecd1a3531c0b041e29ba46e1` (`role_id`),
  KEY `FK_03934bca2709003c5f08fd436d2` (`city_id`),
  CONSTRAINT `FK_03934bca2709003c5f08fd436d2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`username`,`email`,`password`,`phone`,`gender`,`created_at`,`updated_at`,`role_id`,`birth_date`,`profile_image`,`city_id`) values 
(1,'Admin','admin','admin@gmail.com','$2b$10$7Y/TJgfg0ZaLBMrpVfJdlOFieRniweZozSx4eIXiux5NsDlw.yQs2','0899467737','male','2021-01-18 16:13:50.420589','2021-01-27 17:40:06.000000',1,'0000-00-00',NULL,NULL),
(2,'Đỗ Trung Tín','tindt','tindt@gmail.com','$2b$10$JrK4yQDxjaR5Vcc5Sf67gOz5GGleBwHO6gyOf0mRYFJS.rVFArQUa','0912345678','male','2021-01-19 07:54:52.983745','2021-01-28 16:43:46.000000',1,'0000-00-00','https://storage.googleapis.com/profile-image-hunet/_x95488rlq7.jpg',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
