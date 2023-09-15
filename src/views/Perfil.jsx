import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
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
  import { Link } from "react-router-dom";
  import perfil from "../Images/person.jpg"
  import { useStateContext } from '../context/ContextProvider';

  export function Profile() {
    const { user } = useStateContext();
    return (
      <>
      <h1 className="text-4xl text-center font-bold z-10">Perfil de Usuario</h1>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1569098272619-0712bf6a83f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80)] bg-cover	bg-center">
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
                    {user.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Usuario TUP
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="app">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      App
                    </Tab>
                    <Tab value="message">
                      <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Message
                    </Tab>
                    <Tab value="settings">
                      <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Settings
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Información del usuario
                </Typography>
                <div className="flex flex-col gap-12">

                </div>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Metodos de contacto
                </Typography>

              </div>
            </div>
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Proyectos
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Architects design houses
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">

              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default Profile;