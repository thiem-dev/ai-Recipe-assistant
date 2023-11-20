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
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
    UNIQUE (id, person_id)
);

-- contains composite foreign key to keep each page unique to each book and person. Otherwise other users would see/modify each other's pages.
CREATE TABLE page (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    imagelink TEXT,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    book_id INT,
    person_id INT,
    FOREIGN KEY (book_id, person_id) REFERENCES book(id, person_id) ON DELETE CASCADE
);

-- Insert statements
-- Inserting 2 people
INSERT INTO person (username) VALUES ('Alice');
INSERT INTO person (username) VALUES ('Bob');

-- Inserting 3 recipe pages per book for each person
-- Alices Recipe Book 1
INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 1', 1);

-- Alices Recipe Book 2
INSERT INTO book (bk_name, person_id) VALUES ('Alices Recipe Book 2', 1);

-- Bobs Recipe Book 1
INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 1', 2);

-- Bobs Recipe Book 2
INSERT INTO book (bk_name, person_id) VALUES ('Bobs Recipe Book 2', 2);


-- Inserting recipe pages
-- Alices Recipe Book 1
INSERT INTO page (title, imagelink, description, ingredients, instructions, book_id, person_id) 
VALUES 
    ('Homemade Pasta', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Learn to make fresh pasta from scratch', 'Flour, Eggs, Water', 'Mix ingredients, knead, and roll out pasta dough', 1, 1),
    ('Classic Tomato Sauce', 'https://images.unsplash.com/photo-1565086869529-8c7802cca7a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'A simple and delicious tomato sauce for pasta', 'Tomatoes, Garlic, Olive Oil', 'Simmer tomatoes and garlic in olive oil', 1, 1),
    ('Grilled Chicken Salad', 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fHww', 'Healthy and flavorful salad with grilled chicken', 'Chicken, Lettuce, Tomatoes', 'Grill chicken and toss with fresh vegetables', 1, 1),
    ('Chocolate Chip Cookies', 'https://images.unsplash.com/photo-1593231060852-5f040ae7df82?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Classic chocolate chip cookies for sweet cravings', 'Flour, Butter, Chocolate Chips', 'Mix dough, drop spoonfuls onto baking sheet, and bake', 1, 1),
    ('Vegetarian Stir Fry', 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Quick and easy stir fry with tofu and vegetables', 'Tofu, Broccoli, Soy Sauce', 'Stir fry tofu and vegetables in soy sauce', 1, 1),
    ('Fruit Smoothie Bowl', 'https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'A refreshing and nutritious fruit smoothie bowl', 'Mixed Berries, Yogurt, Granola', 'Blend berries and yogurt, top with granola', 1, 1),
    ('Lemon Garlic Shrimp', 'https://images.unsplash.com/photo-1595117796900-e3bb784ea0db?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Delicious shrimp dish with zesty lemon and garlic', 'Shrimp, Lemon, Garlic', 'Sauté shrimp with lemon and garlic', 1, 1);

-- Alices Recipe Book 2
INSERT INTO page (title, imageLink, description, ingredients, instructions, book_id, person_id) 
VALUES 
    ('Healthy Green Smoothie', 'https://source.unsplash.com/8', 'A nutritious green smoothie for a boost of energy', 'Spinach, Banana, Almond Milk', 'Blend all ingredients until smooth', 2, 1),
    ('Quinoa Salad', 'https://source.unsplash.com/9', 'Refreshing salad with quinoa and fresh vegetables', 'Quinoa, Cucumber, Cherry Tomatoes', 'Cook quinoa and toss with chopped vegetables', 2, 1),
    ('Stuffed Bell Peppers', 'https://source.unsplash.com/10', 'Colorful bell peppers stuffed with ground turkey and rice', 'Bell Peppers, Ground Turkey, Rice', 'Stuff peppers with ground turkey and rice mixture', 2, 1),
    ('Baked Zucchini Fries', 'https://source.unsplash.com/11', 'Healthy alternative to traditional fries with baked zucchini', 'Zucchini, Bread Crumbs, Parmesan', 'Coat zucchini in bread crumbs and bake until crispy', 2, 1),
    ('Chia Seed Pudding', 'https://source.unsplash.com/12', 'Simple and nutritious chia seed pudding', 'Chia Seeds, Almond Milk, Honey', 'Mix chia seeds with almond milk, sweeten with honey, and refrigerate', 2, 1),
    ('Eggplant Parmesan', 'https://source.unsplash.com/13', 'Classic Italian dish with layers of eggplant and melted cheese', 'Eggplant, Tomato Sauce, Mozzarella', 'Layer eggplant with sauce and cheese, bake until golden', 2, 1),
    ('Vegetable Stir Fry', 'https://source.unsplash.com/14', 'Quick and flavorful stir fry with a variety of vegetables', 'Broccoli, Bell Peppers, Carrots', 'Sauté vegetables in soy sauce and ginger', 2, 1);
    
-- Bobs Recipe Book 1
INSERT INTO page (title, imageLink, description, ingredients, instructions, book_id, person_id) 
VALUES 
    ('Grilled Salmon', 'https://source.unsplash.com/15', 'Flavorful grilled salmon with herbs and lemon', 'Salmon, Lemon, Dill', 'Marinate salmon, grill until cooked through', 3, 2),
    ('Homestyle Meatloaf', 'https://source.unsplash.com/16', 'Classic meatloaf with a savory glaze', 'Ground Beef, Bread Crumbs, Ketchup', 'Mix ingredients, shape into a loaf, bake with ketchup glaze', 3, 2),
    ('Shrimp Scampi Pasta', 'https://source.unsplash.com/17', 'Garlicky shrimp served over a bed of pasta', 'Shrimp, Garlic, Linguine', 'Sauté shrimp in garlic butter, toss with cooked linguine', 3, 2),
    ('Cauliflower Pizza Crust', 'https://source.unsplash.com/18', 'Low-carb pizza crust made with cauliflower', 'Cauliflower, Cheese, Eggs', 'Rice cauliflower, mix with cheese and eggs, bake into a crust', 3, 2),
    ('Greek Salad', 'https://source.unsplash.com/19', 'Fresh and vibrant salad with Greek flavors', 'Cucumbers, Feta, Kalamata Olives', 'Toss ingredients in olive oil, top with feta and olives', 3, 2),
    ('Pesto Chicken Skewers', 'https://source.unsplash.com/20', 'Grilled chicken skewers with basil pesto marinade', 'Chicken, Pesto, Cherry Tomatoes', 'Marinate chicken in pesto, skewer with tomatoes, and grill', 3, 2),
    ('Beef and Broccoli Stir Fry', 'https://source.unsplash.com/21', 'Savory stir fry with beef and broccoli in a soy-based sauce', 'Beef, Broccoli, Soy Sauce', 'Sauté beef and broccoli in soy sauce and ginger', 3, 2);
