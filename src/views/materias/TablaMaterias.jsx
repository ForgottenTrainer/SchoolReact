import React, { useState, useEffect } from 'react'
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { useStateContext } from '../../context/ContextProvider';
import Pagination from '../../components/Pagination';
const TablaMaterias = () => {
    const TABLE_HEAD = ["Materias", "Codigo", "Creditos", "Acciones"];
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(false)
    const total = materias.length
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(8)
    const maximo = Math.ceil(total / porPagina);
    const getMaterias = () => {
        setLoading(true)
        clienteAxios.get('/materias')
          .then(({data}) => {
            setLoading(false)
            setMaterias(data.data)
          })
          .catch(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getMaterias();
      }, [])
    
      const onDelete = (u) => {
        if(!window.confirm("Seguro que quieres eliminar la materia"+ u.id)){
          return
        }
        clienteAxios.delete(`/materias/${u.id}`)
          .then(() => {
            //Mostrar notificacion
            getMaterias()
        })
    }


  return (
    <div>
        <h1 className="text-center font-bold text-4xl mt-2 z-10">
            Materias Tablero
        </h1>
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                {loading && (
                    <tbody>
                    <tr>
                        <td className="text-center mx-auto" >
                        <Spinner color='amber' className="" />
                        </td>
                    </tr>
                    </tbody>
                )}
                <tbody>
                {materias.map((u) => {
                    const classes = "p-4 border-b border-blue-gray-50";
        
                    return (
                    <tr key={u.id}>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {u.nombre}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {u.codigo}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {u.creditos}
                        </Typography>
                        </td>
                        <td className={classes}>
                            <div className="flex gap-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    <Link to={"/materias/"+u.id} >
                                    Editar
                                    </Link>
                                    
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="font-medium"
                                >
                                    <button onClick={ev => onDelete(u)} >Eliminar</button>
                                </Typography>
                            </div>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
        <Pagination
            maximo={maximo} pagina={pagina} setPagina={setPagina}
        />
    </div>
  )
}

export default TablaMaterias