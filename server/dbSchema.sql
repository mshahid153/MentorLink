CREATE DATABASE mentor_details;
USE mentor_details;

CREATE TABLE mentor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    availability VARCHAR(255) NOT NULL,
    isPremium BOOLEAN NOT NULL,
    areaOfExpertise VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    rating INT NOT NULL,
);