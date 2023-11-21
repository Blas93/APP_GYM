import { useEffect, useState } from "react";
import { deleteActivityService, getUserFavoritesActivitiesService, likeActivityService } from "../services";
//import { useSearchParams } from "react-router-dom";


const useFavoritesActivities = (token)=> {
    const [favorites, setFavorites] = useState (null);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState("");
    //const [searchParams] =useSearchParams();

    useEffect(() => {
        const loadactivity =async () => {
            try {
                setLoading(true);
                const data = await getUserFavoritesActivitiesService(token);
                setFavorites (data);
            } catch (error) {
                setError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadactivity();
    }, [token]);

    // Hook de delete
	const deleteFavoriteActivity = async (id, token) => {
		await deleteActivityService(id, token);
		const allNewActivities = await getUserFavoritesActivitiesService(token);
		setFavorites(allNewActivities);
	};
	// Hook de Like
	const likeFavoriteActivity = async (id, token) => {
		const totalLikes = await likeActivityService(id, token);
		const allNewActivities = await getUserFavoritesActivitiesService(token);
		setFavorites(allNewActivities);
		return totalLikes
	};

    return {favorites, loading, error, deleteFavoriteActivity, likeFavoriteActivity };
};


export default useFavoritesActivities;

