import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Eliminar from "../svg/Eliminar.svg"
import favorite from "../svg/favorite.svg"
import "../Css/Activity.css"
export const Activity = ({ activity, deleteActivity, likeActivity }) => {
	const {user, token} = useContext(AuthContext)
	let totalLikes = activity.totalLikes
	const handleClick = () =>{
		totalLikes = likeActivity(activity.id, token)
	}
	
	return (
		<article>
			<Link className='l-card'to={`/activity/${activity.id}`}>
				<p id="name">{activity.activity_name}</p>
				<p id="description">{activity.description}</p>
				<p id="musculargroup">{activity.muscle_group}</p>
				<p id="typology">{activity.typology}</p>

				{activity.image && (
					<img
						src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${activity.image}`}
						alt={activity.text}
					/>
				)}
			</Link>
			<section>
				<p className="totalLikes">{totalLikes}</p>
				<button className="b-favorite" onClick={handleClick}>{activity.liked ? 
				<img id='favorite' src={favorite} alt='favorite' title='favorite image' /> : <img id='favorite-like' src={favorite} alt='favorite' title='favorite image' /> }</button>
			</section>
			{user && user.role === "administrator" && 
				<button className="b-eliminar" onClick={() => deleteActivity(activity.id, token)} >
				<img id='Elliminar' src={Eliminar} alt='Eliminar' title='Eliminar actividad' />	
				</button>}
		</article>
	);
};

/*export const ActivityList = ({ activities}) => {
	const reverseActivities = [...activities].reverse();

	return(
		<div>
			{reverseActivities.map((activity, index) => (<activity key={index}activity={activity}/>))}
		</div>
	);
};*/

