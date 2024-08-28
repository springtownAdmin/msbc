import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
import { usePathname, redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, permissionType, ...rest }) => {
  // const location = useLocation();
  const currentPath = usePathname();
  // const currentPath = location.pathname;
  const permissions = useSelector((state) => state.permissions.permissions);

  // Find the permission object for the current path
  // Adjust to match base paths or specific paths
  const permission = permissions.find(p => {
    // Match exact path or base path for dynamic segments
    return p.moduleUrl === currentPath || currentPath.startsWith(`${p.moduleUrl}/`);
  });

  // Determine if the user has the required permission
  const hasPermission = permission ? permission[permissionType] : false;

  // Render the component if the user has permission, otherwise redirect
  return hasPermission ? (
    <Component {...rest} />
  ) : (
    // <Navigate to="/no-access" />
    redirect('/not-found')
  );
};

export default PrivateRoute;
