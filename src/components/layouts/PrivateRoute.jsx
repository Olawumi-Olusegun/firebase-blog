
import React from 'react'
import { Blog } from '../../context/Context'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = Blog();
  return (
    <>
        {!currentUser?.uid ? Navigate({to: "/demo"}) : <Outlet />}
    </>
  )
}
