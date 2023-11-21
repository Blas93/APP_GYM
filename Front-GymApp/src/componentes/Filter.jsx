import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialTypology = searchParams.get("typology") || "";
    const initialMuscle_group = searchParams.get("muscle_group") || "";

    const [typology,setTypology ] = useState(initialTypology);
    const [muscle_group, setMuscle_group] = useState(initialMuscle_group);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSearchParams = {};

        if (typology) {
          newSearchParams.typology = typology;
        }

        if (muscle_group) {
          newSearchParams.muscle_group = muscle_group;
        }

        setSearchParams(new URLSearchParams(newSearchParams));
    }
    return(
        <form className="Filtro" method="get" onSubmit={handleSubmit} >
        <label htmlFor="grupoMuscular">Grupo Muscular:</label>
        <select name="grupoMuscular" id="grupoMuscular" onChange={(e) => {
          setMuscle_group(e.target.value);
        }}>
            <option id="1" value="">Todos</option>
            <option id="1" value="Pecho">Pecho</option>
            <option id="1" value="Espalda">Espalda</option>
            <option id="1" value="Hombros">Hombros</option>
            <option id="1" value="Biceps">Biceps</option>
            <option id="1" value="Triceps">Triceps</option>
            <option id="1" value="Piernas">Piernas</option>
        </select> 
    
        <label htmlFor="tipologia">Tipología:</label>
        <select name="tipologia" id="tipologia" onChange={(e) => {
          setTypology(e.target.value);
        }}>
            <option id="2" value="">Todas</option>
            <option id="2"value="Fuerza">Fuerza</option>
            <option id="2"value="Resistencia">Resistencia</option>
            <option id="2" value="Cardio">Cardio</option>
            <option id="2" value="Volumen">Volumen</option>
        </select>
    
        <button id="buscar">Filtrar</button>
   </form> 
    )
};
    
export default Filter;