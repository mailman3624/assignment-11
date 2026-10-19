CREATE DATABASE IF NOT EXISTS myshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE myshop;

DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS type;

CREATE TABLE type (
    typeId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE menu (
    menuId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    isBestSeller BOOLEAN NOT NULL DEFAULT FALSE,
    typeId INT NOT NULL,
    INDEX type_idx (typeId),
    CONSTRAINT fk_menu_type FOREIGN KEY (typeId) REFERENCES type(typeId) ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO type (name) VALUES
('Bakery'),
('Beverage'),
('Dessert'),
('Main Dish');

INSERT INTO menu (name, price, isBestSeller, typeId) VALUES
('Cake', 35, TRUE, 1),
('Bread', 25, FALSE, 1),
('Milk', 15, TRUE, 2),
('Donut', 45, FALSE, 1),
('Cookie', 55, TRUE, 3),
('Green Tea', 40, TRUE, 2),
('Ice Cream', 30, FALSE, 3);
