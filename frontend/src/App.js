// App.js (completo) com suporte a detalhes por ID via rota

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function ListaPlantas() {
  const [item, setItem] = useState([]);
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [nomeCientifico, setNomeCientifico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [origem, setOrigem] = useState('');
  const [propagacao, setPropagacao] = useState('');
  const [exposicao, setExposicao] = useState('');
  const [rega, setRega] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  

  useEffect(() => {
    fetchItem();
  }, []);
  

  const fetchItem = async () => {
    const res = await fetch('http://localhost:3001/item');
    const data = await res.json();
    setItem(data);
  };

 const adicionarItem = async () => {
  if (!nome || !imagem) {
    return alert('Preencha todos os campos');
  }

  const dados = { nome, imagem, nomeCientifico, descricao, origem, propagacao, exposicao, rega };

  try {
    if (editandoId !== null) {
      // Atualizar item existente
      await fetch(`http://localhost:3001/item/${editandoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1234567'
        },
        body: JSON.stringify(dados),
      });
    } else {
      // Cadastrar novo item
      await fetch('http://localhost:3001/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1234567'
        },
        body: JSON.stringify(dados),
      });
    }

    // Limpar o formulário
    setNome('');
    setImagem('');
    setNomeCientifico('');
    setDescricao('');
    setOrigem('');
    setPropagacao('');
    setExposicao('');
    setRega('');
    setEditandoId(null);
    fetchItem();

  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    alert('Erro ao salvar a suculenta. Verifique a conexão com o servidor.');
  }
};

  const removerItem = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/item/${id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': '1234567'
        }
      });
  
      if (!resposta.ok) {
        const erro = await resposta.json();
        console.error('Erro ao deletar:', erro);
        return;
      }
  
      console.log('Item deletado com sucesso');
      fetchItem(); // atualiza a lista
    } catch (err) {
      console.error('Erro na conexão com o backend:', err);
    }
  };
  

  const editarItem = (item) => {
    setEditandoId(item.id);
    setNome(item.nome); setImagem(item.imagem);
    setNomeCientifico(item.nomeCientifico); setDescricao(item.descricao);
    setOrigem(item.origem); setPropagacao(item.propagacao);
    setExposicao(item.exposicao); setRega(item.rega);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>🌵 MyGardenAPI – Catálogo de Suculentas</h1>
      <h2>Cadastro de Item</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} /><br />
      <input placeholder="URL da imagem" value={imagem} onChange={e => setImagem(e.target.value)} /><br />
      <input placeholder='nome cientifico' value={nomeCientifico} onChange={e => setNomeCientifico(e.target.value)} /><br />
      <input placeholder='origem/ onde é encontrada' value={origem} onChange={e => setOrigem(e.target.value)} /><br />
      <input placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} /><br />
      <input placeholder='propagação' value={propagacao} onChange={e => setPropagacao(e.target.value)} /><br />
      <input placeholder='exposição solar' value={exposicao} onChange={e => setExposicao(e.target.value)} /><br />
      <input placeholder='rega' value={rega} onChange={e => setRega(e.target.value)} /><br /><br />
      <button onClick={adicionarItem}>{editandoId ? 'Salvar Edição' : 'Adicionar'}</button>
      <hr />
      <h3>Itens Cadastrados</h3>
      {item.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {item.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
              <img src={item.imagem} alt={item.nome} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
              <h4>{item.nome}</h4>
              <h4><i>{item.nomeCientifico}</i></h4>
              <p>{item.origem}</p>
              <p>{item.descricao}</p>
              <p><b>Propagação:</b> {item.propagacao}</p>
              <p><b>Exposição:</b> {item.exposicao}</p>
              <p><b>Rega:</b> {item.rega}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: 10 }}>
                <button style={{height: '30px', marginTop: 10, backgroundColor: '#3A3A', border: 'none', color: 'white' }} onClick={() => editarItem(item)}>Editar</button>
                <button style={{height: '30px', marginTop: 10, backgroundColor: '#FF5555', border: 'none', color: 'white' }} onClick={() => removerItem(item.id)}>Remover</button>
                <Link to={`/item/${item.id}`}><button style={{height: '30px', marginTop: 10, backgroundColor: '#0079aa', border: 'none', color: 'white' }} >+Informação</button></Link>
              </div>
            </div>
          ))}
        </div>
      ) : (<p>Nenhum item cadastrado ainda.</p>)}
    </div>
  );
}

function ItemDetalhes() {
  const { id } = useParams();
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/item/${id}`)
      .then(r => r.json())
      .then(setPlanta);
  }, [id]);

  if (!planta) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ Voltar</Link>
      <h2>{planta.nome}</h2>
      <img src={planta.imagem} alt={planta.nome} width={300} />
      <p><b>Nome Científico:</b> {planta.nomeCientifico}</p>
      <p><b>Origem:</b> {planta.origem}</p>
      <p><b>Descrição:</b> {planta.descricao}</p>
      <p><b>Propagação:</b> {planta.propagacao}</p>
      <p><b>Exposição:</b> {planta.exposicao}</p>
      <p><b>Rega:</b> {planta.rega}</p>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaPlantas />} />
        <Route path="/item/:id" element={<ItemDetalhes />} />
      </Routes>
    </Router>
  );
}
