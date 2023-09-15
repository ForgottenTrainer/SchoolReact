import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import Layout from "./components/Layout";
import TablaAlumnos from "./views/TablaAlumnos";
import Profile from "./views/Perfil";
import FormularioEstudiante from "./views/FormularioEstudiante";

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