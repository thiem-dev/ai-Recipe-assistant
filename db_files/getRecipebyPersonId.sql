SELECT
    -- person.id AS person_id,
    person.username,
    -- book.id AS book_id,
    book.bk_name,
    -- page.id AS recipe_id,
    page.title,
    page.description,
    page.recipe
FROM
    person
JOIN
    book ON person.id = book.person_id
JOIN
    page ON book.id = page.book_id AND person.id = page.person_id
WHERE
    person.id = 1 AND book.id = 1;