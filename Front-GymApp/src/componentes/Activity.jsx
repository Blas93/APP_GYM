import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Eliminar from "../svg/Eliminar.svg"
import favorite from "../svg/favorite.svg"
import "../Css/Activity.css"
import favoriteLike from "../svg/Heart_corazón.svg"

export const Activity = ({ activity, deleteActivity, likeActivity }) => {
	const {user, token} = useContext(AuthContext)
	let totalLikes = activity.totalLikes
	const handleClick = () =>{
		totalLikes = likeActivity(activity.id, token)
	}
	
	return (
		<article className="a-listactividades">
			<Link className='l-card'to={`/activity/${activity.id}`}>
				<p className="name">{activity.activity_name}</p>
				<p className="description">{activity.description}</p>
				<p className="musculargroup">{activity.muscle_group}</p>
				<p className="typology">{activity.typology}</p>

				{activity.image && (
					<img className="a-img"
						src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${activity.image}`}
						alt={activity.text}
					/>
				)}
			</Link>
			<div className="select-list">
			<section className="s-botonfavorito">
				<p className="totalLikes">{totalLikes}</p>
				<button className="b-favorite" onClick={handleClick}>{activity.liked ? 
				<img className='favorite' src={favorite} alt='favorite' title='favorite image' /> : <img className='favoritelike' src={favoriteLike} alt='favoriteLike' title='favoriteLike image' /> }</button>
			</section>
			{user && user.role === "administrator" && 
				<button className="b-eliminar" onClick={() => deleteActivity(activity.id, token)} >
				<img id='Elliminar' src={Eliminar} alt='Eliminar' title='Eliminar actividad' />	
				</button>}
			</div>
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

