CREATE DATABASE `test`;
USE `test`;

CREATE TABLE `user` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`user_login_id` VARCHAR(50) NOT NULL,
	`user_password` VARCHAR(1000) NOT NULL,
	`user_name` VARCHAR(100) NOT NULL DEFAULT '',
	UNIQUE INDEX `user_login_id` (`user_login_id`),
	PRIMARY KEY (`user_id`)
)
COLLATE='utf8mb4_general_ci';

CREATE TABLE `course` (
	`course_id` INT NOT NULL AUTO_INCREMENT,
	`course_name` VARCHAR(100) NOT NULL DEFAULT '',
	`course_latitude` VARCHAR(1000) NOT NULL DEFAULT '',
	`course_longitude` VARCHAR(1000) NOT NULL DEFAULT '',
	`course_qr` VARCHAR(1000) NOT NULL DEFAULT '',
	PRIMARY KEY (`course_id`)
)
COLLATE='utf8mb4_general_ci';

CREATE TABLE `user_course` (
	`user_course_id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INtestT NOT NULL,
	`course_id` INT NOT NULL,
	PRIMARY KEY (`user_course_id`),
	CONSTRAINT `FK__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT `FK__course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci';


INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('영진', '35.87555082502176', '128.6816374505427', 'YUNGJIN');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('국밥집', '35.87583123506328', '128.6817532073904', 'GUKBOB');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('제주흑돈', '35.87664030121222', '128.68155341448463', 'JEJUPIG');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('용계역', '35.87623769570281', '128.68104555230227', 'SUBWAY2');