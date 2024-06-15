-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_doit
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_admin`
--

DROP TABLE IF EXISTS `tb_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_admin` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `USERNAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_attachment`
--

DROP TABLE IF EXISTS `tb_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_attachment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TICKET_ID` int DEFAULT NULL,
  `NOTE_ID` int DEFAULT NULL,
  `FILE_PATH` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `TICKET_ID` (`TICKET_ID`),
  KEY `NOTE_ID` (`NOTE_ID`),
  CONSTRAINT `tb_attachment_ibfk_1` FOREIGN KEY (`TICKET_ID`) REFERENCES `tb_ticket` (`ID`),
  CONSTRAINT `tb_attachment_ibfk_2` FOREIGN KEY (`NOTE_ID`) REFERENCES `tb_note` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_customer`
--

DROP TABLE IF EXISTS `tb_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_customer` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MEMBER_ID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MEMBER_ID` (`MEMBER_ID`),
  CONSTRAINT `tb_customer_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `tb_member` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_member`
--

DROP TABLE IF EXISTS `tb_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `USERNAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ADMIN_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME` (`USERNAME`),
  KEY `fk_admin` (`ADMIN_ID`),
  CONSTRAINT `fk_admin` FOREIGN KEY (`ADMIN_ID`) REFERENCES `tb_admin` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_note`
--

DROP TABLE IF EXISTS `tb_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_note` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TICKET_ID` int NOT NULL,
  `MEMBER_ID` int DEFAULT NULL,
  `ADMIN_ID` int DEFAULT NULL,
  `CREATED_AT` datetime NOT NULL,
  `CONTENT` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `TICKET_ID` (`TICKET_ID`),
  KEY `MEMBER_ID` (`MEMBER_ID`),
  KEY `ADMIN_ID` (`ADMIN_ID`),
  CONSTRAINT `tb_note_ibfk_1` FOREIGN KEY (`TICKET_ID`) REFERENCES `tb_ticket` (`ID`),
  CONSTRAINT `tb_note_ibfk_2` FOREIGN KEY (`MEMBER_ID`) REFERENCES `tb_member` (`ID`),
  CONSTRAINT `tb_note_ibfk_3` FOREIGN KEY (`ADMIN_ID`) REFERENCES `tb_admin` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_ticket`
--

DROP TABLE IF EXISTS `tb_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_ticket` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CREATED_AT` datetime NOT NULL,
  `CUSTOMER_ID` int NOT NULL,
  `STATUS` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CUSTOMER_ID` (`CUSTOMER_ID`),
  CONSTRAINT `tb_ticket_ibfk_1` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `tb_customer` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `vw_notes`
--

DROP TABLE IF EXISTS `vw_notes`;
/*!50001 DROP VIEW IF EXISTS `vw_notes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_notes` AS SELECT 
 1 AS `ID`,
 1 AS `TICKET_ID`,
 1 AS `CREATED_AT`,
 1 AS `CONTENT`,
 1 AS `ADMIN_ID`,
 1 AS `MEMBER_ID`,
 1 AS `MEMBER_NAME`,
 1 AS `ADMIN_NAME`,
 1 AS `USER_TYPE`,
 1 AS `ATTACHMENT_ID`,
 1 AS `ATTACHMENT_PATH`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_ticket_details`
--

DROP TABLE IF EXISTS `vw_ticket_details`;
/*!50001 DROP VIEW IF EXISTS `vw_ticket_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_ticket_details` AS SELECT 
 1 AS `ID`,
 1 AS `DESCRIPTION`,
 1 AS `STATUS`,
 1 AS `CREATED_AT`,
 1 AS `CUSTOMER_ID`,
 1 AS `CUSTOMER_NAME`,
 1 AS `MEMBER_ID`,
 1 AS `MEMBER_NAME`,
 1 AS `ADMIN_ID`,
 1 AS `ATTACHMENT_ID`,
 1 AS `ATTACHMENT_PATH`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_notes`
--

/*!50001 DROP VIEW IF EXISTS `vw_notes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_notes` AS select `t`.`ID` AS `ID`,`t`.`TICKET_ID` AS `TICKET_ID`,`t`.`CREATED_AT` AS `CREATED_AT`,`t`.`CONTENT` AS `CONTENT`,`t`.`ADMIN_ID` AS `ADMIN_ID`,`t`.`MEMBER_ID` AS `MEMBER_ID`,`m`.`NAME` AS `MEMBER_NAME`,`a`.`NAME` AS `ADMIN_NAME`,(case when (`t`.`MEMBER_ID` is not null) then 'member' when (`t`.`ADMIN_ID` is not null) then 'admin' end) AS `USER_TYPE`,`att`.`ID` AS `ATTACHMENT_ID`,`att`.`FILE_PATH` AS `ATTACHMENT_PATH` from (((`tb_note` `t` left join `tb_member` `m` on((`t`.`MEMBER_ID` = `m`.`ID`))) left join `tb_admin` `a` on((`t`.`ADMIN_ID` = `a`.`ID`))) left join `tb_attachment` `att` on((`att`.`NOTE_ID` = `t`.`ID`))) order by `t`.`CREATED_AT` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_ticket_details`
--

/*!50001 DROP VIEW IF EXISTS `vw_ticket_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_ticket_details` AS select `t`.`ID` AS `ID`,`t`.`DESCRIPTION` AS `DESCRIPTION`,`t`.`STATUS` AS `STATUS`,`t`.`CREATED_AT` AS `CREATED_AT`,`t`.`CUSTOMER_ID` AS `CUSTOMER_ID`,`c`.`NAME` AS `CUSTOMER_NAME`,`c`.`MEMBER_ID` AS `MEMBER_ID`,`m`.`NAME` AS `MEMBER_NAME`,`a`.`ID` AS `ADMIN_ID`,`att`.`ID` AS `ATTACHMENT_ID`,`att`.`FILE_PATH` AS `ATTACHMENT_PATH` from ((((`tb_ticket` `t` join `tb_customer` `c` on((`c`.`ID` = `t`.`CUSTOMER_ID`))) join `tb_member` `m` on((`m`.`ID` = `c`.`MEMBER_ID`))) join `tb_admin` `a` on((`a`.`ID` = `m`.`ADMIN_ID`))) left join `tb_attachment` `att` on(((`att`.`TICKET_ID` = `t`.`ID`) and (`att`.`NOTE_ID` is null)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-15 10:56:37
