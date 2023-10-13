import React, { useEffect, useState } from 'react'

import {
    Card,
    CardBody,
    Tabs,
    TabsHeader,
    TabsBody,
    TabPanel,
    Tab,
  } from "@material-tailwind/react";
  import clienteAxios from "../../config/axios";
  import { useNavigate, useParams } from 'react-router-dom';
import VistaDocente from '../../components/VistaDocente';

const VistaDocentes = () => {
    const data = [
        {
            label: "Perfil",
            value: "perfil",
            desc: <VistaDocente />
        },
        {
          label: "Clases",
          value: "clases",
          desc: "Working"
        },
        {
          label: "Kardex",
          value: "kardex",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Editar",
          value: "editar",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
     

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
            
          <h1 className="text-4xl text-center font-bold z-10">Información del docente</h1>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
                <Tabs value="perfil">
                    <TabsHeader>
                        {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </CardBody>
          </Card>
        </>
      );
}

export default VistaDocentes