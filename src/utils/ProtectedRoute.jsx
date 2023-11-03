import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRouteclient = ({ isAllowed, redirectPath = '/home', children, }) => {
  console.log(isAllowed);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};




export const ProtectedRoutefreelancer = ({ isAllowed, redirectPath = '/home', children, }) => {
  console.log(isAllowed);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};



