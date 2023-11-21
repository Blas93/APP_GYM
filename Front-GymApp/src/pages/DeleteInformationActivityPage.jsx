import '../Css/DeleteInformationActivityPage.css';
import { useState } from 'react';

export const DeleteInformationActivityPage = ({publicacionesToDelete }) => {
  const [publicaciones, setPublicaciones] = useState(publicacionesToDelete);
  const [idEliminar, setIdEliminar] = useState('');

  const eliminarPublicacion = () => {
    if (idEliminar === '') {
      return;
    }

    const nuevasPublicaciones = publicaciones.filter(
      (publicacion) => publicacion.id !== idEliminar
    );
    setPublicaciones(nuevasPublicaciones);
    setIdEliminar('');
  };

  return (
    <div>
      <h1>Eliminar Publicaciones</h1>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id}>
            {publicacion.contenido}
            
          </li>
        ))}
      </ul>
      <div>
        
        <input
          type="text"
          value={idEliminar}
          onChange={(e) => setIdEliminar(e.target.value)}
        />
        <button className='b-eliminar' onClick={eliminarPublicacion}>Eliminar</button>
      </div>
    </div>
  );
}
