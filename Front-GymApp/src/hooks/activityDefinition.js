import { useEffect, useState } from "react";
import { editActivityService, getSigleActivityService } from "../services";
//import { useSearchParams } from "react-router-dom";


const useActivity = (id, token, user)=> {
const [activity, setActivity] = useState (null);
const [loading, setLoading] = useState (true);
const [error, setError] = useState("");
//const [searchParams] =useSearchParams();

useEffect(() => {
const loadactivity =async () => {
    try {
        setLoading(true);
        /*const res = await fetch(
            `http://localhost:3000/filterActivities?${searchParams.toString()}`
        );
        const body = await res.json();

        setActivity(body.data);*/

        

        const data = await getSigleActivityService (id, token);
        setActivity (data);
    } catch (error) {
        setError(error.message);
        console.log(error);
    } finally {
        setLoading(false);
    }
};
loadactivity();
}, [id]);

const editActivity = async (id, data, token) => {
    if (user && user.role === 'administrator') {
    await editActivityService(id, data, token);
    const newActivity = await getSigleActivityService (id,token);
    setActivity(newActivity);
    } else {
        console.log("No tienes permisos para editar esta actividad.")
    }
};
return {activity, loading, error, editActivity, isAdmin: user && user.role === 'administrator' };
};


export default useActivity;

