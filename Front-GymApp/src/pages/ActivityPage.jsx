import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../componentes/ErrorMessage";
import useActivity from "../hooks/activityDefinition";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../Css/Activity.css';


export const ActivityPage = () => {
  const { id } = useParams();
  const {user, token} = useContext(AuthContext)
  const { activity, loading, error, editActivity, isAdmin } = useActivity(id, token, user );
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState({
    activity_name: "",
    description: "",
    image: "",
    typology: "",
    muscle_group: "",
  });

  const typologyList = ["Fuerza", "Resistencia", "Cardio", "Volumen"];
  const muscle_groupList = ["Pecho", "Espalda", "Hombros", "Bíceps", "Tríceps", "Piernas"];

  useEffect(() => {
    if (activity) {
      setActivityData({
        activity_name: activity.activity_name || "",
        description: activity.description || "",
        image: activity.image || "",
        typology: activity.typology || "",
        muscle_group: activity.muscle_group || "",
      });
    }
  }, [activity]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // Maneja el input de tipo 'file' para cargar la imagen
      const file = files[0];
      if (file) {
        setActivityData({
          ...activityData,
          image: file,
        });
      }
    } else {
      setActivityData({
        ...activityData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const data = new FormData(e.target)
    editActivity(id, data, token, user)
    
    navigate('/home')
  };

  if (loading) return <p>Se está cargando la página</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    
    <section className="s-descripcion">
      
      <h1>Descripción de la Actividad</h1>
      
      <form id='general' onSubmit={handleSubmit}>
        <label>
          Nombre de la Actividad:
          <input className="i-nombre"
            type="text"
            name="activity_name"
            value={activityData.activity_name}
            onChange={handleInputChange}
          />
        </label>
        <label className="l-descriptionact">
          Descripción:
          <textarea className="ta-description"
            name="description"
            value={activityData.description}
            onChange={handleInputChange}
          />
        </label>
        <label className="l-imageact">
          Imagen:
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </label>
        <label className="l-typologyact">
          Tipología:
          <select className="s-typologyact"
            name="typology"
            value={activityData.typology}
            onChange={handleInputChange}
          >
            {typologyList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="l-gmuscularact">
          Grupo Muscular:
          <select className="s-gmuscularact"
            name="muscle_group"
            value={activityData.muscle_group}
            onChange={handleInputChange}
          >
            {muscle_groupList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        {isAdmin && ( 
        <button className='boton-editar' type="submit">
          Editar
        </button>)}
      </form>
    </section>
  );
};