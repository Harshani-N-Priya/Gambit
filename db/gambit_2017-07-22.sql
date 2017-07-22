# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.49)
# Database: gambit
# Generation Time: 2017-07-22 06:53:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `category_name`)
VALUES
	(1,'GRADEA');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table eligibility
# ------------------------------------------------------------

DROP TABLE IF EXISTS `eligibility`;

CREATE TABLE `eligibility` (
  `category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `leave_type_id` int(11) unsigned NOT NULL DEFAULT '0',
  `days` int(11) DEFAULT '0',
  PRIMARY KEY (`category_id`,`leave_type_id`),
  KEY `leave_type_id` (`leave_type_id`),
  CONSTRAINT `eligibility_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `eligibility_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `type_of_leave` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `eligibility` WRITE;
/*!40000 ALTER TABLE `eligibility` DISABLE KEYS */;

INSERT INTO `eligibility` (`category_id`, `leave_type_id`, `days`)
VALUES
	(1,1,10);

/*!40000 ALTER TABLE `eligibility` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `experience` int(11) DEFAULT '0',
  `category_id` int(11) unsigned DEFAULT NULL,
  `manager_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `category_id` (`category_id`),
  KEY `employee_manager_id` (`manager_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `name`, `email`, `username`, `password`, `gender`, `location`, `experience`, `category_id`, `manager_id`)
VALUES
	(1,'Sakthivel','sakthipvmj@gmail.com','sakthipvmj','sak','Male','Bangalore',1,1,2),
	(2,'Harshani','harshaninallusamy@gmail.com','harshaninallusamy','har','Female','Chennai',9,1,NULL);

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table leave_requests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `leave_requests`;

CREATE TABLE `leave_requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) unsigned NOT NULL,
  `from` datetime NOT NULL,
  `to` datetime NOT NULL,
  `type_of_leave_id` int(11) unsigned NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `status` enum('initiated','approved','rejected','cancelled','request_edit','done_edit') DEFAULT 'initiated',
  `reason` varchar(255) DEFAULT NULL,
  `approved_by` int(11) unsigned DEFAULT NULL,
  `approved_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  KEY `approved_by` (`approved_by`),
  KEY `type_of_leave_id` (`type_of_leave_id`),
  CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `leave_requests_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `employee` (`id`),
  CONSTRAINT `leave_requests_ibfk_3` FOREIGN KEY (`type_of_leave_id`) REFERENCES `type_of_leave` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `leave_requests` WRITE;
/*!40000 ALTER TABLE `leave_requests` DISABLE KEYS */;

INSERT INTO `leave_requests` (`id`, `emp_id`, `from`, `to`, `type_of_leave_id`, `no_of_days`, `status`, `reason`, `approved_by`, `approved_on`)
VALUES
	(1,1,'2017-05-10 18:35:46','2017-05-10 18:35:46',1,2,'initiated','Summa',2,NULL);

/*!40000 ALTER TABLE `leave_requests` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table type_of_leave
# ------------------------------------------------------------

DROP TABLE IF EXISTS `type_of_leave`;

CREATE TABLE `type_of_leave` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `type_of_leave` WRITE;
/*!40000 ALTER TABLE `type_of_leave` DISABLE KEYS */;

INSERT INTO `type_of_leave` (`id`, `name`)
VALUES
	(1,'CL');

/*!40000 ALTER TABLE `type_of_leave` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
