import { createContext, useEffect, useState } from "react"; 
import { getUserDataService } from "../services";

export const AuthContext = createContext();
export const AuthUpdateContext = createContext(() => {
    //No hace nada
});
  

export const AuthProviderComponent = ({ children}) => {
    const [token, setToken] = useState (localStorage.getItem("token")); 
    const [user, setUser]= useState(null);

    const login = (token) => {
        setToken(token);
    };

    const logout = ()=> {
    setToken('');
    setUser(null)
    };

    //Guardar el token en el localStorage
    useEffect(()=>{
        localStorage.setItem("token", token);
    }, [token]);


    //Información del usuario logado 
    useEffect(()=>{
        const getUserData =async () =>{
            try{
                const data= await getUserDataService({token})
                setUser (data);
            }catch (error){
                logout()
            }
        }
        if(token) getUserData()
    }, [token])



    return (
        <AuthContext.Provider value= {{token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
 