import { useContext, useEffect, useState } from 'react';
import { addActivityService, deleteActivityService, getAllActivitiesServices, likeActivityService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

export const useActivities = () => {
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {token} = useContext(AuthContext)
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const loadActivities = async () => {
			try {
				const data = await getAllActivitiesServices(token, searchParams);
				setActivities(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		loadActivities();
	}, [searchParams]);
	const addActivity = async (activity, token) => {
		console.log('entrando en addActivity');
		await addActivityService(activity, token);
		const allNewActivities = await getAllActivitiesServices(token, searchParams);
		setActivities(allNewActivities);
	};
	// Hook de delete
	const deleteActivity = async (id, token) => {
		await deleteActivityService(id, token);
		const allNewActivities = await getAllActivitiesServices(token, searchParams);
		setActivities(allNewActivities);
	};
	// Hook de Like
	const likeActivity = async (id, token) => {
		const totalLikes = await likeActivityService(id, token);
		const allNewActivities = await getAllActivitiesServices(token, searchParams);
		setActivities(allNewActivities);
		return totalLikes
	};
	
	
	return {
		activities,
		loading,
		error,
		addActivity,
		deleteActivity,
		likeActivity,
	};
};
