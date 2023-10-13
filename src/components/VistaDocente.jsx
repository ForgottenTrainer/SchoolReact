import React, { useEffect, useState } from 'react'

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    TabPanel,
    Tab,
    Switch,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import perfil from "../Images/person.jpg"
  import { useStateContext } from '../context/ContextProvider';
  import clienteAxios from "../config/axios";
  import { useNavigate, useParams } from 'react-router-dom';



const VistaDocente = () => {
    let  { id } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: null,
        nombre: '',
        edad: '',
        carrear: '',
        imagen: '',
        email: '',
        direccion: '',
        telefono: '',
        cuatrimestre: '',
        genero: '',      
    });

    useEffect(() => {
      setLoading(true)
      clienteAxios.get(`/docentes/${id}`)
        .then(({data}) => {
          setLoading(false)
          console.log(data)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
    return (
        <>
            <h1 className="text-4xl text-center font-bold z-10">Perfil del Docente</h1>
          <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://twcp.conroeisd.net/wp-content/uploads/sites/53/2019/10/CP-Front.jpg)] bg-cover	bg-center">
            <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={perfil}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {user.nombre}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      Docente
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="grid-cols-1 mb-12 grid gap-12  lg:grid-cols-2 xl:grid-cols-3">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Información del usuario
                  </Typography>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-sm font-semibold">Dirección: <span className='font-normal'>{user.direccion}</span></p>
                    <p className="text-black text-sm font-semibold">Genero: <span className='font-normal'>{user.genero}</span></p>
                  </div>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Metodos de contacto
                  </Typography>
                    <div className="flex flex-col gap-2">
                      <p className="text-black text-sm font-semibold">Telefono: <span className='font-normal'>{user.telefono}</span></p>
                      <p className="text-black text-sm font-semibold">Correo: <span className='font-normal'>{user.email}</span> </p>
                    </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      );
}

export default VistaDocente