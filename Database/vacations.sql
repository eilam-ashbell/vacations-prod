-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 27, 2022 at 09:56 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(25, 44),
(25, 42),
(25, 48),
(25, 45),
(25, 15),
(25, 46),
(26, 44),
(26, 43),
(26, 48),
(26, 50),
(26, 15),
(26, 46),
(27, 44),
(27, 48),
(27, 43),
(27, 45),
(27, 46),
(28, 48),
(28, 50),
(28, 15),
(28, 41),
(29, 43),
(29, 48),
(29, 15),
(29, 46),
(30, 48),
(30, 43),
(30, 50);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userUuid` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(512) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userUuid`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(21, 'e6e872e3-c736-44e7-9b36-5800fb37625b', 'Eilam', 'Ashbell', 'eilamAsh', '45c0e34c804ed3fa8d090edae6c106b7acfe7e5164bd5102294a4897e6f77744213e4a6e245084ceaa6164a6f312d5b2de522773c6385a97750f861166810ecc', 1),
(25, '052c1ca5-4d10-4fff-9ace-f1ce3ba99fbf', 'Shani', 'Leibovich', 'Leibo', '421399b47a66cd4a04c79301c7b2661259c9d31bb5869135fff57a1856aed864ca7d091a43048e25b5ab4143c58ac890e06f419fe1fb652390f5f256d9d0e378', 2),
(26, '3e0da8d8-a126-40d8-bf1c-c1c24e90fe7c', 'Ido', 'Mizrahi', 'ido2miz', '96e66f7a2b939e6b8fe4b3a1556bb85e55603a04b9243555241bdb69f460621929e8cd17b3c9cfe5571d8bc9f0d16c8ed89f135191d24f189cf3306ef631dc1b', 2),
(27, '899222e3-9148-4620-ae16-2f0712ab06e2', 'Alex', 'Cohen', 'alexander', '13510eb569b4c5254c5d414cd42dc61aa9098f1aeb0470d8f67565b313cbadcbae223a694b6e953aa72f32dd1af5cbdac50304b1ee824ce741f521c5ffb46374', 2),
(28, 'c9c89ea9-82bd-449a-b170-20b032786736', 'Shay', 'Kagan', 'shayke', 'b2ab1893d35aa3b8dc42cc2c7e812ac36cfefb9998ba907de9ddb7708e6d553b8f56a8daba91cdb3c76d61a5b0f10ae0f31109ad72b3bbbfbc5610b5a5f5e578', 2),
(29, 'd70e71e3-7735-43a3-b04c-c407aed6c89a', 'Moshe', 'Katz', 'moshiko', 'e18c109aa83dd217d1b00f8b11145db51578661bae1e1f3a12b204760f6f8e20aae37cf76d008277df2f78a3a4c715f3074b795d722890b2e32f7437beaefe04', 2),
(30, 'dab0d6c6-9008-4ed6-a31a-22d18786bd33', 'Dor', 'Cohen', 'dorco', 'c611fb284581a64ffe6cf1bee67ebc51483cf5aa347c491ae1d4934d5ed5aace95d089ff6728aaed62f1e9990a7bc425a7bf238207e09ec1685c258a9f17688e', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(15, 'Puerto Rico Island', 'It may be small, but Puerto Rico is perfectly formed and packs a personality punch. Your vacation package to Puerto Rico transports to the beautiful beaches and turquoise shores of the Caribbean. The capital, San Juan, is awash with colorful Colonial Spanish architecture and cobbled streets, while inland, the El Yunque rainforest is a tropical oasis abundant in flora and rare fauna. For relaxed resort fun, check out the sunsets on the west coast, or to see the world\'s brightest bioluminescent bay, pay a visit to the Culebra & Vieques islands as part of your all-inclusive vacation in Puerto Rico.', '61f58106-d056-4979-9367-6a80166f125b.jpeg', '2023-02-03', '2023-02-12', '937.00'),
(41, 'Las Vegas', 'Viva Las Vegas! The city of fantastic lights and all-night parties, Las Vegas is the ultimate vacation destination for glitz and glamor. With our Las Vegas travel packages, you’ll be rolling dice on the roulette tables, taking in the Bellagio Fountains, and limo-cruising down the infamous Strip in no time. Maybe you’re up for a Las Vegas family vacation package, or perhaps an all-inclusive vacation package in Las Vegas is more your thing. Whatever your ideal Las Vegas luxury vacation package looks like, we’ve got you covered. Set Caesars Palace in your sights: You’re in for a wild time.', '833c3097-2880-4461-ac51-1d1532ad0f7c.jpeg', '2023-06-08', '2023-06-26', '843.00'),
(42, 'Rhodes', 'It\'s time to take a break and enjoy a cocktail by the sea on a Rhodes vacation. Incredible seaside views are there for the taking on a trip to Rhodes — Pefkos Beach (28 miles (45 km) away) is a well-known example. We recommend staying close by. If you want other options, a lot of travelers also book Rhodes vacation packages in the vicinity of Lindos Beach and Tsambika Beach.', '3ad2b8b2-2023-4f31-8c23-ed06122f0104.jpeg', '2022-11-08', '2022-11-22', '462.00'),
(43, 'Corfu', 'There\'s nothing more relaxing than a Corfu vacation. Whether you\'re treating yourself to refreshing cocktails at a local bar or reading your favorite magazine by the shore, your trip to Corfu is an ideal time to live out those beachy daydreams. Many people like to stay close to Paleokastritsa Beach, located just 10 miles (16 km) from downtown. However, you\'ll also find plenty of Corfu vacation deals close to D Amour Beach and Kavos Beach, two other well-liked nearby options.', '2408d5c0-844a-4650-b774-b01ba9f76c50.jpeg', '2022-12-13', '2022-12-27', '1070.00'),
(44, 'Rome', 'You can create a dream vacation of famous artistic wonders and historic hidden gems punctuated by top-notch dining in fabulous restaurants with a Rome vacation package. Fill your days with tours of the Roman Forum, the Pantheon, the Colosseum, all the show-off Rome sights, then meander down cobbled streets to find a pretty basement bar for a glass of Barolo with the locals. Explore vacations to Rome with package deals that include tours, tickets, and adventures to fill your trip with a lifetime of memories. So, book with Expedia and get captivated by this magical city with a fantastic vacation package. This is la dolce vita.', 'ed473f6e-6c7d-454a-8f57-bd0feb57945a.jpeg', '2022-10-28', '2022-11-09', '1931.00'),
(45, 'Honolulu', 'Capture the spirit of Hawaii island life on one of our stunning Honolulu vacation packages in 2022. A city where even office workers wear tropical shirts, laidback Honolulu offers gorgeous beach sunsets and delicious food in buzzing Chinatown. You can choose a Honolulu vacation packages with airfare for a stress-free getaway at a divine resort or hotel on a beautiful beachfront. Maybe at world-famous surf spot Waikiki, perhaps with a nightly hula show at Kūhiō Beach, possibly with a dose of history at Pearl Harbor, your vacation can be as adventurous or chilled as you like. Say aloha to one of our fantastic deals on travel packages to Honolulu.', 'f6251efa-8b51-463e-a071-f299e2332954.jpeg', '2023-05-09', '2023-05-31', '2035.00'),
(46, 'Kailua-Kona', 'There\'s nothing that can beat a Kailua-Kona vacation. Whether you\'re sipping on delicious cocktails at a local bar or flipping through a magazine by the ocean\'s edge, your trip to Kailua-Kona is an ideal time to live out your beachy fantasies. Many travelers like to stay close to Magic Sands Beach, situated just 12 miles (20 km) from the city center. However, you\'ll also find plenty of Kailua-Kona packages around Kahalu\'u Beach Park and Makalawena Beach, two other superb nearby options.', 'bc889196-55bb-4ebe-b900-fa1a576f08f9.jpeg', '2023-07-05', '2023-07-22', '1089.00'),
(47, 'Lahaina', 'It\'s time to take a break and relax by the ocean on a Lahaina vacation. Incredible seaside views are in plentiful supply on a trip to Lahaina — Kaanapali Beach (3 miles (5 km) away) is the perfect example. We recommend staying close by. If you want more options, loads of travelers also book Lahaina packages around Black Rock and Kahekili Beach.', '3204e266-ffef-4680-a9c5-9b97cab60395.jpeg', '2022-11-15', '2022-11-30', '1049.00'),
(48, 'Hilo', 'There\'s nothing like a Hilo vacation to put a spring in your step. The soothing sound of rolling waves and the smell of salty sea air are sure to refresh your mind and body. To be near the city center on your trip to Hilo, find a hotel around Honoli\'i Beach Park (just 2 miles (3 km) away). If you\'re going to stay for a bit, consider booking one of our Hilo vacation packages. Not only will you be able to save money, you\'ll also have other amazing beaches around you to explore, like Onekahakaha Beach Park and Keaukaha Beach Park. Now that\'s a win-win!', '9952f62e-7d5c-48fb-a04b-cbb0719204f6.jpeg', '2022-12-17', '2022-12-31', '2145.00'),
(49, 'Montego Bay', 'Montego Bay vacation packages, you can fly into Sangster International Airport and be on a stunning beach before you’ve had time to dig out your sunglasses from your travel bag. Whether you’re floating along Martha Brae River on a bamboo raft, swimming through caverns, or sipping on a cocktail enjoying the buzzing nightlife, Montego Bay is an enchanting beach destination. Try one of our Montego Bay all-inclusive vacations and choose from resorts catering for couples or families. At Expedia, whatever your budget, there’s an incredible Montego Bay vacation package deal for you.', '9c66136c-3853-4e72-8efc-89c857280ad8.jpeg', '2023-01-03', '2023-01-17', '1926.00'),
(50, 'Port Antonio', 'When it\'s time for an ocean getaway, put a Port Antonio vacation on your to-do list. If you live for long walks along the water\'s edge, a trip to Port Antonio may be right up your alley. We recommend staying near a famous strip of coastline known as Boston Bay Beach (6 miles (10 km) away). However, you can also check out Port Antonio packages near another tempting location, Winnifred Beach.', '2c8431f0-9bd9-42c1-beb4-4dec77fc3a68.jpeg', '2023-02-08', '2023-02-24', '1189.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
