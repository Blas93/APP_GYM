import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import upload from '../svg/upload-svgrepo-com.svg';
import añadir from '../svg/Añadir.svg';
import '../Css/AddActivity.css';
//import { useNavigate } from "react-router-dom";

export const AddActivity = ({ addActivity }) => {
  const initialState = {
    nombre: '',
    descripcion: '',
    tipologia: '',
    grupoMuscular: '',
    image: null,
    imagePreview: null,
  };

  const [formValues, setFormValues] = useState(initialState);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const resetForm = () => {
    setFormValues(initialState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      await addActivity(data, token);
      resetForm(); // Restablecer los valores del formulario
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteImage = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, image: null, imagePreview: null });
    // Reset el input file
    document.querySelector('.input-file').value = '';
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setShowAdd(!showAdd);
  };

  return (
    <div className='cuadro-formulario'>
      <h1 className='t-h1' onClick={handleEdit}>
        <img id='Añadir' src={añadir} alt='Añadir' title='Añadir actividad' />
      </h1>
      {showAdd && (
        <form id='card' onSubmit={handleSubmit}>
          <button type='submit' id='agregar'>
            Agregar
          </button>

          <input
            type='text'
            placeholder='Nombre'
            value={formValues.nombre}
            name='name'
            onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
          />
          <input
            type='text'
            placeholder='Descripción'
            value={formValues.descripcion}
            name='description'
            onChange={(e) => setFormValues({ ...formValues, descripcion: e.target.value })}
          />

          <select
            className='t-select'
            placeholder='Tipología'
            value={formValues.tipologia}
            name='typology'
            onChange={(e) => setFormValues({ ...formValues, tipologia: e.target.value })}
          >
            <option value=''>Selecciona una tipología</option>
            <option value='Fuerza'>Fuerza</option>
            <option value='Resistencia'>Resistencia</option>
            <option value='Cardio'>Cardio</option>
            <option value='Volumen'>Volumen</option>
          </select>
          <select
            className='gm-select'
            placeholder='Grupo Muscular'
            value={formValues.grupoMuscular}
            name='muscleGroup'
            onChange={(e) => setFormValues({ ...formValues, grupoMuscular: e.target.value })}
          >
            <option value=''>Selecciona un grupo muscular</option>
            <option value='Pecho'>Pecho</option>
            <option value='Espalda'>Espalda</option>
            <option value='Hombros'>Hombros</option>
            <option value='Bíceps'>Bíceps</option>
            <option value='Tríceps'>Tríceps</option>
            <option value='Piernas'>Piernas</option>
          </select>

          <label>
            <input
              type='file'
              name='image'
              accept='image/*'
              className='input-file'
              onChange={(e) => {
                const file = e.target.files[0];
                setFormValues({
                  ...formValues,
                  image: file,
                  imagePreview: URL.createObjectURL(file),
                });
              }}
            />
            {!formValues.image ? (
              <figure>
                <img id='subida' src={upload} alt='Select' title='Select image' />
              </figure>
            ) : (
              <figure>
                <img src={formValues.imagePreview} alt='Preview' onClick={handleDeleteImage} />
                <figcaption>Preview</figcaption>
              </figure>
            )}
          </label>
        </form>
      )}
    </div>
  );
};
