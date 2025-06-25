const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();



const SECRET_KEY = '1234567';
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

const checkAuth = (req, res, next) => {
	const safeMethods = ['GET'];
	if (safeMethods.includes(req.method)) return next();
  
	const token = req.headers['x-api-key'];
	if (token !== SECRET_KEY) {
	  return res.status(403).json({ error: 'Acesso negado' });
	}
	next();
  };
  
app.use(checkAuth);
app.use(cors());
app.use(express.json());

let idAtual = 1;

app.get('/item', async (req,res) => {
	const itens = await lerDados();
	res.json(itens);
});



app.get('/item/:id', async (req, res) => {
	const id = Number(req.params.id);
	const itens = await lerDados();      // <– data.json deve ser um ARRAY direto
	const item  = itens.find(p => p.id === id);
  
	if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
	res.json(item);
  });

/* app.post('/item', (req, res) => {
	const nova = req.body;

	// Carrega os dados atuais
	let suculentas = require('./data.json');

	// Define ID automático
	nova.id = suculentas.length ? suculentas[suculentas.length - 1].id + 1 : 1;

	// Adiciona e salva
	suculentas.push(nova);
	fs.writeFileSync('./data.json', JSON.stringify(suculentas, null, 2));
	

	res.status(201).json({ message: 'Suculenta cadastrada com sucesso!', nova });
}); */

app.put('/item/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const atualizada = req.body;
	const suculentas = await lerDados();
  
	const index = suculentas.findIndex(s => s.id === id);
	if (index === -1) return res.status(404).json({ error: 'Não encontrada' });
  
	suculentas[index] = { ...suculentas[index], ...atualizada };
  
	await salvarDados(suculentas);
	res.json({ message: 'Atualizada com sucesso!', suculenta: suculentas[index] });
  });


/* app.put('/item/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	let itens = await lerDados();
  
	const index = itens.findIndex(item => item.id === id);
	if (index === -1) return res.status(404).json({ erro: 'Item não encontrado' });
  
	itens[index] = { ...itens[index], ...req.body, id }; // preserva o ID original
  
	await salvarDados(itens);
	res.status(200).json(itens[index]);
  }); */

app.post('/item', async (req, res) => {
	const {nome, imagem, nomeCientifico, origem, descricao, propagacao, exposicao, rega} = req.body;
	if(!nome || !imagem || !nomeCientifico || !origem || !descricao || !propagacao || !exposicao || !rega) return res.status(400).json({erro: "nome e imagem obrigatorios"});

	const novoItem = { id: Date.now(), nome, imagem, nomeCientifico, origem, descricao, propagacao, exposicao, rega };
	const itens = await lerDados(); // garante que vai ler os dados reais do arquivo
	itens.push(novoItem);
	await salvarDados(itens);
	res.status(201).json(novoItem);
	});


app.delete('/item/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const suculentas = await lerDados();
  
	const index = suculentas.findIndex(s => s.id === id);
	if (index === -1) return res.status(404).json({ error: 'Não encontrada' });
  
	const removida = suculentas.splice(index, 1);
	await salvarDados(suculentas);
  
	res.json({ message: 'Removida com sucesso', removida });
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


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
