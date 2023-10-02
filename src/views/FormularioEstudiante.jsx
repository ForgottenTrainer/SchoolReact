import React, { useEffect, useState } from 'react'

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../config/axios';
import { useStateContext } from '../context/ContextProvider';


const FormularioEstudiante = () => {
    let  { id } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        nombre: '',
        edad: '',
        carrera: '',
        imagen: '',
        email: '',
        direccion: '',
        telefono: '',
        cuatrimestre: '',
        genero: '',      
    });
  
    useEffect(() => {
        setLoading(true)
        clienteAxios.get(`/estudiantes/${id}`)
          .then(({data}) => {
            setLoading(false)
            console.log(data)
            setUser(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
    
    const onSubmit = (ev) => {
        ev.preventDefault()
        if(user.id) {
            clienteAxios.put(`/estudiantes/${id}`, user)
            .then(() => {
                setNotification("El estudiante fue editado correctamente")
                navigate('/tabla-alumnos')
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors);
                }
            });
        } else {
            clienteAxios.post(`/estudiantes`, user)
            .then(() => {
                setNotification("El estudiante fue creado correctamente")
                navigate('/tabla-alumnos')
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
  return (
    <div>
    <Card color="transparent" shadow={false}>
        <Typography variant="h2" className='text-center' color="blue-gray">
            {user.id && <h1>Editar Alumno: {user.nombre}</h1>}
            {!user.id && <h1>Agregar Alumno</h1>}
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
            Ingrese los datos para registrar el alumno
        </Typography>
        {loading && (
            <Spinner color="indigo" className="mx-auto" />
        )}
        {errors && <div className='bg-red-500 uppercase text-white'>
            {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
            ))}
            
            </div>
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
                        value={user.carrera} 
                        size="lg" 
                        onChange={ev => setUser({...user, carrera: ev.target.value})} 
                        label="Carrera" 
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
                        <Input 
                            value={user.cuatrimestre} 
                            size="lg" 
                            onChange={ev => setUser({...user, cuatrimestre: ev.target.value})} 
                            label="Cuatrimestre" 
                        />
                        <Input 
                            value={user.genero} 
                            size="lg" 
                            onChange={ev => setUser({...user, genero: ev.target.value})} 
                            label="Género" 
                        />
                    </div>
                </div>

                <Button type='submit' className="mt-6" fullWidth>
                {user.id && <h1>Editar Alumno</h1>}
                {!user.id && <h1>Registrar alumno</h1>}
                </Button>
            </form>
        }
    </Card>
    </div>
  )
}

export default FormularioEstudiante
