import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../componentes/ErrorMessage";
import useActivity from "../hooks/activityDefinition";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ActivityPage = () => {
  const { id } = useParams();
  const {token} = useContext(AuthContext)
  const { activity, loading, error, editActivity } = useActivity(id, token);
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
    editActivity(id, data, token)
    
    navigate('/home')
  };

  if (loading) return <p>Se está cargando la página</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Descripción de la Actividad</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la Actividad:
          <input
            type="text"
            name="activity_name"
            value={activityData.activity_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Imagen:
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tipología:
          <select
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
        <label>
          Grupo Muscular:
          <select
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
        <button id="Boton-editar" type="submit">
          Editar
        </button>
      </form>
    </section>
  );
};