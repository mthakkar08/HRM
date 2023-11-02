
import { useEffect } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//     const { oktaAuth, authState } =  useOktaAuth();

//     return authState?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
//   }

  export default function PrivateRoute({ children }) {

      
const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem('accessToken')
    // console.log(token)
    if (!token) {
      navigate('/');
    }
    // token ? <Navigate to="/" />: <></>;
  }, []);

  }