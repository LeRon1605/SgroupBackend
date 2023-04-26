import connection from './connection.js';

const queryString = `
    CREATE DATABASE IF NOT EXISTS SGROUPBACKEND;
    USE SGROUPBACKEND;
    CREATE TABLE USERS
    (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        GENDER TINYINT,
        NAME VARCHAR(255),
        USERNAME VARCHAR(30),
        AGE INT,
        PASSWORD VARCHAR(255),
        EMAIL NVARCHAR(255),
        SALT VARCHAR(255),
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