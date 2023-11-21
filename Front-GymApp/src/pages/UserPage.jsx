import { useContext } from 'react'
import { FavoriteList } from '../componentes/FavoriteList'
import { UserInfo } from '../componentes/UserInfo'
import { AuthContext } from '../context/AuthContext'
import '../Css/UserPage.css'
export const UserPage = () => {
  const {user} = useContext(AuthContext)
  
  return (
    <section>
        <h2 id='usuario'>UserPage</h2>
        <UserInfo user={user} />
        <FavoriteList />
    </section>
  )
}
