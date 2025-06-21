import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ItemDetalhes() {
  const { id } = useParams();
  const [planta, setPlanta] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/item/${id}`)
      .then(r => r.json())
      .then(setPlanta);
  }, [id]);

  if (!planta) return <p>Carregando…</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Voltar</Link>
      <h2>{planta.nome}</h2>
      <img src={planta.imagem} alt={planta.nome} width={300} />
      <p><b>Nome científico:</b> {planta.nomeCientifico}</p>
      <p><b>Origem:</b> {planta.origem}</p>
      <p><b>Descrição:</b> {planta.descricao}</p>
      <p><b>Propagação:</b> {planta.propagacao}</p>
      <p><b>Exposição:</b> {planta.exposicao}</p>
      <p><b>Rega:</b> {planta.rega}</p>
    </div>
  );
}
