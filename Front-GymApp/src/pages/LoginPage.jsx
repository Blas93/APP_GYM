import '../Css/LoginPage.css'
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUserServices } from "../services";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]=useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit =async (e) =>{
        e.preventDefault();
        try {
            const data = await loginUserServices (email, password);
            login(data);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
    <section id='login'> 
    <h1 id='accesso'> Acceso al área privada </h1> 
    <form id='login' onSubmit={handleSubmit}>
        <fieldset>
            <label htmlFor ="email">Email:</label>
            <input 
            type="email"
            id="email" 
            name="email" 
            required
            onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <fieldset>
            <label htmlFor="password">Contraseña:</label>
        <input 
        type="password" 
        id="password" 
        name="password" 
        required
        onChange={(e) => setPassword(e.target.value)} />
        </fieldset>

        <button className='b-acceder'>Acceder</button>
        {error ? <p> {error} </p>:null} 
    </form>
    </section>
    );
    };