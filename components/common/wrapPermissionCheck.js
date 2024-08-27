// utils/wrapPermissionCheck.js
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const wrapPermissionCheck = (Component, permissionType, moduleUrl) => {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const permissions = useSelector((state) => state.permissions.permissions);
    const [hasPermission,setHasPermission] = useState(false);

    useEffect(() => {
      const currentPath = window.location.pathname;

      const permission = permissions.find(p => {
        return p.moduleUrl === currentPath || currentPath.startsWith(`${p.moduleUrl}/`);
      });

      setHasPermission(permission ? permission[permissionType] : false)
      // const hasPermission = permission ? permission[permissionType] : false;

      if (!hasPermission) {
        router.push('/not-found');
      }
    }, [permissions, router]);

    // Render the component if the user has permission
    // if(!hasPermission) return null;
    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default wrapPermissionCheck;
