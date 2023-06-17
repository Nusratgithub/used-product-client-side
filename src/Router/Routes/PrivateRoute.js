import React, { useContext } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const PrivateRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);
  const location = useLocation();


  if (loading) {
    return <ClipLoader
      loading={loading}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  }
  return children;
};

export default PrivateRoute;