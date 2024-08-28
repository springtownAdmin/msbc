import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const wrapPermissionCheck = (Component, permissionType) => {

  const WrappedComponent = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const permissions = useSelector((state) => state.permissions.permissions);

    useEffect(() => {
      const currentPath = pathname;

      const permission = permissions.find(p => {
        return p.moduleUrl === currentPath || currentPath.startsWith(`${p.moduleUrl}/`);
      });

      const hasPermission = permission ? permission[permissionType] : false;

      if (!hasPermission) {
        router.push('/not-found');
      }
    }, [permissions, router, pathname, permissionType]);

    const permission = permissions.find((p) => {
      return p.moduleUrl === pathname || pathname.startsWith(`${p.moduleUrl}/`);
    });

    const hasPermission = permission ? permission[permissionType] : false;

    // Render the component if the user has permission
    if(!hasPermission) return null;
    return <Component {...props} />;
  };

  return WrappedComponent;
  
};

export default wrapPermissionCheck;
