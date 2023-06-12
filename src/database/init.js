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
        FORGET_PASSWORD_TOKEN VARCHAR(255),
        FORGET_PASSWORD_TOKEN_EXPIRATION DATETIME,
        CHECK (AGE > 0)   
    );

    CREATE TABLE POLLS(
        ID INT PRIMARY KEY,
        NAME NVARCHAR(256),
        DESCRIPTION NVARCHAR(256),
        QUESTION NVARCHAR(256)
    );
    
    CREATE TABLE OPTIONS(
        ID INT PRIMARY KEY,
        TITLE NVARCHAR(256),
        POLLID INT,
        CONSTRAINT  fk_poll_option FOREIGN KEY (POLLID) REFERENCES POLLS(ID)
    );
    
    CREATE TABLE USER_OPTIONS(
        USERID INT,
        OPTIONID INT,
        PRIMARY KEY(USERID, OPTIONID),
        
        CONSTRAINT  fk_user_option FOREIGN KEY (USERID) REFERENCES USERS(ID),
        CONSTRAINT  fk_option_option FOREIGN KEY (OPTIONID) REFERENCES OPTIONS(ID)
    );
`;

connection.raw(queryString).then(() => {
    console.log('Init database successfully!!');
}).catch(error => {
    console.log('Init database failed!!');
});