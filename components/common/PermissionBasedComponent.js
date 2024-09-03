// src/components/common/PermissionBasedComponent.js
import useStorage from '@/hooks/useStorage';
import React from 'react';
import { useSelector } from 'react-redux';

const PermissionBasedComponent = ({ permissionName, moduleUrl, children }) => {

  const { getItem } = useStorage();

  if(moduleUrl == '/dashboard' || moduleUrl == '/'){
    return (
      <>
        {children}
      </>
    );
  }
  
  if(moduleUrl == '/follow-up'){
    moduleUrl = '/enquiry';
  }

  if(moduleUrl == '/custom-fields'){
    moduleUrl = '/user-management';
  }

  const permissions = getItem('permissions');

  // Find the permissions object that matches the moduleUrl
  const permissionObject = permissions.find(permission => permission.module_url === moduleUrl);

  // Check if the permission object exists and has the required permission
  const hasPermission = permissionObject ? permissionObject[permissionName] : false;

  if (!hasPermission) {
    return null; // or render a fallback UI
  }

  return (
    <>
      {children}
    </>
  );
};

export default PermissionBasedComponent;
