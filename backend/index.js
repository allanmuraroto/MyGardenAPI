const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let itens = [];
let idAtual = 1;

app.get('/item', (req,res) => {
	res.json(itens);
});

app.post('/item', (req, res) => {
	const {nome, imagem} = req.body;
	if(!nome || !imagem) return res.status(400).json({erro: "nome e imagem obrigatorios"});

	const novoItem = {id : idAtual++, nome, imagem};
	itens.push(novoItem);
	res.status(201).json(novoItem);
});

app.delete('/item/:id', (req, res) => {
	const id = parseInt(req.params.id);
	item = item.filter(item => item.id !== id);
	res.status(204).end();
});


app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/batata', (req,res) => {
	res.send('pagina da batata');
})

app.get('/biscoito', (req, res) => {
	res.send("pagina do biscoito");
})

app.post('/login', (req, res)  => {
	const {email, senha} = req.body;

	if(!email || !senha)
	{
		return res.status(400).json({mensagem: 'E-mail r senhas não conferem'});
	}
	

	if(email === 'admin@bol.com' && senha === '123456')
	{
		return res.status(200).json({mensagem : 'Login bem sucedido', token: '2222'});
	}
	else
	{
		return res.status(401).json({mensagem : 'Credenciais invalidas'});
	}
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
