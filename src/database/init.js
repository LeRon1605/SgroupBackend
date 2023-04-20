import connection from './connection.js';

const queryString = `
    CREATE DATABASE IF NOT EXISTS SGROUPBACKEND;
    USE SGROUPBACKEND;
    CREATE TABLE USERS
    (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        GENDER TINYINT,
        FULLNAME VARCHAR(255),
        AGE INT,
        PASSWORD VARCHAR(30),
        CHECK (AGE > 0)   
    );
`;

connection.query(queryString, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Sucessfully create new database');
    }
});