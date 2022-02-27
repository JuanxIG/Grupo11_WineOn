-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: wineon
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bodegas`
--

DROP TABLE IF EXISTS `bodegas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bodegas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodegas`
--

LOCK TABLES `bodegas` WRITE;
/*!40000 ALTER TABLE `bodegas` DISABLE KEYS */;
INSERT INTO `bodegas` VALUES (1,'Santa Julia'),(2,'Norton'),(3,'Rutini');
/*!40000 ALTER TABLE `bodegas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cepas`
--

DROP TABLE IF EXISTS `cepas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cepas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cepas`
--

LOCK TABLES `cepas` WRITE;
/*!40000 ALTER TABLE `cepas` DISABLE KEYS */;
INSERT INTO `cepas` VALUES (1,'Malbec'),(2,'Cabernet Sauvignon');
/*!40000 ALTER TABLE `cepas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioid` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidos_FK` (`usuarioid`),
  CONSTRAINT `pedidos_FK` FOREIGN KEY (`usuarioid`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_vinos`
--

DROP TABLE IF EXISTS `pedidos_vinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos_vinos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pedidoid` int(11) NOT NULL,
  `vinoid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidos_productos_FK` (`vinoid`),
  KEY `pedidos_productos_FK_1` (`pedidoid`),
  CONSTRAINT `pedidos_productos_FK` FOREIGN KEY (`vinoid`) REFERENCES `vinos` (`id`),
  CONSTRAINT `pedidos_productos_FK_1` FOREIGN KEY (`pedidoid`) REFERENCES `pedidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_vinos`
--

LOCK TABLES `pedidos_vinos` WRITE;
/*!40000 ALTER TABLE `pedidos_vinos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_vinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `nacimiento` date NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  `admin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_un` (`dni`),
  UNIQUE KEY `mail_unique` (`mail`),
  UNIQUE KEY `dni_unique` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Damian','Odriozola','damian@hotmail.com',35148735,'imagen-1645136968267.png','$2a$10$mElc8QMFc9FKuX5USI0j5Ol7ByI8LQk944JacLha6yq1c2Hg6.Gye','Thames 1527','1990-03-11',1,0),(2,'Fernando','Odriozola','feseod@hotmail.com',34222800,'imagen-1645566101850.jpg','$2a$10$djE26/O7hiIwmB4Vc2fnSuOrsNfKfL6ZuQJCHBEqIaNjfa2xp1U5q','Ñaembe 2628','1988-11-03',1,0),(5,'Martin','Perez','martin@hotmail.com',22333444,'imagen-1645567568982.jpg','$2a$10$BbStVGoa5Ff7xQ0/DWkjyOhcHthy02LnwNvkLcTDoGvHRgxn0/qGi','Thames 1527','1990-12-11',1,0),(6,'Fede','Perez','fede@hotmail.com',11222333,'fernando..jpg-1645740439323.jpg','$2a$10$RQ.6e6ek2lmLsYsvp88cx.15m3VZXhoLbm/5F/6Ax306t//xP7a2O','3 de abril 2233','1990-03-11',1,0),(7,'Juan Ignacio','Mendieta','juani@hotmail.com',43900201,'fernando..jpg-1645904960015.jpg','$2a$10$1p2AyFF3oMR7VJfda951d.edzC4MAi6IHMESESUuvtOFTFjKKvfqm','Guastavino 123','2002-05-23',1,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vinos`
--

DROP TABLE IF EXISTS `vinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vinos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `cuotas` tinyint(4) NOT NULL,
  `descuento` tinyint(4) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `cepaid` int(11) NOT NULL,
  `bodegaid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vinos_FK` (`bodegaid`),
  KEY `vinos_FK_1` (`cepaid`),
  CONSTRAINT `vinos_FK` FOREIGN KEY (`bodegaid`) REFERENCES `bodegas` (`id`),
  CONSTRAINT `vinos_FK_1` FOREIGN KEY (`cepaid`) REFERENCES `cepas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vinos`
--

LOCK TABLES `vinos` WRITE;
/*!40000 ALTER TABLE `vinos` DISABLE KEYS */;
INSERT INTO `vinos` VALUES (1,'Reserva',500,3,0,'Aromas de fruta madura típicos de Malbec y notas ahumadas que denotan su paso por barricas.','gdfgd',50,1,1),(4,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645744653624.jpg',20,1,3),(5,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645744684053.jpg',20,1,3),(6,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645744699843.jpg',20,1,3),(7,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645744801804.jpg',20,1,3),(8,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645744906961.jpg',20,1,3),(9,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645745091738.jpg',20,1,3),(10,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645745108971.jpg',20,1,3),(11,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645745136408.jpg',20,1,3),(12,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645746796105.jpg',20,1,3),(13,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645747324244.jpg',20,1,3),(14,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645747381359.jpg',20,1,3),(15,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645747422532.jpg',20,1,3),(16,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645747460196.jpg',20,1,3),(17,'Rutini Malbec',1500,3,0,'Descripcion de prueba','image-1645747604655.jpg',20,1,3);
/*!40000 ALTER TABLE `vinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'wineon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-26 17:03:11
