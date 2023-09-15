import { useState, useRef} from 'react'
import clienteAxios from '../config/axios';
import { useStateContext } from '../context/ContextProvider';
import loginImg from "./.././Images/login.svg"

import {
    Card,
    Input,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";


const Login = () => {
    
    const emailRef = useRef()
    const passwordRef = useRef()
  
    
    const [message, setMessage] = useState(null)

    const { setUser, setToken } = useStateContext();
  
    const onSubmit = ev => {
        ev.preventDefault()
    
        const payload = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
        clienteAxios.post('/login', payload)
          .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setMessage(response.data.message)
            }
          })
      }

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2">
        
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <img src={loginImg} className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" alt="" />
        </div>
        <div className="mt-20 ">
            <Card color="transparent" shadow={false}>
            <Typography variant="h1" color="blue-gray">
                Sistema Escolar
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Pato le cuack
            </Typography>
            <form onSubmit={onSubmit} noValidate className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              {message &&
                <div className="mb-2">
                  <Alert color='red'>{message}</Alert>
                </div>
              }
                <div className="mb-4 flex flex-col gap-6">
                <Input  size="lg" label="Email" 
                    inputRef={emailRef}
                />
                <Input  type="password" size="lg" label="Password" 
                    inputRef={passwordRef}
                />
                </div>
                <Button type="submit"  className="mt-6 bg-black shadow-[#00000061] hover:shadow-[#00000061]" fullWidth>
                Ingresar
                </Button>
            </form>
            </Card>
        </div>
    </div>
  )
}

export default Login
