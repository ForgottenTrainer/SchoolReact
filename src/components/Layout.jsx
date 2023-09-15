import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import blur from "./../blur.png"
const Layout = () => {
  const {token} = useStateContext()
  if (token){
    return <Navigate to="/" />
  }
  return (
    <div className="antialiased relative grid min-h-[100vh] w-screen p-8 ">
      <div className="absolute  top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <img src={blur}  className="w-[90rem]  flex-none max-w-none dark:block" alt="" />
        </div>
      </div>
      <Outlet />
    </div>
    
  )
}

export default Layout
