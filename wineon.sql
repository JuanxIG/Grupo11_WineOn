-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2022 at 07:22 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wineon`
--

-- --------------------------------------------------------

--
-- Table structure for table `bodegas`
--

CREATE TABLE `bodegas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bodegas`
--

INSERT INTO `bodegas` (`id`, `nombre`) VALUES
(1, 'Santa Julia'),
(2, 'Norton'),
(3, 'Rutini');

-- --------------------------------------------------------

--
-- Table structure for table `cepas`
--

CREATE TABLE `cepas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cepas`
--

INSERT INTO `cepas` (`id`, `nombre`) VALUES
(1, 'Malbec'),
(2, 'Cabernet Sauvignon'),
(3, 'Torrontes'),
(4, 'Chardonnay');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `usuarioid` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos_vinos`
--

CREATE TABLE `pedidos_vinos` (
  `id` int(11) NOT NULL,
  `pedidoid` int(11) NOT NULL,
  `vinoid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `nacimiento` date NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  `admin` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `first_name`, `last_name`, `mail`, `dni`, `imagen`, `contrasenia`, `domicilio`, `nacimiento`, `enabled`, `admin`) VALUES
(1, 'Jose', 'Odriozola', 'damian@hotmail.com', 35148735, 'imagen-1646169983468.jpg', '$2a$10$mElc8QMFc9FKuX5USI0j5Ol7ByI8LQk944JacLha6yq1c2Hg6.Gye', 'Thames 1527', '1990-03-11', 1, 0),
(2, 'Fernando', 'Odriozola', 'feseod@hotmail.com', 34222800, 'imagen-1645566101850.jpg', '$2a$10$djE26/O7hiIwmB4Vc2fnSuOrsNfKfL6ZuQJCHBEqIaNjfa2xp1U5q', 'Ñaembe 2628', '1988-11-03', 1, 0),
(5, 'Martin', 'Perez', 'martin@hotmail.com', 22333444, 'imagen-1645567568982.jpg', '$2a$10$BbStVGoa5Ff7xQ0/DWkjyOhcHthy02LnwNvkLcTDoGvHRgxn0/qGi', 'Thames 1527', '1990-12-11', 1, 0),
(6, 'Fede', 'Perez', 'fede@hotmail.com', 11222333, 'fernando..jpg-1645740439323.jpg', '$2a$10$RQ.6e6ek2lmLsYsvp88cx.15m3VZXhoLbm/5F/6Ax306t//xP7a2O', '3 de abril 2233', '1990-03-11', 1, 0),
(7, 'Juan Ignacio', 'Mendieta', 'juani@hotmail.com', 43900201, 'fernando..jpg-1645904960015.jpg', '$2a$10$1p2AyFF3oMR7VJfda951d.edzC4MAi6IHMESESUuvtOFTFjKKvfqm', 'Guastavino 123', '2002-05-23', 1, 0),
(8, 'Luca ', 'Koval', 'ada@hotmail.com', 4444447, 'imagen-1646516972033.jpg', '$2a$10$cpvA0nw05YaYP5yHfIEl4u00bf0xVztOFYKrLb1Lm1FYk25bKCCNK', 'Av Espania 535', '1990-12-11', 1, 0),
(9, 'admin', 'admin', 'admin@gmail.com', 23145662, 'imagen-1652718147376.png', '$2a$10$1GfbkqY1yNtlnVH.aUgG0OyXkxYcrn9Z5MyQAF5WmU8s1Xr4COB8C', 'Av Independencia 100', '1995-05-13', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vinos`
--

CREATE TABLE `vinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `cuotas` tinyint(4) NOT NULL,
  `descuento` tinyint(4) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `cepaid` int(11) NOT NULL,
  `bodegaid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vinos`
--

INSERT INTO `vinos` (`id`, `nombre`, `precio`, `cuotas`, `descuento`, `descripcion`, `imagen`, `stock`, `cepaid`, `bodegaid`) VALUES
(1, 'Novecento Raíces', '4000', 3, 15, 'Este vino lleva el aroma perfecto de la frescura algo que no dudaría en probarlo, estoy seguro de que si tenes que llevarte uno este es el indicado.', 'imagen-1648153144568.jpg', 50, 1, 1),
(2, 'Escorihuela Gascón', '9210', 3, 10, 'Rojo rubí concentrado y brillante con reflejos violáceos. Agradable tipicidad que se vale de aromas frutales como moras, arándanos, violetas y ciruelas. Confitura de frutos negros, especias y dejos tostados aportados por la crianza en barricas. Malbec de paladar sabroso y buen jugo.', 'imagen-1648159962648.jpg', 100, 1, 2),
(4, 'Familia Gascón', '5000', 3, 0, 'Sus aromas recuerdan a los frutos negros frescos, las hierbas y especias que se complementan a los dejos de vainilla y roble tostado. En paladar es un Cabernet Sauvignon fresco y fluido con sabor frutal y balsámico.', 'imagen-1648160051839.jpg', 200, 2, 2),
(5, 'Luigi Bosca De Sangre', '3119', 1, 0, 'Luigi Bosca De Sangre Cabernet Sauvignon es un tinto de color rojo profundo. Se distingue por sus aromas de excelente tipicidad varietal, dominados por la fruta negra y las notas de pimienta muy bien equilibradas con los tonos de torrefacción producto de su crianza en barricas. En el paladar es compacto, tenso, con muy buena estructura y cuerpo.', 'imagen-1648162282296.jpg', 100, 2, 2),
(6, 'Paraíso', '17940', 6, 20, 'Paraiso nace solo en las más célebres cosechas y expresa una búsqueda a lo largo de más de 120 años de historia y conocimiento de los Arizu en el terruño mendocino. Este vino rinde homenaje a Finca El Paraíso, un viñedo trascendente, fuente de inspiración de muchas de las más importantes innovaciones y parte del legado histórico y emocional de la familia.', 'imagen-1648162322314.jpg', 150, 2, 1),
(7, 'Finca los Nobles', '5951', 3, 40, 'De color rojo violáceo profundo con reflejos rubí, sus aromas son expresivos e intensos, con notas de frutos rojos y negros, especias dulces, flores y suaves ahumados de la crianza. En boca es franco y voluptuoso, con una frescura vivaz que habla de la añada, apoyada en su carácter frutal. De paladar amplio y profundo, con taninos finos y un final persistente en el que se puede apreciar su complejidad.', 'imagen-1648162347015.jpg', 30, 1, 1),
(8, 'Rutini Malbec', '4565', 6, 15, 'Rojo violáceo, con matices azulados. En nariz, se destaca una gran complejidad aromática: notas de ciruelas entremezcladas con especias que recuerdan a vainilla, anís, pimienta negra. y un fondo floral que recuerda a la flor de la violeta. En boca, se reafirman los acentos frutados, sus taninos envolventes y sedosos, bien presentes pero amables, destacan su personalidad y su gran complejidad.', 'imagen-1648162365544.jpg', 120, 1, 3),
(9, 'Dominio Gran Malbec', '4823', 6, 0, 'Rojo granate límpido con reflejos violáceos. En nariz se destacan aromas frutales como la ciruela, florales como la violeta y un toque especiado de regaliz.En boca la tipicidad del varietal se presenta con sabores a fruta negra, jugoso, fresco y con una acidez equilibrada.', 'imagen-1648162423041.jpg', 60, 1, 3),
(10, 'Rutini Cabernet Sauvignon', '5490', 3, 15, 'Rojo rubí intenso. En nariz, se presenta frutado, con notas de fruta negra y toques especiados que recuerdan a la vainilla, pimiento rojo y pimientas, mientras, en boca, se reafirman los acentos frutados. Los taninos, presentes, envolventes y sedosos nos denotan su personalidad y sutileza. Su final es agradable, largo y persistente.', 'imagen-1648162451288.jpg', 15, 2, 3),
(11, 'Dominio Chardonnay', '7530', 3, 0, 'De color amarillo dorado con reflejos verdosos. Aromas a fruta de carozo como durazno maduro, manzana y notas tropicales de ananá. Es un vino elegante y de gran suavidad en boca, untuoso y con buen balance, con un fino marco mineral en su final.', 'imagen-1648162473776.jpg', 10, 4, 3),
(12, 'Rutini Chardonnay', '2764', 1, 0, 'Dorado, con marcados reflejos verdes. Aroma intensamente frutado. El contacto con la madera le confiere el suave dejo de vainilla que ennoblece su perfume a frutas tropicales. Es largo y complejo, de excelente frutosidad y gran persistencia en paladar. Un blanco fino y equilibrado.', 'imagen-1648162488974.jpg', 10, 4, 3),
(13, 'Reserve Chardonnay', '1620', 1, 0, 'Amarillo pálido con reflejos verdosos. Brillante y límpido. Plenamente aromático: entrega frescas notas tropicales ( ananá, mango) describiendo una nariz compleja y voluptuosa. En el paladar, su ataque es seco y permite descubrir resabios de fruta fresca y ligera untuosidad, con un fondo cítrico interesante. Ágil en boca, este blanco expresivo y elegante simboliza un nuevo estilo del cepaje Chardonnay.', 'imagen-1648162517040.jpg', 20, 4, 3),
(14, 'Apartado Gran Chardonnay', '11728', 6, 15, 'De color dorado intenso con reflejos verdosos. En nariz, ofrece aromas a frutas tropicales acompañadas con notas de vainilla y miel, aportadas por el tiempo de crianza en barrica.En boca, se confirma la paleta aromática de este vino untuoso, complejo y de persistente final', 'imagen-1648162530936.jpg', 100, 4, 3),
(15, 'Novecento Raíces', '5100', 1, 0, 'Un color suave y hermoso acompañado de su sabor inexplicable que te deja ganas de mas, con u buen precio y de los vinos mas dulces que vas a encontrar dentro del mercado, sin pensarlo dos veces un buen finde de la familia elijo este vino. ', 'imagen-1648162545934.jpg', 50, 4, 2),
(16, 'La Linda Torrontes', '4536', 3, 0, 'De aromas intensos a flores blancas y frutas tropicales. Su paladar es expresivo y perfumado, de paso fluido y refrescante. Es un vino con gracia, vibrante y directo, con tipicidad varietal inconfundible y final cítrico persistente y agradable.', 'imagen-1648162563259.jpg', 15, 3, 2),
(17, 'Cafayate', '8150', 1, 0, 'Sus aromas son equilibrados y expresivos; combinan frutas tropicales y flores silvestres. En boca es vivaz y refrescante, con buen cuerpo. De paladar franco y complejo, con tensión y un carácter floral que habla de su tipicidad, pero también de su personalidad. ', 'imagen-1648162588856.jpg', 90, 3, 2),
(18, 'Elementos', '7000', 3, 0, 'Amarillo con destellos verdosos y brillantes. Recuerda a aromas típicos de la uva Torrontés. Muy frutado, delicado y con aromas primarios de fermentación. Suave, aterciopelado. Final dulce y muy agradable. Fresco y con una elegante acidez.', 'imagen-1648162604643.jpg', 25, 3, 2),
(19, 'El Esteco', '1500', 1, 0, 'Vista: Color amarillo intenso y brillante con tonalidades oro. Aroma: Aromas delicados, notas florales que recuerdan las rosas y naranjos, sutil vainilla aportado por su paso por roble. Gusto: Vino de carácter con sabores exóticos e intensos con muy buena acidez y la frescura de los cítricos, entrada dulce.', 'imagen-1648162623437.jpg', 10, 3, 2),
(20, 'El Esteco Old Vines', '1710', 1, 0, 'Color: Amarillo claro con leves notas verdosas y aceradas. Leve velado por presencias de leves lías muy finas en suspensión. Aroma: Muy delicado - impacta la sutileza y frescura de sus aromas cítricos - mineral y floral delicado. Sabor: Fresco - joven - con gran textura - muy fácil de tomar - excelente balance de acidez y dulzura en boca - mineral.', 'imagen-1648162648200.jpeg', 25, 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bodegas`
--
ALTER TABLE `bodegas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cepas`
--
ALTER TABLE `cepas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedidos_FK` (`usuarioid`);

--
-- Indexes for table `pedidos_vinos`
--
ALTER TABLE `pedidos_vinos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedidos_productos_FK` (`vinoid`),
  ADD KEY `pedidos_productos_FK_1` (`pedidoid`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarios_un` (`dni`),
  ADD UNIQUE KEY `mail_unique` (`mail`),
  ADD UNIQUE KEY `dni_unique` (`dni`);

--
-- Indexes for table `vinos`
--
ALTER TABLE `vinos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vinos_FK` (`bodegaid`),
  ADD KEY `vinos_FK_1` (`cepaid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bodegas`
--
ALTER TABLE `bodegas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cepas`
--
ALTER TABLE `cepas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedidos_vinos`
--
ALTER TABLE `pedidos_vinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vinos`
--
ALTER TABLE `vinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_FK` FOREIGN KEY (`usuarioid`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `pedidos_vinos`
--
ALTER TABLE `pedidos_vinos`
  ADD CONSTRAINT `pedidos_productos_FK` FOREIGN KEY (`vinoid`) REFERENCES `vinos` (`id`),
  ADD CONSTRAINT `pedidos_productos_FK_1` FOREIGN KEY (`pedidoid`) REFERENCES `pedidos` (`id`);

--
-- Constraints for table `vinos`
--
ALTER TABLE `vinos`
  ADD CONSTRAINT `vinos_FK` FOREIGN KEY (`bodegaid`) REFERENCES `bodegas` (`id`),
  ADD CONSTRAINT `vinos_FK_1` FOREIGN KEY (`cepaid`) REFERENCES `cepas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
