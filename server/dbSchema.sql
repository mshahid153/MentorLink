CREATE DATABASE mentor_details;
USE mentor_details;

CREATE TABLE mentor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    availability VARCHAR(255) NOT NULL,
    is_premium BOOLEAN NOT NULL,
    area_of_expertise VARCHAR(255) NOT NULL,
    experience INT NOT NULL
);