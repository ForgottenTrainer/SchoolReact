import React, { useEffect, useState } from 'react'
import clienteAxios from '../config/axios';
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const TABLE_HEAD = ["id","nombre", "edad", "email", "telefono","cuatrimestre", "genero", 'acciones'];
 

const TablaAlumnos = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const total = users.length
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8)

  const maximo = Math.ceil(total / porPagina);

  const getUsers = async (page = 1) => {
    setLoading(true)
    await clienteAxios.get('/estudiantes')
      .then(({data}) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if(!window.confirm("Seguro que quieres eliminar al estudiante"+ u.id)){
      return
    }
    clienteAxios.delete(`/estudiantes/${u.id}`)
      .then(() => {
        //Mostrar notificacion
        getUsers()
      })

  }
  return (
    <div>
    <h1 className="text-4xl font-bold text-center mt-5 mb-5">Tabla alumnos</h1>
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
          {!loading && <tbody>
            {users
            .slice((pagina - 1 ) * porPagina, (pagina -1) * porPagina + porPagina).map((u) => {
              
              const classes = "p-4"
              return (
                <tr key={u.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {u.id}
                    </Typography>
                  </td>
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
                      {u.edad}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {u.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {u.telefono}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {u.carrera}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {u.genero}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-4">
                    <Link to={"/menu-alumno/"+u.id} className="font-medium">
                      Ver
                    </Link>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <Link to={"/alumnos/"+u.id} >
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
          </tbody>}
        </table>
      </Card> 
      <Pagination 
        maximo={maximo} pagina={pagina} setPagina={setPagina}
      />
    </div>
  )
}

export default TablaAlumnos
