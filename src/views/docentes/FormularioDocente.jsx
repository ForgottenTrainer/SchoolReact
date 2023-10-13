
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import {
    Card,
    Input,
    Button,
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { useStateContext } from '../../context/ContextProvider';

const FormularioDocente = () => {
    let  { id } = useParams();
    console.log(id)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        nombre: '',
        edad: '',
        imagen: '',
        email: '',
        direccion: '',
        telefono: '',
        genero: '',      
    });
  
    useEffect(() => {
        setLoading(true)
        clienteAxios.get(`/docentes/${id}`)
          .then(({data}) => {
            setLoading(false)
            console.log(data)
            setUser(data)
            console.log(user); 
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
      const onSubmit = (ev) => {
        ev.preventDefault()
        if(user.id) {
            clienteAxios.put(`/docentes/${id}`, user)
            .then(() => {
                setNotification("El docente fue editado correctamente")
                navigate('/tabla-docentes')
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors);
                }
            });
        } else {
            clienteAxios.post(`/docentes`, user)
            .then(() => {
                setNotification("El docente fue creado correctamente")
                navigate('/tabla-docentes')
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors);
                }
            });           
        }
    }
    useEffect(() => {
        if (errors) {
          Object.keys(errors).forEach(key => {
            toast.error(errors[key][0]); 
          });
        }
    }, [errors]);
  return (
    <div>
        <Card color="transparent" shadow={false}>
            <Typography variant="h2" className='text-center' color="blue-gray">
                {user.id && <h1>Editar Docente: {user.nombre}</h1>}
                {!user.id && <h1>Agregar Docente</h1>}
            </Typography>
            <Typography color="gray" className="mt-1 text-center font-normal">
                Ingrese los datos para registrar al docente
            </Typography>
            {loading && (
                <Spinner color="indigo" className="mx-auto" />
            )}
            {errors && 
                <Toaster />
            }
            
            {!loading && 
                <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg mx-auto sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input 
                            value={user.nombre} 
                            size="lg" 
                            onChange={ev => setUser({...user, nombre: ev.target.value})} 
                            label="Nombre" 
                        />
                        <Input 
                            value={user.edad} 
                            size="lg" 
                            onChange={ev => setUser({...user, edad: ev.target.value})} 
                            label="Edad" 
                        />
                        <Input 
                            value={user.email} 
                            size="lg" 
                            onChange={ev => setUser({...user, email: ev.target.value})} 
                            label="Email" 
                        />          
                        <Input 
                            value={user.genero} 
                            size="lg" 
                            onChange={ev => setUser({...user, genero: ev.target.value})} 
                            label="Género" 
                        />      
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <Input 
                                value={user.direccion} 
                                size="lg" 
                                onChange={ev => setUser({...user, direccion: ev.target.value})} 
                                label="Dirección" 
                            />
                            <Input 
                                value={user.telefono} 
                                size="lg" 
                                onChange={ev => setUser({...user, telefono: ev.target.value})} 
                                label="Teléfono" 
                            />
                        </div>
                    </div>

                    <Button type='submit' className="mt-6" fullWidth>
                    {user.id && <h1>Editar Docente</h1>}
                    {!user.id && <h1>Registrar Docente</h1>}
                    </Button>
                </form>
            }
        </Card>

    </div>
  )
}

export default FormularioDocente