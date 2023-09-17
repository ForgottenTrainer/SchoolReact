import { useStateContext } from '../context/ContextProvider'
import { Outlet, Navigate } from 'react-router-dom'
import { SidebarWithLogo } from './Aside'
import blur from "./../blur.png"
import clienteAxios from '../config/axios';
import { useEffect } from 'react';
import { Alert } from "@material-tailwind/react"; 

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
 

const DefaultLayout = () => {
  const {user, token, setUser, notification} = useStateContext()

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
        <div className="content text-green-300">
          {notification &&
            <div className="notification">
              <Alert
                icon={<Icon />}
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
              >
                {notification}
              </Alert>
            </div>
          }
        </div>
        <Outlet />
      </div>
      
    </div>
  )
}

export default DefaultLayout
