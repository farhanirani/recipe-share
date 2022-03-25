-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2022 at 01:26 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipeshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks_table`
--

CREATE TABLE `bookmarks_table` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category_table`
--

CREATE TABLE `category_table` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category_table`
--

INSERT INTO `category_table` (`category_id`, `category_name`) VALUES
(1, 'Chinese'),
(2, 'Indian'),
(3, 'Mexican'),
(4, 'Dessert'),
(5, 'Barbeque'),
(6, 'Italian'),
(7, 'American');

-- --------------------------------------------------------

--
-- Table structure for table `comments_table`
--

CREATE TABLE `comments_table` (
  `comment_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `comment_author_id` int(11) NOT NULL,
  `comment_info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ratings_table`
--

CREATE TABLE `ratings_table` (
  `recipe_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients_table`
--

CREATE TABLE `recipe_ingredients_table` (
  `step_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `instructions` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_ingredients_table`
--

INSERT INTO `recipe_ingredients_table` (`step_id`, `recipe_id`, `instructions`) VALUES
(16, 14, '100gm aata'),
(17, 14, '40gms flour'),
(18, 14, '1L water'),
(22, 16, '100gm aata'),
(23, 16, '40gms flour'),
(24, 16, '1L water'),
(42, 28, '100gm flour'),
(43, 28, '4 eggs'),
(44, 28, '4 tbsp sugar'),
(45, 29, 'mango'),
(46, 29, 'lassi'),
(47, 30, 'mango'),
(48, 30, 'lassi');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_table`
--

CREATE TABLE `recipe_table` (
  `recipe_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `recipe_name` varchar(255) NOT NULL,
  `recipe_desc` varchar(255) NOT NULL,
  `recipe_image` varchar(255) NOT NULL,
  `no_steps` int(11) NOT NULL,
  `time_required` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `views_count` int(100) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe_table`
--

INSERT INTO `recipe_table` (`recipe_id`, `creator_id`, `recipe_name`, `recipe_desc`, `recipe_image`, `no_steps`, `time_required`, `category_id`, `date_time`, `views_count`) VALUES
(14, 2, 'DOSA', 'dosa by shweta', 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg', 3, '1 hr 20 mins', 2, '2021-04-11 16:07:19', 66),
(16, 2, 'Strawberry Cake', 'learn how to make a Strawberry Cake', '', 3, '1 hr 20 mins', 1, '2021-04-11 16:08:29', 3),
(28, 2, 'Tasty Pancakes', 'Make some delicious pancakes with me', 'https://upload.wikimedia.org/wikipedia/commons/4/43/Blueberry_pancakes_%283%29.jpg', 4, '60 min', 1, '2021-05-12 06:07:34', 4),
(29, 2, 'mango lassi', 'test', 'https://www.cookwithmanali.com/wp-content/uploads/2014/05/Indian-Mango-Lassi-Recipe-500x500.jpg', 1, '60 min', 1, '2021-05-12 08:02:44', 2),
(30, 2, 'mango lassi', 'test', 'https://www.cookwithmanali.com/wp-content/uploads/2014/05/Indian-Mango-Lassi-Recipe-500x500.jpg', 1, '60 min', 1, '2021-05-12 08:02:57', 0);

-- --------------------------------------------------------

--
-- Table structure for table `step_table`
--

CREATE TABLE `step_table` (
  `step_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `instructions` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `step_table`
--

INSERT INTO `step_table` (`step_id`, `recipe_id`, `instructions`) VALUES
(13, 14, 'step 1 of the'),
(14, 14, 'step 2 of the recuoe'),
(15, 14, 'dosa completed'),
(19, 16, 'step 1 of the'),
(20, 16, 'step 2 of the recuoe'),
(21, 16, 'noodels completed'),
(33, 28, 'first break the eggs in a bowl'),
(34, 28, 'mix the flour and sugar'),
(35, 28, 'after its mixed, start the stove and pour the batter on the stove'),
(36, 29, 'mix the mango and lassi'),
(37, 30, 'mix the mango and lassi');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `profile_pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `username`, `email`, `pass`, `bio`, `profile_pic`) VALUES
(1, 'fki', 'farhan@online', '$2b$10$kAMH8B6G1G9MN8N4u7NqqeHkXC76tnz9WAd7M4R00eyNurCBucMSK', 'new bio', 'new link'),
(2, 'shweta', 'goradia@online', '$2b$10$eWtMfcRSOHNgyE5XHCaFkefeH2od/qLKtVe02z/Kir0qr/1US3KLe', 'rupali h8er', 'ruppali favourite link'),
(3, 'asd', 'asd@asd.com', '$2b$10$zlm4MQL6hY3iMM5p0SpDBOfAvrlwCcDD13DjHiyVp4BN0wDjnYP6W', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `view_table`
--

CREATE TABLE `view_table` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks_table`
--
ALTER TABLE `bookmarks_table`
  ADD KEY `bm user` (`user_id`),
  ADD KEY `bm recipe` (`recipe_id`);

--
-- Indexes for table `category_table`
--
ALTER TABLE `category_table`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments_table`
--
ALTER TABLE `comments_table`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comment recipe` (`recipe_id`),
  ADD KEY `comment author` (`comment_author_id`);

--
-- Indexes for table `ratings_table`
--
ALTER TABLE `ratings_table`
  ADD KEY `rating recipe` (`recipe_id`),
  ADD KEY `rating user` (`user_id`);

--
-- Indexes for table `recipe_ingredients_table`
--
ALTER TABLE `recipe_ingredients_table`
  ADD PRIMARY KEY (`step_id`),
  ADD KEY `recipe ingredients` (`recipe_id`);

--
-- Indexes for table `recipe_table`
--
ALTER TABLE `recipe_table`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `recipe user` (`creator_id`),
  ADD KEY `recipe category` (`category_id`);

--
-- Indexes for table `step_table`
--
ALTER TABLE `step_table`
  ADD PRIMARY KEY (`step_id`),
  ADD KEY `step recipe` (`recipe_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `view_table`
--
ALTER TABLE `view_table`
  ADD KEY `user view` (`user_id`),
  ADD KEY `recipe view` (`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category_table`
--
ALTER TABLE `category_table`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments_table`
--
ALTER TABLE `comments_table`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe_ingredients_table`
--
ALTER TABLE `recipe_ingredients_table`
  MODIFY `step_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `recipe_table`
--
ALTER TABLE `recipe_table`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `step_table`
--
ALTER TABLE `step_table`
  MODIFY `step_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmarks_table`
--
ALTER TABLE `bookmarks_table`
  ADD CONSTRAINT `bm recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bm user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments_table`
--
ALTER TABLE `comments_table`
  ADD CONSTRAINT `comment author` FOREIGN KEY (`comment_author_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings_table`
--
ALTER TABLE `ratings_table`
  ADD CONSTRAINT `rating recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe_ingredients_table`
--
ALTER TABLE `recipe_ingredients_table`
  ADD CONSTRAINT `recipe ingredients` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe_table`
--
ALTER TABLE `recipe_table`
  ADD CONSTRAINT `recipe category` FOREIGN KEY (`category_id`) REFERENCES `category_table` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe user` FOREIGN KEY (`creator_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `step_table`
--
ALTER TABLE `step_table`
  ADD CONSTRAINT `step recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `view_table`
--
ALTER TABLE `view_table`
  ADD CONSTRAINT `recipe view` FOREIGN KEY (`recipe_id`) REFERENCES `recipe_table` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user view` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
