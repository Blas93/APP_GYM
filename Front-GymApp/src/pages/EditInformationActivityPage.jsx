import { useState } from 'react';
import '../Css/EditInformationActivityPage.css'


export const EditInformationActivityPage = (props) => {
const [publicaciones, setPublicaciones] = useState([]);
const [idEditar, setIdEditar] = useState('');
const [nuevoContenido, setNuevoContenido] = useState('');

const editarPublicacion = () => {
if (idEditar === '' || nuevoContenido.trim() === '') return;

const nuevasPublicaciones = publicaciones.map((publicacion) =>
publicacion.id === idEditar ? { ...publicacion, contenido: nuevoContenido } : publicacion
);

setPublicaciones(nuevasPublicaciones);
setIdEditar('');
setNuevoContenido('');
};

return (
<div>
   <h1>Editar Publicacion</h1>
    <button className='b-guardar' onClick={editarPublicacion}>Guardar</button>
    <ul>
    {publicaciones.map((publicacion) => (
        <li key={publicacion.id}>
          {publicacion.id === idEditar ? (
            <div>
              <input
                type="text"
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
              />
            </div>
          ) : (
            <div>
              {publicacion.contenido}
              <button className='b-editar' onClick={() => setIdEditar(publicacion.id)}>Editar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);
} 