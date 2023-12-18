
import { useEffect } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from '../layouts/Layout';

// export default function PrivateRoute({ children }) {
//     const { oktaAuth, authState } =  useOktaAuth();

//     return authState?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
//   }

  export default function PrivateRoute({ children }) {
    debugger
    const navigate = useNavigate();
    
        const token = localStorage.getItem("accessToken");
        let decodedJwt="";
        if(token == ''  || token == null){
            navigate("/");
        }else{
        decodedJwt = JSON.parse(atob(token.split(".")[1]));
        if (decodedJwt.exp * 1000 < Date.now()) {
            delete localStorage.removeItem("accessToken");
            navigate("/");
        }
        }
    
    return (
      <Layout />
    )
  }