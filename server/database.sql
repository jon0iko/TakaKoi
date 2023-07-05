 CREATE DATABASE expense;

--\c expense--

 CREATE TABLE expense(
    id SERIAL PRIMARY KEY,
    amount DECIMAL,
    description VARCHAR(255),
    dateValue VARCHAR(255)
 ); 