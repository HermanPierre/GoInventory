CREATE DATABASE goinventory;

USE goinventory;

-- Créer la table des catégories
CREATE TABLE categories
(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL
);

-- Créer la table des produits
CREATE TABLE products
(
    product_id  INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    quantity    INT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

-- Insérer quelques catégories par défaut
INSERT INTO categories (name)
VALUES ('Electronique'),
       ('Vetements'),
       ('Alimentation'),
       ('Mobilier');

-- Exemple d'insertion de produit
INSERT INTO products (name, description, category_id, quantity)
VALUES ('Televiseur LED 55 pouces', 'Televiseur LED Full HD avec Smart TV integree', 1, 10),
       ('Chemise en coton', 'Chemise a manches longues pour hommes', 2, 50),
       ('Pommes Granny Smith', 'Pommes vertes fraiches', 3, 100),
       ('Canape en cuir', 'Canape trois places en cuir veritable', 4, 5);

