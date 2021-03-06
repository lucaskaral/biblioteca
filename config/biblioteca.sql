-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 21-Dez-2021 às 23:32
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `autores`
--

CREATE TABLE `autores` (
  `ID` int(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `autores`
--

INSERT INTO `autores` (`ID`, `nome`, `pais`) VALUES
(1, 'Jostein Gaarder', 'Noruega'),
(2, 'autor teste atualizado', 'pais teste atualizado'),
(4, 'lucas f k', 'colombia');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `ID` bigint(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`ID`, `nome`, `telefone`, `username`, `senha`) VALUES
(1, 'Lucas Formiga Karal', '55518569875', 'lucaskaral', 'password');

-- --------------------------------------------------------

--
-- Estrutura da tabela `livros`
--

CREATE TABLE `livros` (
  `ID` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `editora` varchar(255) NOT NULL,
  `ano_publicacao` date NOT NULL,
  `ISBN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `livros`
--

INSERT INTO `livros` (`ID`, `titulo`, `editora`, `ano_publicacao`, `ISBN`) VALUES
(18, 'livro update', 'Editora B', '2021-11-11', '978–85–333–0227–30'),
(19, 'O mundo de Sofia', 'Editora A', '0000-00-00', '978–85–333–0227–4'),
(58, 'O mundo de Sofia 2', 'Editora A', '0000-00-00', '978–85–333–0227–6');

-- --------------------------------------------------------

--
-- Estrutura da tabela `livros_autores`
--

CREATE TABLE `livros_autores` (
  `id_livro` int(11) NOT NULL,
  `id_autor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `livros_autores`
--

INSERT INTO `livros_autores` (`id_livro`, `id_autor`) VALUES
(18, 1),
(18, 2),
(19, 1),
(19, 2),
(58, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `livros_reservados`
--

CREATE TABLE `livros_reservados` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `livros_reservados`
--

INSERT INTO `livros_reservados` (`id`, `id_cliente`, `id_livro`, `data_inicio`, `data_fim`) VALUES
(1, 1, 1, '2022-10-10', '2022-11-10'),
(2, 1, 1, '2023-10-10', '2023-11-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`,`senha`);

--
-- Indexes for table `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ISBN` (`ISBN`),
  ADD UNIQUE KEY `ISBN_2` (`ISBN`),
  ADD UNIQUE KEY `ISBN_3` (`ISBN`);

--
-- Indexes for table `livros_autores`
--
ALTER TABLE `livros_autores`
  ADD UNIQUE KEY `unique_index` (`id_livro`,`id_autor`),
  ADD KEY `id_autor` (`id_autor`);

--
-- Indexes for table `livros_reservados`
--
ALTER TABLE `livros_reservados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autores`
--
ALTER TABLE `autores`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `livros`
--
ALTER TABLE `livros`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `livros_reservados`
--
ALTER TABLE `livros_reservados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `livros_autores`
--
ALTER TABLE `livros_autores`
  ADD CONSTRAINT `livros_autores_ibfk_1` FOREIGN KEY (`id_livro`) REFERENCES `livros` (`ID`),
  ADD CONSTRAINT `livros_autores_ibfk_2` FOREIGN KEY (`id_livro`) REFERENCES `livros` (`ID`),
  ADD CONSTRAINT `livros_autores_ibfk_3` FOREIGN KEY (`id_livro`) REFERENCES `livros` (`ID`),
  ADD CONSTRAINT `livros_autores_ibfk_4` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
