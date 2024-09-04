import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@/app/loading';
import useStorage from '@/hooks/useStorage';

const wrapPermissionCheck = (Component, permissionType) => {

  const WrappedComponent = (props) => {
    const router = useRouter();
    const { getItem } = useStorage();
    const pathname = usePathname();
    const permissions = getItem('permissions');
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {

      let currentPath = pathname === '/custom-fields' ? '/user-management' : pathname === '/follow-up' ? '/enquiry' : pathname;

      // if(pathname == '/custom-fields'){
      //   currentpath = '/user-management';
      // }
      // if(pathname == '/follow-up'){
      //   currentpath = '/enquiry';
      // }

      const permission = permissions?.find(p => {
        return p.module_url === currentPath || currentPath.startsWith(`${p.module_url}/`);
      });
      const isAuthorized = permission ? permission[permissionType] : false;
      setHasPermission(isAuthorized);


      if (isAuthorized === false) {
        router.push('/not-found');
      }
    }, [permissions, router, pathname, permissionType]);

    if (hasPermission === null) {
      return <Loading />;
    }

    // Render the component if the user has permission
    if (!hasPermission) return null;
    return hasPermission ? <Component {...props} /> : null;
  };

  return WrappedComponent;

};

export default wrapPermissionCheck;
