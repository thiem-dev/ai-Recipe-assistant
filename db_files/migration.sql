DROP TABLE IF EXISTS person;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR
);

INSERT INTO person (username) VALUES 
('tim'),
('tommy');