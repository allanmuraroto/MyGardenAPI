import { useEffect, useState } from 'react';

function App() {
  const [item, setItem] = useState([]);
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [nomeCientifico, setNomeCientifico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [origem, setOrigem] = useState('');

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const res = await fetch('http://localhost:3001/item');
    const data = await res.json();
    setItem(data);
  };

  const adicionarItem = async () => {
    if (!nome || !imagem) return alert('Preencha todos os campos');

    const res = await fetch('http://localhost:3001/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, imagem, nomeCientifico, descricao, origem}),
    });

    if (res.ok) {
      setNome('');
      setImagem('');
      setNomeCientifico('');
      setDescricao('');
      setOrigem('');
      fetchItem();
    }
  };

  const removerItem = async (id) => {
    await fetch(`http://localhost:3001/item/${id}`, { method: 'DELETE' });
    fetchItem();
  };

  const editarItem = async (id) => {
    await fetch(`http://localhost:3001/item/${id}`, { method: 'PUT' });
    fetchItem();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastro de Item</h2>

      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="URL da imagem" value={imagem} onChange={e => setImagem(e.target.value)} />
      <input placeholder='nome cientifico' value={nomeCientifico} onChange={e => setNomeCientifico(e.target.value)} />
      <input placeholder='origem/ onde é encontrada' value={origem} onChange={e => setOrigem(e.target.value)} />
      <input placeholder='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />

      
      <button onClick={adicionarItem}>Adicionar</button>

      <hr />

      <h3>Itens Cadastrados</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {item.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <img src={item.imagem} alt={item.nome} style={{ width: '100%' }} />
            <h4>{item.nome}</h4>
            <h4>{item.nomeCientifico}</h4>
            <h4>{item.origem}</h4>
            <h4>{item.descricao}</h4>
            <button style={{ marginRight: '8px' }} onClick={() => editarItem(item.id)}>Editar</button>
            <button onClick={() => removerItem(item.id)}>Remover</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
