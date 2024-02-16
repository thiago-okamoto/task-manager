CREATE DATABASE IF NOT EXISTS `task_manager_db`;
USE task_manager_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(3),
    user_id int,
    type VARCHAR(10),
    priority int,
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    raw_password VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    created_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);