import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import Layout from "./components/Layout";
import TablaAlumnos from "./views/TablaAlumnos";
import Profile from "./views/Perfil";
import FormularioEstudiante from "./views/FormularioEstudiante";
import AlumnosVista from "./views/Alumnos-vista";
import FormularioDocente from "./views/docentes/FormularioDocente";
import TableroDocente from "./views/docentes/TableroDocente";
import VistaDocentes from "./views/docentes/VistaDocentes";
import TablaMaterias from "./views/materias/TablaMaterias";
import FormularioMateria from "./views/materias/FormularioMateria";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/tabla-alumnos",
                element: <TablaAlumnos/>
            },
            {
                path: "/tabla-docentes",
                element: <TableroDocente/>
            },
            {
                path: "/registro",
                element: <Register />
            },
            {
                path: "/perfil",
                element: <Profile />
            },
            {
                path: "/agregar-alumnos",
                element: <FormularioEstudiante key="studentCreate" />
            },
            {
                path: "/alumnos/:id",
                element: <FormularioEstudiante key="studentUpdate" />
            },
            {
                path: "/menu-alumno/:id",
                element: <AlumnosVista />
            },
            {
                path: "/menu-docente/:id",
                element: <VistaDocentes />
            },
            {
                path: "/agregar-docente",
                element: <FormularioDocente key="docenteCreate" />
            },
            {
                path: "/docente/:id",
                element: <FormularioDocente key="docenteUpdate" />
            },
            {
                path: "/tabla-materias/",
                element: <TablaMaterias />
            },
            {
                path: "/agregar-materia/",
                element: <FormularioMateria key="materiaCreate" />
            },
            {
                path: "/materias/:id",
                element: <FormularioMateria key="materiaEdit" />
            },
        ]
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
        ]

    },


])

export default router