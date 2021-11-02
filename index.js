const express = require('express');
const mysql = require('mysql2');
const { isConstructorDeclaration } = require('typescript');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sistema_noticias',
    password: '2904'
});

//CATEGORIAS
app.get('/categorias', (req, res) => {
    connection.query(
        'SELECT id, nome FROM `categoria`',
        function(err, results, fields) {
          res.send(results); 
        }
      );
});

//NOTÍCIAS
app.get('/categorias/:categoriaId/noticias', (req, res) => {
    connection.query(
        'SELECT id, titulo FROM `noticia` WHERE `id` = ' + req.params.categoriaId,
        function(err, results, fields) {
          res.send(results); 
          console.log(err);
        }
      );
});

//NOTÍCIA
app.get('/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {
    connection.query(
        'SELECT id, titulo, conteudo FROM `noticia` WHERE `id_categoria` = ' + req.params.categoriaId + ' AND `id` = ' + req.params.noticiaId,
        function(err, results, fields) {
          res.send(results); 
        }
      );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})