import { useContext } from 'react';
import { Activity } from './Activity';
import { AddActivity } from '../pages/AddActivity';
//import { DeleteInformationActivityPage } from '../pages/DeleteInformationActivityPage';
//import { EditInformationActivityPage } from '../pages/EditInformationActivityPage';
import { AuthContext } from '../context/AuthContext';
export const ActivitiesList = ({ activities, addActivity, deleteActivity, likeActivity }) => {
	const { user } = useContext(AuthContext); //Necesitamos que el usuario tenga role
	console.log('activities', activities);
	return (
		<section>
			<h2 className='t-h2'>Lista de Actividades</h2>
			{/* Desactivar cuando el user del contexto tenga role */}
			{user && user.role === 'administrator' && (
				<AddActivity addActivity={addActivity} />
				
				
			)} 
			
			

			{activities.length ? (
				<ul className='ul-listaactividades'>
					{activities.map((activity) => (
						
						<li className='a-list' key={activity.id}>
							<Activity activity={activity} deleteActivity={deleteActivity} likeActivity={likeActivity} />
						</li>
						
					))}
				</ul>
			) : (
				<p>No hay ninguna actividad todavía</p>
			)}
		</section>
	);
};

