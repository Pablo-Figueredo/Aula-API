import express from 'express'; 
import conectaDB from './config/dbConnect.js';

const conexao = await conectaDB();

conexao.on('error', (erro) => {
    console.error('Erro na conexão com o banco de dados:', erro);
});

conexao.once('open', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: 'Senhor dos Anéis',
    },
    {
        id: 2,
        titulo: 'O Hobbit',
    },
]

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

app.get('/', (req, res) => {
    res.status(200).send('Curso de node js');
})

app.get('/Livros', (req, res) => {
    res.status(200).json(livros);
})

app.get('/Livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);

});

app.post("/Livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send('Livro adicionado com sucesso');
});

app.put("/Livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete("/Livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send('Livro removido com sucesso');
});

export default app;

