import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@/app/loading';

const wrapPermissionCheck = (Component, permissionType) => {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const permissions = useSelector((state) => state.permissions.permissions);
    const [hasPermission, setHasPermission] = useState(null);

    

    useEffect(() => {
      let currentpath = pathname;
      if(pathname == '/custom-fields'){
        currentpath = '/user-management';
      }
      if(pathname == '/follow-up'){
        currentpath = '/enquiry';
      }
      
      // Check for permission and update state
      const permission = permissions.find(p => p.module_url === currentpath || currentpath.startsWith(`${p.module_url}/`));
      const isAuthorized = permission ? permission[permissionType] : false;
      setHasPermission(isAuthorized);

      // Redirect if not authorized
      if (isAuthorized === false) {
        router.push('/not-found');
      }
    }, [permissions, router, pathname, permissionType]);

    // Render nothing or a loading indicator while checking permissions
    if (hasPermission === null) {
      return <Loading />;
    }

    // Render the wrapped component if permission is granted
    return hasPermission ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};

export default wrapPermissionCheck;
