import {Link} from "react-router-dom";

export const ErrorMessage = ({message}) => {
  return (
   <>
   <p>{message}</p>
   <Link to ="./pages/ActivityPage.jsx">Regresar a la HomePage</Link>
   </>
    
  );
};
