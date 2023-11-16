-- DROP TABLE IF EXISTS person, page, book;

-- Create tables
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR
);

CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    bk_name VARCHAR,
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id),
    UNIQUE (id, person_id)
);

-- contains composite foreign key to keep each page unique to each book and person. Otherwise other users would see/modify each other's pages.
CREATE TABLE page (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    description TEXT,
    book_id INT,
    person_id INT,
    FOREIGN KEY (book_id, person_id) REFERENCES book(id, person_id)
);

-- Insert statements
-- Inserting 2 people
INSERT INTO person (username) VALUES ('Alice');
INSERT INTO person (username) VALUES ('Bob');

-- Inserting 3 recipe pages per book for each person
INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 1', 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Introduction', 'A brief overview of the topic.', 1, 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Main Course', 'Delicious recipes for hearty meals.', 1, 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Desserts', 'Sweet treats for any occasion.', 1, 1);

INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 2', 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Starters', 'Appetizing dishes to begin your meal.', 2, 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Side Dishes', 'Complement your main course with these sides.', 2, 1);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Beverages', 'Refreshing drinks for any occasion.', 2, 1);

INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 1', 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Introduction', 'Bobs introduction to recipes.', 3, 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Main Course', 'Bobs hearty meals.', 3, 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Desserts', 'Bobs sweet treats.', 3, 2);

INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 2', 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Starters', 'Bobs appetizers.', 4, 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Side Dishes', 'Bobs side dishes.', 4, 2);
INSERT INTO page (title, description, book_id, person_id) VALUES ('Bobs Beverages', 'Bobs drinks.', 4, 2);