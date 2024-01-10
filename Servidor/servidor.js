const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 10000;

// Configuração do CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rennan@hd339',
  database: 'desafio_rennan',
});

app.use(express.json());

app.get('/resultados', (req, res) => {
  connection.query('SELECT * FROM Resultado', (err, results) => {
    if (err) {
      console.error('Erro ao obter resultados:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(results);
    }
  });
});

app.post('/resultados', (req, res) => {
  const { bimestre, disciplina, nota } = req.body;

  if (nota < 0 || nota > 10) {
    res.status(400).json({ error: 'Nota inválida' });
    return;
  }

  connection.query(
    'INSERT INTO Resultado (bimestre, disciplina, nota) VALUES (?, ?, ?)',
    [bimestre, disciplina, nota],
    (err, results) => {
      if (err) {
        console.error('Erro ao criar resultado:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.status(201).json({ id: results.insertId });
      }
    }
  );
});

app.delete('/resultados/:id', (req, res) => {
  const resultadoId = req.params.id;

  connection.query('DELETE FROM Resultado WHERE id = ?', [resultadoId], (err, results) => {
    if (err) {
      console.error('Erro ao excluir resultado:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Resultado não encontrado' });
      } else {
        res.status(204).end();
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
