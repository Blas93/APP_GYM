import '../Css/HomePage.css'
import '../Css/Articles.css'
import { ActivitiesList } from '../componentes/ActivitiesList'
import { Filter } from '../componentes/Filter'
import { useActivities } from '../hooks/useActivities'


export const HomePage = () => {
    const {activities, loading, error, addActivity, deleteActivity, likeActivity} = useActivities();
    return ( 
        <>
            <Filter />
            <ActivitiesList activities={activities} addActivity={addActivity} deleteActivity={deleteActivity} likeActivity={likeActivity}  />
        </>
    )
}
