import '../Css/Likes.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LikePage = ({publicacionesWithLike}) => {
  const [publicaciones, setPublicaciones] = useState(publicacionesWithLike);
  const [idLike, setIdLike] = useState('');

  const LikePublicacion = () => {
    if (idLike === '') {
      return;
    }

    const nuevasPublicaciones = publicaciones.filter(
      (publicacion) => publicacion.id !== idLike
    );
    setPublicaciones(nuevasPublicaciones);
    setIdLike('');
  };

  return (
    <div>
      <h1>Favoritos</h1>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id}>
            {publicacion.contenido}
            
          </li>
        ))}
      </ul>
      <div>
        
        <input
          type="icon"
          value={idLike}
          onChange={(e) => setIdLike(e.target.value)}
        />
        <button className='b-añadir'>Añadir a Favoritos</button>
        
      </div>
    </div>
  );
}
