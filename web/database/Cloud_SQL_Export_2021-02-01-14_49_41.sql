-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: hunet
-- ------------------------------------------------------
-- Server version	8.0.18-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `hunet`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hunet` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hunet`;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `meeting_time` datetime NOT NULL,
  `description` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `patient_id` bigint(20) unsigned DEFAULT NULL,
  `doctor_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3330f054416745deaa2cc130700` (`patient_id`),
  KEY `FK_4cf26c3f972d014df5c68d503d2` (`doctor_id`),
  CONSTRAINT `FK_3330f054416745deaa2cc130700` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_4cf26c3f972d014df5c68d503d2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(2,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(3,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(4,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(5,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(6,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(7,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(8,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(9,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(10,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(11,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(12,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(13,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(14,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(15,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(16,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(17,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(18,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(19,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(20,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(21,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(22,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(23,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(24,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(25,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(26,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(27,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(28,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(29,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(30,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(31,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(32,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(33,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(34,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(35,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(36,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(37,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(38,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(39,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(40,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(41,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(42,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(43,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(44,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(45,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(46,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(47,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(48,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(49,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(50,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(51,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(52,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(53,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(54,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(55,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(56,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(57,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(58,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(59,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(60,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(61,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(62,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656',''),(63,'2021-01-27 13:28:07.123940','2021-01-27 13:28:07.339656','');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseases`
--

DROP TABLE IF EXISTS `diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diseases` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `images` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases`
--

LOCK TABLES `diseases` WRITE;
/*!40000 ALTER TABLE `diseases` DISABLE KEYS */;
INSERT INTO `diseases` VALUES (1,'Carcinoma',NULL,NULL,'2021-01-25 15:15:33.107895','2021-01-25 15:15:33.107895','carcinoma'),(2,'Pigmented',NULL,NULL,'2021-01-25 15:15:45.844847','2021-01-25 15:15:45.844847','pigmented'),(3,'Normal',NULL,NULL,'2021-01-25 15:15:57.220146','2021-01-25 15:15:57.220146','normal'),(4,'Melanoma',NULL,NULL,'2021-01-25 15:16:08.945909','2021-01-25 15:16:08.945909','melanoma');
/*!40000 ALTER TABLE `diseases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_details`
--

DROP TABLE IF EXISTS `examination_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `disease_id` bigint(20) unsigned DEFAULT NULL,
  `examination_id` bigint(20) unsigned DEFAULT NULL,
  `percentage` float unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae5e640427b010f1845aec489f3` (`examination_id`),
  KEY `FK_231251394958259ed6da7a31e7e` (`disease_id`),
  CONSTRAINT `FK_231251394958259ed6da7a31e7e` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`),
  CONSTRAINT `FK_ae5e640427b010f1845aec489f3` FOREIGN KEY (`examination_id`) REFERENCES `examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_details`
--

LOCK TABLES `examination_details` WRITE;
/*!40000 ALTER TABLE `examination_details` DISABLE KEYS */;
INSERT INTO `examination_details` VALUES (9,'2021-01-28 10:47:52.476242','2021-01-29 14:56:08.110454',1,5,0.5),(10,'2021-01-28 10:47:52.490783','2021-01-29 14:56:11.251273',4,5,0.4),(11,'2021-01-28 10:47:52.503460','2021-01-29 14:56:14.255277',3,5,0.5),(12,'2021-01-28 10:47:52.515789','2021-01-29 14:56:17.484050',2,5,0.23),(13,'2021-01-29 07:35:58.493860','2021-01-29 14:56:22.207688',1,6,0.65),(14,'2021-01-29 07:35:58.505630','2021-01-29 14:56:25.956381',4,6,0.2145),(15,'2021-01-29 07:35:58.517329','2021-01-29 14:56:29.508170',3,6,0.264),(16,'2021-01-29 07:35:58.527566','2021-01-29 14:56:34.907641',2,6,0.994),(17,'2021-01-30 02:24:05.342756','2021-01-30 02:24:05.342756',1,7,0.020541),(18,'2021-01-30 02:24:05.353904','2021-01-30 02:24:05.353904',4,7,0.550815),(19,'2021-01-30 02:24:05.364490','2021-01-30 02:24:05.364490',3,7,0.0476011),(20,'2021-01-30 02:24:05.376238','2021-01-30 02:24:05.376238',2,7,0.381043),(21,'2021-01-30 02:24:05.723469','2021-01-30 02:24:05.723469',1,8,0.020541),(22,'2021-01-30 02:24:05.735276','2021-01-30 02:24:05.735276',4,8,0.550815),(23,'2021-01-30 02:24:05.746074','2021-01-30 02:24:05.746074',3,8,0.0476011),(24,'2021-01-30 02:24:05.756871','2021-01-30 02:24:05.756871',2,8,0.381043),(25,'2021-01-30 02:24:08.610449','2021-01-30 02:24:08.610449',1,9,0.020541),(26,'2021-01-30 02:24:08.623403','2021-01-30 02:24:08.623403',4,9,0.550815),(27,'2021-01-30 02:24:08.635110','2021-01-30 02:24:08.635110',3,9,0.0476011),(28,'2021-01-30 02:24:08.646244','2021-01-30 02:24:08.646244',2,9,0.381043),(29,'2021-01-30 02:24:16.403926','2021-01-30 02:24:16.403926',1,10,0.020541),(30,'2021-01-30 02:24:16.414932','2021-01-30 02:24:16.414932',4,10,0.550815),(31,'2021-01-30 02:24:16.427566','2021-01-30 02:24:16.427566',3,10,0.0476011),(32,'2021-01-30 02:24:16.438927','2021-01-30 02:24:16.438927',2,10,0.381043),(33,'2021-01-30 02:27:59.443809','2021-01-30 02:27:59.443809',1,11,0.020541),(34,'2021-01-30 02:27:59.456131','2021-01-30 02:27:59.456131',4,11,0.550815),(35,'2021-01-30 02:27:59.469679','2021-01-30 02:27:59.469679',3,11,0.0476011),(36,'2021-01-30 02:27:59.481887','2021-01-30 02:27:59.481887',2,11,0.381043),(37,'2021-01-30 06:10:50.624300','2021-01-30 06:10:50.624300',1,12,0.121851),(38,'2021-01-30 06:10:50.638240','2021-01-30 06:10:50.638240',4,12,0.79616),(39,'2021-01-30 06:10:50.652235','2021-01-30 06:10:50.652235',3,12,0.0012469),(40,'2021-01-30 06:10:50.664564','2021-01-30 06:10:50.664564',2,12,0.0807424),(41,'2021-01-30 07:52:51.267696','2021-01-30 07:52:51.267696',1,13,0.694148),(42,'2021-01-30 07:52:51.279187','2021-01-30 07:52:51.279187',4,13,0.00182275),(43,'2021-01-30 07:52:51.289368','2021-01-30 07:52:51.289368',3,13,0.0000000000611682),(44,'2021-01-30 07:52:51.299336','2021-01-30 07:52:51.299336',2,13,0.304029),(45,'2021-01-30 07:54:21.124586','2021-01-30 07:54:21.124586',1,14,1),(46,'2021-01-30 07:54:21.134509','2021-01-30 07:54:21.134509',4,14,0.000000000000185221),(47,'2021-01-30 07:54:21.147039','2021-01-30 07:54:21.147039',3,14,1.06098e-36),(48,'2021-01-30 07:54:21.158408','2021-01-30 07:54:21.158408',2,14,0.0000000000000159747),(49,'2021-01-30 07:55:49.576631','2021-01-30 07:55:49.576631',1,15,0.997514),(50,'2021-01-30 07:55:49.586750','2021-01-30 07:55:49.586750',4,15,0.00169808),(51,'2021-01-30 07:55:49.596828','2021-01-30 07:55:49.596828',3,15,0.0000000000000165838),(52,'2021-01-30 07:55:49.606464','2021-01-30 07:55:49.606464',2,15,0.000788433),(53,'2021-01-30 15:58:37.312332','2021-01-30 15:58:37.312332',1,16,0.999948),(54,'2021-01-30 15:58:37.324840','2021-01-30 15:58:37.324840',4,16,0.0000511667),(55,'2021-01-30 15:58:37.335382','2021-01-30 15:58:37.335382',3,16,7.28712e-21),(56,'2021-01-30 15:58:37.345784','2021-01-30 15:58:37.345784',2,16,0.00000107199),(57,'2021-01-30 16:12:49.342600','2021-01-30 16:12:49.342600',1,17,0.994504),(58,'2021-01-30 16:12:49.354441','2021-01-30 16:12:49.354441',4,17,0.000573371),(59,'2021-01-30 16:12:49.367287','2021-01-30 16:12:49.367287',3,17,0.00000000000000602687),(60,'2021-01-30 16:12:49.379794','2021-01-30 16:12:49.379794',2,17,0.00492227),(61,'2021-01-30 16:39:18.335837','2021-01-30 16:39:18.335837',1,18,0.000000182837),(62,'2021-01-30 16:39:18.349650','2021-01-30 16:39:18.349650',4,18,0.996944),(63,'2021-01-30 16:39:18.361921','2021-01-30 16:39:18.361921',3,18,0.00000000158069),(64,'2021-01-30 16:39:18.372511','2021-01-30 16:39:18.372511',2,18,0.0030562),(65,'2021-01-31 08:20:08.193440','2021-01-31 08:20:08.193440',1,19,0.00190764),(66,'2021-01-31 08:20:08.204354','2021-01-31 08:20:08.204354',4,19,0.11375),(67,'2021-01-31 08:20:08.216443','2021-01-31 08:20:08.216443',3,19,0.0581127),(68,'2021-01-31 08:20:08.227655','2021-01-31 08:20:08.227655',2,19,0.826229),(69,'2021-01-31 08:22:58.927832','2021-01-31 08:22:58.927832',1,20,0.0508475),(70,'2021-01-31 08:22:58.937920','2021-01-31 08:22:58.937920',4,20,0.175467),(71,'2021-01-31 08:22:58.948246','2021-01-31 08:22:58.948246',3,20,0.0106422),(72,'2021-01-31 08:22:58.959657','2021-01-31 08:22:58.959657',2,20,0.763043),(73,'2021-01-31 08:30:17.279228','2021-01-31 08:30:17.279228',1,21,0.00320449),(74,'2021-01-31 08:30:17.290850','2021-01-31 08:30:17.290850',4,21,0.873471),(75,'2021-01-31 08:30:17.302145','2021-01-31 08:30:17.302145',3,21,0.00774142),(76,'2021-01-31 08:30:17.312679','2021-01-31 08:30:17.312679',2,21,0.115583),(77,'2021-01-31 09:39:30.187414','2021-01-31 09:39:30.187414',1,22,0.999999),(78,'2021-01-31 09:39:30.199405','2021-01-31 09:39:30.199405',4,22,0.00000059311),(79,'2021-01-31 09:39:30.215931','2021-01-31 09:39:30.215931',3,22,1.92888e-24),(80,'2021-01-31 09:39:30.228409','2021-01-31 09:39:30.228409',2,22,0.00000000718121),(81,'2021-01-31 12:13:56.233272','2021-01-31 12:13:56.233272',1,23,0.000653918),(82,'2021-01-31 12:13:56.246215','2021-01-31 12:13:56.246215',4,23,0.159351),(83,'2021-01-31 12:13:56.256917','2021-01-31 12:13:56.256917',3,23,0.00293339),(84,'2021-01-31 12:13:56.268319','2021-01-31 12:13:56.268319',2,23,0.837062),(85,'2021-01-31 12:14:00.837126','2021-01-31 12:14:00.837126',1,24,0.000653918),(86,'2021-01-31 12:14:00.848329','2021-01-31 12:14:00.848329',4,24,0.159351),(87,'2021-01-31 12:14:00.861869','2021-01-31 12:14:00.861869',3,24,0.00293339),(88,'2021-01-31 12:14:00.874799','2021-01-31 12:14:00.874799',2,24,0.837062),(89,'2021-01-31 12:15:28.911286','2021-01-31 12:15:28.911286',1,25,0.0000980914),(90,'2021-01-31 12:15:28.921641','2021-01-31 12:15:28.921641',4,25,0.0289332),(91,'2021-01-31 12:15:28.932430','2021-01-31 12:15:28.932430',3,25,0.000797291),(92,'2021-01-31 12:15:28.943232','2021-01-31 12:15:28.943232',2,25,0.970171),(93,'2021-01-31 12:15:49.462629','2021-01-31 12:15:49.462629',1,26,0.0000980914),(94,'2021-01-31 12:15:49.476057','2021-01-31 12:15:49.476057',4,26,0.0289332),(95,'2021-01-31 12:15:49.479391','2021-01-31 12:15:49.479391',1,27,0.0000980914),(96,'2021-01-31 12:15:49.488365','2021-01-31 12:15:49.488365',3,26,0.000797291),(97,'2021-01-31 12:15:49.490250','2021-01-31 12:15:49.490250',4,27,0.0289332),(98,'2021-01-31 12:15:49.500328','2021-01-31 12:15:49.500328',2,26,0.970171),(99,'2021-01-31 12:15:49.502827','2021-01-31 12:15:49.502827',3,27,0.000797291),(100,'2021-01-31 12:15:49.514313','2021-01-31 12:15:49.514313',2,27,0.970171),(101,'2021-01-31 12:15:51.457272','2021-01-31 12:15:51.457272',1,28,0.0000980914),(102,'2021-01-31 12:15:51.468393','2021-01-31 12:15:51.468393',4,28,0.0289332),(103,'2021-01-31 12:15:51.479065','2021-01-31 12:15:51.479065',3,28,0.000797291),(104,'2021-01-31 12:15:51.491072','2021-01-31 12:15:51.491072',2,28,0.970171),(105,'2021-01-31 12:15:58.629723','2021-01-31 12:15:58.629723',1,29,0.0000980914),(106,'2021-01-31 12:15:58.639510','2021-01-31 12:15:58.639510',4,29,0.0289332),(107,'2021-01-31 12:15:58.648753','2021-01-31 12:15:58.648753',3,29,0.000797291),(108,'2021-01-31 12:15:58.662730','2021-01-31 12:15:58.662730',2,29,0.970171),(109,'2021-01-31 12:16:33.542255','2021-01-31 12:16:33.542255',1,30,0.00431418),(110,'2021-01-31 12:16:33.554151','2021-01-31 12:16:33.554151',4,30,0.970773),(111,'2021-01-31 12:16:33.566134','2021-01-31 12:16:33.566134',3,30,0.00119722),(112,'2021-01-31 12:16:33.578010','2021-01-31 12:16:33.578010',2,30,0.0237158),(113,'2021-01-31 12:17:09.219506','2021-01-31 12:17:09.219506',1,31,0.00431418),(114,'2021-01-31 12:17:09.229840','2021-01-31 12:17:09.229840',4,31,0.970773),(115,'2021-01-31 12:17:09.240363','2021-01-31 12:17:09.240363',3,31,0.00119722),(116,'2021-01-31 12:17:09.249897','2021-01-31 12:17:09.249897',2,31,0.0237158),(117,'2021-01-31 15:27:55.286477','2021-01-31 15:27:55.286477',1,32,0.020541),(118,'2021-01-31 15:27:55.298725','2021-01-31 15:27:55.298725',4,32,0.550815),(119,'2021-01-31 15:27:55.309106','2021-01-31 15:27:55.309106',3,32,0.0476011),(120,'2021-01-31 15:27:55.320189','2021-01-31 15:27:55.320189',2,32,0.381043);
/*!40000 ALTER TABLE `examination_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examinations`
--

DROP TABLE IF EXISTS `examinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examinations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `customer_description` text,
  `doctor_feedback` text,
  `status` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `patient_id` bigint(20) unsigned DEFAULT NULL,
  `doctor_id` bigint(20) unsigned DEFAULT NULL,
  `result_image` varchar(255) NOT NULL,
  `disease_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e9c26bc427b43871d0a94efbd02` (`patient_id`),
  KEY `FK_9d06e775e6214959a566b4ea465` (`doctor_id`),
  KEY `FK_ca3adb0f4b1991a5eeca524a062` (`disease_id`),
  CONSTRAINT `FK_9d06e775e6214959a566b4ea465` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_ca3adb0f4b1991a5eeca524a062` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`),
  CONSTRAINT `FK_e9c26bc427b43871d0a94efbd02` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examinations`
--

LOCK TABLES `examinations` WRITE;
/*!40000 ALTER TABLE `examinations` DISABLE KEYS */;
INSERT INTO `examinations` VALUES (5,'','TEST',NULL,'pending','2021-01-28 10:47:52.460351','2021-01-28 10:47:52.460351',2,NULL,'',4),(6,'https://storage.googleapis.com/origin-image-hunet/01_29_21_07_3501_scar-stock.jpg','Test create  customerDescription',NULL,'pending','2021-01-29 07:35:58.480284','2021-01-29 07:35:58.480284',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_29_21_07_3501_scar-stock.jpg',1),(7,'https://storage.googleapis.com/origin-image-hunet/01_30_21_02_2102_imagename.jpg','TEST',NULL,'pending','2021-01-30 02:24:05.326735','2021-01-30 02:24:05.326735',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_02_2102_imagename.jpg',4),(8,'https://storage.googleapis.com/origin-image-hunet/01_30_21_02_2050_imagename.jpg','TEST',NULL,'pending','2021-01-30 02:24:05.712075','2021-01-30 02:24:05.712075',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_02_2050_imagename.jpg',4),(9,'https://storage.googleapis.com/origin-image-hunet/01_30_21_02_2105_imagename.jpg','TEST',NULL,'pending','2021-01-30 02:24:08.597060','2021-01-30 02:24:08.597060',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_02_2105_imagename.jpg',4),(10,'https://storage.googleapis.com/origin-image-hunet/01_30_21_02_2112_imagename.jpg','TEST',NULL,'pending','2021-01-30 02:24:16.391834','2021-01-30 02:24:16.391834',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_02_2112_imagename.jpg',4),(11,'https://storage.googleapis.com/origin-image-hunet/01_30_21_02_2457_imagename.jpg','TEST',NULL,'pending','2021-01-30 02:27:59.431361','2021-01-30 02:27:59.431361',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_02_2457_imagename.jpg',4),(12,'https://storage.googleapis.com/origin-image-hunet/01_30_21_06_0735_imagename.jpg','TEST',NULL,'pending','2021-01-30 06:10:50.607306','2021-01-30 06:10:50.607306',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_06_0735_imagename.jpg',4),(13,'https://storage.googleapis.com/origin-image-hunet/01_30_21_07_5243_imagename.jpg','TEST',NULL,'pending','2021-01-30 07:52:51.254891','2021-01-30 07:52:51.254891',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_07_5243_imagename.jpg',1),(14,'https://storage.googleapis.com/origin-image-hunet/01_30_21_07_5414_imagename.jpg','TEST',NULL,'pending','2021-01-30 07:54:21.112834','2021-01-30 07:54:21.112834',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_07_5414_imagename.jpg',1),(15,'https://storage.googleapis.com/origin-image-hunet/01_30_21_07_5542_imagename.jpg','TEST',NULL,'pending','2021-01-30 07:55:49.564890','2021-01-30 07:55:49.564890',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_07_5542_imagename.jpg',1),(16,'https://storage.googleapis.com/origin-image-hunet/01_30_21_15_5828_imagename.jpg','TEST',NULL,'pending','2021-01-30 15:58:37.297683','2021-01-30 15:58:37.297683',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_15_5828_imagename.jpg',1),(17,'https://storage.googleapis.com/origin-image-hunet/01_30_21_16_1230_imagename.jpg','TEST',NULL,'pending','2021-01-30 16:12:49.327296','2021-01-30 16:12:49.327296',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_16_1230_imagename.jpg',1),(18,'https://storage.googleapis.com/origin-image-hunet/01_30_21_16_3908_imagename.jpg','TEST',NULL,'pending','2021-01-30 16:39:18.321958','2021-01-30 16:39:18.321958',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_30_21_16_3908_imagename.jpg',4),(19,'https://storage.googleapis.com/origin-image-hunet/01_31_21_08_2005_imagename.jpg','TEST',NULL,'pending','2021-01-31 08:20:08.179010','2021-01-31 08:20:08.179010',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_08_2005_imagename.jpg',2),(20,'https://storage.googleapis.com/origin-image-hunet/01_31_21_08_2256_imagename.jpg','TEST',NULL,'pending','2021-01-31 08:22:58.915679','2021-01-31 08:22:58.915679',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_08_2256_imagename.jpg',2),(21,'https://storage.googleapis.com/origin-image-hunet/01_31_21_08_3015_imagename.jpg','TEST',NULL,'pending','2021-01-31 08:30:17.266805','2021-01-31 08:30:17.266805',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_08_3015_imagename.jpg',4),(22,'https://storage.googleapis.com/origin-image-hunet/01_31_21_09_3921_imagename.jpg','TEST',NULL,'pending','2021-01-31 09:39:30.173966','2021-01-31 09:39:30.173966',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_09_3921_imagename.jpg',1),(23,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1353_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:13:56.219071','2021-01-31 12:13:56.219071',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1353_imagename.jpg',2),(24,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1359_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:14:00.822604','2021-01-31 12:14:00.822604',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1359_imagename.jpg',2),(25,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1526_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:15:28.900086','2021-01-31 12:15:28.900086',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1526_imagename.jpg',2),(26,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1546_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:15:49.450188','2021-01-31 12:15:49.450188',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1546_imagename.jpg',2),(27,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1547_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:15:49.467576','2021-01-31 12:15:49.467576',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1547_imagename.jpg',2),(28,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1549_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:15:51.446283','2021-01-31 12:15:51.446283',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1549_imagename.jpg',2),(29,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1556_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:15:58.618510','2021-01-31 12:15:58.618510',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1556_imagename.jpg',2),(30,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1631_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:16:33.529587','2021-01-31 12:16:33.529587',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1631_imagename.jpg',4),(31,'https://storage.googleapis.com/origin-image-hunet/01_31_21_12_1705_imagename.jpg','TEST',NULL,'pending','2021-01-31 12:17:09.208234','2021-01-31 12:17:09.208234',1,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_12_1705_imagename.jpg',4),(32,'https://storage.googleapis.com/origin-image-hunet/01_31_21_15_2729_imagename.jpg','TEST',NULL,'pending','2021-01-31 15:27:55.274708','2021-01-31 15:27:55.274708',2,NULL,'https://storage.googleapis.com/result-image-hunet/01_31_21_15_2729_imagename.jpg',4);
/*!40000 ALTER TABLE `examinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `content` text NOT NULL,
  `description_image` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creatorId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f2089d6c82cd8ee2709f53dfd00` (`creatorId`),
  CONSTRAINT `FK_f2089d6c82cd8ee2709f53dfd00` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` bigint(20) unsigned NOT NULL,
  `permission_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `IDX_3d0a7155eafd75ddba5a701336` (`role_id`),
  KEY `IDX_e3a3ba47b7ca00fd23be4ebd6c` (`permission_id`),
  CONSTRAINT `FK_3d0a7155eafd75ddba5a7013368` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e3a3ba47b7ca00fd23be4ebd6cf` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','admin','2021-01-18 16:13:40.733776','2021-01-18 16:13:40.733776');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `role_id` bigint(20) unsigned DEFAULT NULL,
  `birth_date` date NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_a2cecd1a3531c0b041e29ba46e1` (`role_id`),
  KEY `FK_03934bca2709003c5f08fd436d2` (`city_id`),
  CONSTRAINT `FK_03934bca2709003c5f08fd436d2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin','admin@gmail.com','$2b$10$7Y/TJgfg0ZaLBMrpVfJdlOFieRniweZozSx4eIXiux5NsDlw.yQs2','0899467737','male','2021-01-18 16:13:50.420589','2021-01-30 10:38:22.235091',1,'1999-08-22',NULL,NULL),(2,'Đỗ Trung Tín','tindt','tindt@gmail.com','$2b$10$JrK4yQDxjaR5Vcc5Sf67gOz5GGleBwHO6gyOf0mRYFJS.rVFArQUa','0912345678','male','2021-01-19 07:54:52.983745','2021-01-30 10:38:51.072586',1,'1999-08-22','https://storage.googleapis.com/profile-image-hunet/_x95488rlq7.jpg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01  7:50:04
