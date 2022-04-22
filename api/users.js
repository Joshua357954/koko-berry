const mysql=require("mysql")



let pool= mysql.createPool({
	connectionLimit:12,
	host:"sql4.freemysqlhosting.net",
	user:"sql4487046",
	password:"4m5VdgHYhZ",
	database:"sql4487046"
})

// sql4487046
let sessionConfig=({
	host:"sql4.freemysqlhosting.net",
	user:"sql4487046",
	password:"4m5VdgHYhZ",
	database:"sql4487046"
})


// CREATE TABLE Country
// (
// Pk_Country_Id INT IDENTITY PRIMARY KEY,
// Name VARCHAR(100),
// Officiallang VARCHAR(100),
// Size INT(11),
// )


// CREATE TABLE UNrepresentative
// (
// Pk_UNrepresentative_Id INT PRIMARY KEY,
// Name VARCHAR(100),
// Gender VARCHAR(100),
// Fk_Country_Id INT UNIQUE FOREIGN KEY REFERENCES Country(Pk_Country_Id)
// );


// CREATE TABLE  users (
//   id VARCHAR(100) NOT NULL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL,
//   password VARCHAR(100) NOT NULL,
//   date VARCHAR(100) NOT NULL,
// ) ENGINE = InnoDB;

// CREATE TABLE messages (
//   id VARCHAR(200) NOT NULL  PRIMARY KEY,
//   name VARCHAR(200)  NOT NULL,
//   time VARCHAR(200)  NOT NULL,
//   message VARCHAR(200)  NOT NULL,
//   tags VARCHAR(200)  NOT NULL,
//   user_id VARCHAR(100) NOT NULL,
//   CONSTRAINT `message_id`
//     FOREIGN KEY (user_id) REFERENCES users (id)
//     ON DELETE CASCADE
//     ON UPDATE RESTRICT
// ) ENGINE = InnoDB;







// CREATE TABLE author (
//   id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL
// ) ENGINE = InnoDB;

// CREATE TABLE book (
//   id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(200) NOT NULL,
//   author_id SMALLINT UNSIGNED NOT NULL,
//   CONSTRAINT `fk_book_author`
//     FOREIGN KEY (author_id) REFERENCES author (id)
//     ON DELETE CASCADE
//     ON UPDATE RESTRICT
// ) ENGINE = InnoDB;


// INSERT INTO Country ('Name','Officiallang',’Size’)
// VALUES ('South Africa','English',1,219,912);

// INSERT INTO UNrepresentative ('Pk_Unrepresentative_Id','Name','Gender','Fk_Country_Id')
// VALUES (51,'Abubakar Ahmad','Male',1);








module.exports={pool:pool,sessionConfig:sessionConfig}




