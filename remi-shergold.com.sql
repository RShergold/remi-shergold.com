/*
 Navicat Premium Data Transfer

 Source Server         : local MAMP
 Source Server Type    : MySQL
 Source Server Version : 50534
 Source Host           : 127.0.0.1
 Source Database       : remi-shergold.com

 Target Server Type    : MySQL
 Target Server Version : 50534
 File Encoding         : utf-8

 Date: 05/16/2016 15:51:30 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `pages`
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `section_slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `panel_type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` mediumtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `find_page_by_name` (`slug`,`section_slug`),
  KEY `pages_in_section` (`section_slug`) USING BTREE,
  FULLTEXT KEY `search_content` (`title`,`description`,`content`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `sections`
-- ----------------------------
DROP TABLE IF EXISTS `sections`;
CREATE TABLE `sections` (
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `order` tinyint(4) NOT NULL,
  PRIMARY KEY (`slug`),
  UNIQUE KEY `slug_index` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `sections`
-- ----------------------------
BEGIN;
INSERT INTO `sections` VALUES ('notes', 'Notes', 'My little scrapbook of snippets of code', '2'), ('projects', 'Projects', 'Some of my small personal projects. You can also find a few other bits and \n          peices on my <a class=\"Link\" href=\"#\">GitHub</a> page', '1');
COMMIT;

-- ----------------------------
--  Procedure structure for `sections_and_pages_around`
-- ----------------------------
DROP PROCEDURE IF EXISTS `sections_and_pages_around`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sections_and_pages_around`(IN in_section_slug varchar(255), IN in_page_slug varchar(255))
BEGIN
	SELECT created FROM pages WHERE pages.section_slug = in_section_slug AND pages.slug = in_page_slug INTO @page_created;

	SELECT pages.*, sections.title AS section_title, sections.slug AS section_slug FROM sections 
	LEFT JOIN (
		(SELECT * FROM pages
		WHERE pages.section_slug = in_section_slug
		AND pages.created > @page_created
		ORDER BY pages.created ASC
		LIMIT 3) 
		UNION
		(SELECT * FROM pages
		WHERE pages.section_slug = in_section_slug
		AND pages.created <= @page_created
		ORDER BY pages.created DESC
		LIMIT 7) 
	) AS pages

	ON sections.slug = pages.section_slug
	ORDER BY sections.order, pages.created DESC;
END
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
