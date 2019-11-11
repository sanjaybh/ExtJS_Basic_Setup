-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Nov 11, 2019 at 05:25 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gdprapp`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `pAddUser`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pAddUser` (`uName` VARCHAR(255), `uDisplayName` VARCHAR(255), `uPassword` VARCHAR(255), `uIsAdmin` BOOLEAN, `uIsActive` BOOLEAN, OUT `success` BOOLEAN)  BEGIN
set success=0;

if exists (select 1 from tUser where userName = uName)
then
set success = 0;
else
   insert into tUser (userName, UserDisplayName, userPassword, userSalt, userIsAdmin, userIsActive) values (lower(uName), uDisplayName, 'not set' , 'not set',  uIsAdmin, uIsActive );
   call pSetPassword(uName, uPassword, @stat);
   if @stat <> 1 
   then 
       set success = 0;
   else
       set success=1;
   end if;
end if;
END$$

DROP PROCEDURE IF EXISTS `pCheckPassword`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCheckPassword` (`uName` VARCHAR(255), `uPassword` VARCHAR(255), OUT `validated` BOOLEAN)  BEGIN

set validated = (SELECT count(*) FROM tUser WHERE username = lower(uName) and userPassword = MD5(CONCAT(userSalt, ':', uPassword)));
END$$

DROP PROCEDURE IF EXISTS `pDelRecFrTbl`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pDelRecFrTbl` (IN `IN_ROW_ID` INT, IN `IN_TABLE_NAME` VARCHAR(255))  BEGIN
    SET @SQL = CONCAT('DELETE FROM ', IN_TABLE_NAME,
                      ' WHERE ID = ', IN_ROW_ID);
    PREPARE stmt FROM @SQL;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DROP PROCEDURE IF EXISTS `pSetPassword`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pSetPassword` (IN `uName` VARCHAR(255), `uPassword` VARCHAR(255), OUT `stat` BOOLEAN)  BEGIN


DECLARE salt char(36);

set salt = uuid();


update tUser set userPassword = MD5(concat(salt, ':', uPassword)), userSalt = salt  where userName = lower(uName);
set stat=1;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tcompany`
--

DROP TABLE IF EXISTS `tcompany`;
CREATE TABLE IF NOT EXISTS `tcompany` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) COLLATE utf8_bin NOT NULL,
  `companyMnemonic` varchar(255) COLLATE utf8_bin NOT NULL,
  `divisionID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `divisionID` (`divisionID`)
) ENGINE=MyISAM AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tcompany`
--

INSERT INTO `tcompany` (`ID`, `companyName`, `companyMnemonic`, `divisionID`) VALUES
(101, 'Idera SQL', 'SQL', 1),
(102, 'Precise', 'Precise', 1),
(103, 'Uptime', 'UT', 1),
(104, 'Data Gear', 'DG', 1),
(105, 'SQLYog', 'SQLYOG', 1),
(106, 'Aquadata Studio', 'ADS', 1),
(107, 'Code Gear', 'CG', 2),
(108, 'Sencha', 'Sencha', 2),
(109, 'WholeTomato', 'WT', 2),
(110, 'Lansa', 'Lansa', 2),
(111, 'Froala', 'Froala', 2),
(112, 'Testrail', 'TR', 3),
(113, 'Kiuwan', 'Kiuwan', 3),
(114, 'Assembla', 'Assembla', 3),
(115, 'Travis-CI', 'Travis', 3),
(116, 'Ranorex', 'Ranorex', 3),
(125, 'CompanyIE', 'IE Company', 39),
(123, 'Company New', 'New Company Mnemonic', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tcompanysystem`
--

DROP TABLE IF EXISTS `tcompanysystem`;
CREATE TABLE IF NOT EXISTS `tcompanysystem` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `companyID` int(11) NOT NULL,
  `systemID` int(11) NOT NULL,
  `responsiblePersonID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `companyID` (`companyID`),
  KEY `systemID` (`systemID`),
  KEY `responsiblePersonID` (`responsiblePersonID`)
) ENGINE=MyISAM AUTO_INCREMENT=408 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tcompanysystem`
--

INSERT INTO `tcompanysystem` (`ID`, `companyID`, `systemID`, `responsiblePersonID`) VALUES
(401, 101, 301, 1),
(402, 103, 301, 2),
(407, 123, 304, 8);

-- --------------------------------------------------------

--
-- Table structure for table `tddrequest`
--

DROP TABLE IF EXISTS `tddrequest`;
CREATE TABLE IF NOT EXISTS `tddrequest` (
  `ID` int(11) NOT NULL,
  `statusID` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `givenName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sirName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `businessPhone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `phoneExtension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `mobilePhone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `company` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `county` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `statusID` (`statusID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tddrstatus`
--

DROP TABLE IF EXISTS `tddrstatus`;
CREATE TABLE IF NOT EXISTS `tddrstatus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `statusType` int(11) NOT NULL,
  `statusDescription` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `statusType` (`statusType`)
) ENGINE=MyISAM AUTO_INCREMENT=610 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tddrstatus`
--

INSERT INTO `tddrstatus` (`ID`, `statusType`, `statusDescription`) VALUES
(601, 501, 'Open'),
(602, 501, 'Closed'),
(603, 502, 'Open'),
(604, 502, 'Closed'),
(606, 502, 'Pending'),
(607, 505, 'ffff'),
(608, 505, 'zxcv'),
(609, 505, 'vvvvv');

-- --------------------------------------------------------

--
-- Table structure for table `tddrtask`
--

DROP TABLE IF EXISTS `tddrtask`;
CREATE TABLE IF NOT EXISTS `tddrtask` (
  `ID` int(11) NOT NULL,
  `ddrID` int(11) NOT NULL,
  `coSystemID` int(11) NOT NULL,
  `taskOwner` int(11) NOT NULL,
  `statusID` int(11) NOT NULL,
  `dueDT` datetime NOT NULL,
  `closeDT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ddrID` (`ddrID`),
  KEY `statusID` (`statusID`),
  KEY `taskOwner` (`taskOwner`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tdivision`
