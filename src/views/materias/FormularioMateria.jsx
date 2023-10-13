import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';

import {
    Card,
    Input,
    Spinner,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { useStateContext } from '../../context/ContextProvider';
const FormularioMateria = () => {
    let  { id } = useParams();
    console.log(id)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [materias, setMaterias] = useState({
        id: null,
        nombre: '',
        creditos: '',
        codigo: '' 
    });
  
    useEffect(() => {
        setLoading(true)
        clienteAxios.get(`/materias/${id}`)
          .then(({data}) => {
            setLoading(false)
            console.log(data)
            setMaterias(data)
            console.log(materias); 
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
      const onSubmit = (ev) => {
        ev.preventDefault()
        if(materias.id) {
            clienteAxios.put(`/materias/${id}`, materias)
            .then(() => {
                setNotification("La materia fue editada correctamente")
                navigate('/tabla-materias')
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors);
                }
            });
        } else {
            clienteAxios.post(`/materias`, materias)
            .then(() => {
                setNotification("La materia fue creada correctamente")
                navigate('/tabla-materias')
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
            <Typography className='mx-auto' variant="h2" color="blue-gray">
                {materias.id && <h2>Editar Materia: {materias.nombre}</h2>}
                {!materias.id && <h2>Agregar Materia</h2>}
            </Typography>
            <Typography  color="gray" className="mt-1 mx-auto font-normal">
                Recuerda llenar y leer bien los datos.
            </Typography>
            {loading && (
                <Spinner color="indigo" className="mx-auto" />
            )}
            {errors && 
                <Toaster />
            }    
            {!loading &&         
            <form onSubmit={onSubmit} className="mx-auto mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input 
                        value={materias.nombre} 
                        size="lg" 
                        onChange={ev => setMaterias({...materias, nombre: ev.target.value})} 
                        label="Materia" 
                    />
                    <Input 
                        value={materias.codigo} 
                        size="lg" 
                        onChange={ev => setMaterias({...materias, codigo: ev.target.value})}                    
                        label="Codigo (opcional)" 
                    />
                    <Input 
                        type='numeric'
                        value={materias.creditos} 
                        size="lg" 
                        onChange={ev => setMaterias({...materias, creditos: ev.target.value})}                      
                        label="Creditos" 
                    />
                </div>
                <Button type='submit' className="mt-6" fullWidth>
                    {materias.id && <> Editar Materia</>}
                    {!materias.id && <>Registrar Materia</>}
                </Button>
            </form> 
            }
        </Card>
    </div>
  )
}

export default FormularioMateria