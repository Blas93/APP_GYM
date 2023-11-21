import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import defaultUser from "../svg/defaultuser.svg";
import '../Css/Auth.css'


export const Auth = () => {
    const { user, logout } = useContext (AuthContext);
    
    if (user) {
        return (
            <p id='login'>
                Loged is as {user.user_name} 
                <Link to = "/user" id="lo-link" className="link">
                    <img className="Avatar-img" src={defaultUser} alt="Avatar" />
                </Link>
                <Link to = "/" id="lo-link" className="link">
                    <button  className="lgo-link" onClick={logout}>LogOut</button>
                </Link>
            </p>
        );
    } else {
        return (
            <ul className="nav">
                <li className="list-link">
                    <Link to = "/register" id="r-link" className="link"> Register</Link>
                </li>
                <li className="list-link">
                    <Link to = "/login"id="l-link" className="link">Login</Link>
            
                </li>
            </ul>
        );
    }
};