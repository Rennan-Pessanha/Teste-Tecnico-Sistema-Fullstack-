

const mysql = require('mysql2');


const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Rennan@hd339',
};

const databaseName = 'desafio_rennan';

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName};`;
const useDatabaseQuery = `USE ${databaseName};`;


const createTableQuery = `
CREATE TABLE Resultado (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bimestre ENUM('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO') NOT NULL,
  disciplina ENUM('Biologia', 'Artes', 'Geografia', 'Sociologia') NOT NULL,
  nota FLOAT NOT NULL,
  criadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
  atualizadoEm DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

  
`;


const connection = mysql.createConnection(connectionConfig);


connection.query(createDatabaseQuery, (err, results) => {
  if (err) {
    console.error('Erro ao criar o banco de dados:', err);
    connection.end();
    return;
  }

 
  connection.query(useDatabaseQuery, (err, results) => {
    if (err) {
      console.error('Erro ao selecionar o banco de dados:', err);
      connection.end();
      return;
    }


    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Erro ao criar a tabela:', err);
      } else {
        console.log('Banco de dados e tabela criados com sucesso!');
      }

      connection.end();
    });
  });
});
