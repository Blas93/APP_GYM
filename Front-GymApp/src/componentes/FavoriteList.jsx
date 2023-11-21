import { useContext } from 'react'
import useFavoritesActivities from '../hooks/useFavoritesActivities'
import { AuthContext } from '../context/AuthContext'
import { Activity } from './Activity'
import '../Css/FavoriteList.css'
export const FavoriteList = () => {
  const {token} = useContext(AuthContext)
  const {favorites, loading, error, deleteFavoriteActivity, likeFavoriteActivity} = useFavoritesActivities(token)
  console.log(favorites)
  return (
    <section>
			<h2 id='favoritos'>Lista de Favoritos</h2>

			{favorites?.length ? (
				<ul>
					{favorites.map((favority) => (
						<li key={favority.id}>
								<Activity activity={favority} deleteActivity={deleteFavoriteActivity} likeActivity={likeFavoriteActivity} />
						</li>
					))}
				</ul>
			) : (
				<p id='NoActividad'>No hay ninguna actividad todavía</p>
			)}
		</section>
  )
}
