import { useStateContext } from '../context/ContextProvider'
import { Outlet, Navigate } from 'react-router-dom'
import { SidebarWithLogo } from './Aside'
import blur from "./../blur.png"
import clienteAxios from '../config/axios';
import { useEffect } from 'react';
 
const DefaultLayout = () => {
  const {user, token, setUser} = useStateContext()

  useEffect(() => {
    clienteAxios.get('/user')
      .then(({data}) => {
        setUser(data);
      });
  }, []); 

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div id='defaultLayour' className="antialiased relative grid min-h-[100vh] w-screen p-8 bg-[#afd8ff20] ">
      <div className="absolute top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <img src={blur} className="w-[90rem] flex-none max-w-none dark:block" alt="" />
        </div>
      </div>
      
      <SidebarWithLogo user={user} />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
      
    </div>
  )
}

export default DefaultLayout