--

DROP TABLE IF EXISTS `tdivision`;
CREATE TABLE IF NOT EXISTS `tdivision` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `divisionName` varchar(255) COLLATE utf8_bin NOT NULL,
  `divisionMnemonic` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tdivision`
--

INSERT INTO `tdivision` (`ID`, `divisionName`, `divisionMnemonic`) VALUES
(1, 'Database Tools', 'DbTools'),
(2, 'Development Tools', 'DevTools'),
(3, 'DevOps', 'DevOps'),
(39, 'IE Division', 'DivIEedge');

-- --------------------------------------------------------

--
-- Table structure for table `tlog`
--

DROP TABLE IF EXISTS `tlog`;
CREATE TABLE IF NOT EXISTS `tlog` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tscope`
--

DROP TABLE IF EXISTS `tscope`;
CREATE TABLE IF NOT EXISTS `tscope` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `scopeName` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=207 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tscope`
--

INSERT INTO `tscope` (`ID`, `scopeName`) VALUES
(200, 'ALL'),
(202, 'Marketing'),
(203, 'Support'),
(206, 'New Scope');

-- --------------------------------------------------------

--
-- Table structure for table `tscopecosystem`
--

DROP TABLE IF EXISTS `tscopecosystem`;
CREATE TABLE IF NOT EXISTS `tscopecosystem` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `scopeID` int(11) NOT NULL,
  `coSystemID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `scopeID` (`scopeID`),
  KEY `coSystemID` (`coSystemID`)
) ENGINE=MyISAM AUTO_INCREMENT=705 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tscopecosystem`
--

INSERT INTO `tscopecosystem` (`ID`, `scopeID`, `coSystemID`) VALUES
(701, 200, 401),
(702, 203, 401),
(704, 206, 407);

-- --------------------------------------------------------

--
-- Table structure for table `tstatustype`
--

DROP TABLE IF EXISTS `tstatustype`;
CREATE TABLE IF NOT EXISTS `tstatustype` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `levelDescription` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=508 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tstatustype`
--

INSERT INTO `tstatustype` (`ID`, `levelDescription`) VALUES
(501, 'Request Status'),
(502, 'Task Status'),
(505, 'New Task');

-- --------------------------------------------------------

--
-- Table structure for table `tsystem`
--

DROP TABLE IF EXISTS `tsystem`;
CREATE TABLE IF NOT EXISTS `tsystem` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `systemName` varchar(255) COLLATE utf8_bin NOT NULL,
  `systemDescription` varchar(255) COLLATE utf8_bin NOT NULL,
  `systemEntryPoint` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=309 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tsystem`
--

INSERT INTO `tsystem` (`ID`, `systemName`, `systemDescription`, `systemEntryPoint`) VALUES
(301, 'SQL Jira', 'Jira used by SQL, Precise, UT', 'https://jira.uptimesoftware.com'),
(302, 'EMBT Jira', 'Jira used by DG and CG ', 'http://vmsfjira:8665/secure/Dashboard.jspa'),
(303, 'Sencha Support', 'Sencha Support app', 'https://support.sencha.com'),
(304, 'SurveyMonkey', 'surveymonkey used by all', 'https://www.surveymonkey.com'),
(308, 'New system', 'new system', 'new system');

-- --------------------------------------------------------

--
-- Table structure for table `tuser`
--

DROP TABLE IF EXISTS `tuser`;
CREATE TABLE IF NOT EXISTS `tuser` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) COLLATE utf8_bin NOT NULL,
  `userDisplayName` varchar(255) COLLATE utf8_bin NOT NULL,
  `userPassword` varchar(255) COLLATE utf8_bin NOT NULL,
  `userSalt` char(36) COLLATE utf8_bin NOT NULL,
  `userIsAdmin` tinyint(1) NOT NULL,
  `userIsActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tuser`
--

INSERT INTO `tuser` (`ID`, `userName`, `userDisplayName`, `userPassword`, `userSalt`, `userIsAdmin`, `userIsActive`) VALUES
(1, 'scottpatterson', 'Scott Patterson', 'eb8d9d5db5677e15c3457d20f4b24eef', '802c2b9a-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(2, 'uptimeuser', 'uptime user', '35294bd6ae90fcc7cff25c5b29198524', '8032a95a-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(3, 'senchauser', 'sencha user', 'e7c3dd671deb2e143674dfa070af6642', '8034467a-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(4, 'user4', 'testuser4', 'bb64ecb24ec655939911bd2a0a83068a', '80363230-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(5, 'user5', 'testuser5', '24776c27d51ad624c690beb7f21b0a6e', '80382d37-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(6, 'user6', 'testuser6', 'eb7bc9e4ef1aec6531f838d37d492b91', '803a8964-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(7, 'user7', 'testuser7', 'b9ee184f3cd965f9c8cdca85c5af89f1', '803c7705-e6c3-11e9-a561-3c2c30c5e681', 1, 1),
(8, 'sanjay', 'Sanjay Bhan', '72514246a2036d28a2945d9088e35516', '8d8510ca-e6c6-11e9-a561-3c2c30c5e681', 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
