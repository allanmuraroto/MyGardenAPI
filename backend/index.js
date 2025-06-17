const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

//-------------- arquivo data json ----------------

const caminhoArquivo = path.join(__dirname, 'data.json');

async function lerDados() {
  const conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
  return JSON.parse(conteudo);
}

async function salvarDados(dados) {
  await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
}

//-------------- fim arquivo data json ----------------

app.use(cors());
app.use(express.json());

let idAtual = 1;

app.get('/item', async (req,res) => {
	const itens = await lerDados();
	res.json(itens);
});

app.post('/item', async (req, res) => {
	const {nome, imagem, nomeCientifico, origem, descricao} = req.body;
	if(!nome || !imagem || !nomeCientifico || !origem || !descricao) return res.status(400).json({erro: "nome e imagem obrigatorios"});

	const novoItem = { id: Date.now(), nome, imagem, nomeCientifico, origem, descricao };
	const itens = await lerDados(); // garante que vai ler os dados reais do arquivo
	itens.push(novoItem);
	await salvarDados(itens);
	res.status(201).json(novoItem);
	});

app.delete('/item/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	let itens = await lerDados();

	itens = itens.filter(item => item.id !== id);
	await salvarDados(itens);
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
