import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
  // Bypassing admin authentication for interview demonstration purposes
  return children ? children : <Outlet/>;
}

export default AdminRoute