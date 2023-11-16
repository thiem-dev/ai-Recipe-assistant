DROP TABLE IF EXISTS person, page, book;

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
    recipe TEXT,
    book_id INT,
    person_id INT,
    FOREIGN KEY (book_id, person_id) REFERENCES book(id, person_id)
);

-- Insert statements
-- Inserting 2 people
INSERT INTO person (username) VALUES ('Alice');
INSERT INTO person (username) VALUES ('Bob');

-- Inserting 3 recipe pages per book for each person
-- Alices Recipe Book 1
INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 1', 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Introduction', 'A brief overview of the topic.', 'Welcome to the culinary world of Alice! Begin your journey with a warm introduction, exploring her passion for cooking and the inspiration behind the delightful recipes.', 1, 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Main Course', 'Delicious recipes for hearty meals.', 'Savor the heartiness of home-cooked meals with Alices Main Course recipes. From comforting classics to innovative dishes, this collection promises to elevate your dining experience and satisfy your cravings.', 1, 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Desserts', 'Sweet treats for any occasion.', 'Indulge your sweet tooth with Alices Desserts. Each recipe is a tempting treat designed to add the perfect finishing touch to any meal or celebration, leaving a lasting impression.', 1, 1);

-- Alices Recipe Book 2
INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 2', 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Starters', 'Appetizing dishes to begin your meal.', 'Kick off your culinary adventure with Alices Starters. These appetizing dishes set the perfect tone for a memorable dining experience, tantalizing your taste buds and leaving you eager for more.', 2, 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Side Dishes', 'Complement your main course with these sides.', 'Elevate your meal with the flavorful Side Dishes from Alices repertoire. Carefully crafted to complement your main course, these dishes add variety and depth to your dining experience.', 2, 1);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Beverages', 'Refreshing drinks for any occasion.', 'Quench your thirst with Alices Beverages. From classic favorites to innovative concoctions, these drink recipes are perfect for any occasion, offering a refreshing and satisfying beverage experience.', 2, 1);

-- Bobs Recipe Book 1
INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 1', 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Introduction', 'Bobs introduction to recipes.', 'Embark on a culinary journey with Bobs Introduction, where he shares the inspiration behind the recipes. Get to know the chef and the stories that shape his approach to cooking, setting the stage for the delicious meals to come.', 3, 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Main Course', 'Bobs hearty meals.', 'Experience the heartiness of Bobs cooking with his Main Course recipes. From savory classics to bold flavors, each dish is crafted to satisfy your appetite and leave you with a memorable dining experience.', 3, 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Desserts', 'Bobs sweet treats.', 'Indulge in the sweet side of Bobs culinary creations with his Desserts. Each sweet treat is a delightful culmination of flavors, providing the perfect ending to a satisfying meal and a glimpse into Bobs sweet creations.', 3, 2);

-- Bobs Recipe Book 2
INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 2', 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Starters', 'Bobs appetizers.', 'Begin your meal on a flavorful note with Bobs Starters. These appetizers are designed to tantalize your taste buds and set the stage for a delicious dining experience, showcasing Bobs culinary expertise.', 4, 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Side Dishes', 'Bobs side dishes.', 'Complement your main course with the delicious Side Dishes from Bobs culinary repertoire. Carefully crafted to add variety and flavor to your meal, these dishes are the perfect accompaniment to Bobs hearty recipes.', 4, 2);
INSERT INTO page (title, description, recipe, book_id, person_id) VALUES ('Bobs Beverages', 'Bobs drinks.', 'Quench your thirst with Bobs Beverages. From refreshing classics to unique concoctions, these drink recipes are perfect for any occasion, offering a delightful and satisfying beverage experience from Bobs kitchen.', 4, 2);
