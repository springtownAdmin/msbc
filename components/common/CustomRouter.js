"use client"

import PrivateRoute from "@/components/common/PrivateRoute";
import Dashboard from "@/components/modules/dashboard/dashboard";
import AddEnquiry from "@/components/modules/enquiry/addEnquiry";
import EditEnquiry from "@/components/modules/enquiry/editEnquiry";
import Enquiry from "@/components/modules/enquiry/enquiry";
import NotFound from "@/app/not-found";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function CustomRouter() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route 
              path="/enquiry/add" 
              element={<PrivateRoute element={AddEnquiry} permissionType="can_add" />} 
            />
            
            <Route 
              path="/enquiry/edit/:id" 
              element={<PrivateRoute element={EditEnquiry} permissionType="can_edit" />} 
            />
            
            <Route 
              path="/enquiry" 
              element={<PrivateRoute element={Enquiry} permissionType="can_view" />} 
            />
          
        </Routes>
    </Router>
  );
}