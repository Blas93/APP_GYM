import { Link } from "react-router-dom"; 
import '../Css/Header.css';
import { Auth } from "./Auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

<logo />
export const Header = () => {
    const {user} = useContext(AuthContext)
    return (
        <header>
            {user ? (
                <Link to ="/home">
                    <img src="../public/logo/logogymapp.png" alt="Logo de la aplicacion" className="logo-imagen"/>
                    <h2 className="logo-nombre">Gym App</h2>
                </Link>
            ) : (
                <Link to ="/">
                 <img src="../public/logo/logogymapp.png" alt="Logo de la aplicacion" className="logo-imagen"/>
                 <h2 className="logo-nombre">Gym App</h2>
                </Link>
            )}
            <Auth />
        </header>
    )
}