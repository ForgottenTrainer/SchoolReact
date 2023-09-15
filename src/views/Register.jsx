import {  useRef, useState} from 'react'

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";
import clienteAxios from '../config/axios';
import { useStateContext } from '../context/ContextProvider';
import loginImg from "./.././Images/login.svg"

function Register() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };

    clienteAxios.post('/registro', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="">
      <div className="mt-20">
        <Card color="transparent" shadow={false}>
          <Typography variant="h1" className='text-center' color="blue-gray">
            Registrar Nuevo Usuario
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">

          </Typography>
          {errors && <Alert color="red">
            {Object.keys(errors).map(key => (
              <p key={key}> {errors[key][0]} </p>
            ))}
          </Alert>     
          }

          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Nombre" inputRef={nameRef} />
              <Input size="lg" label="Email" inputRef={emailRef} />
              <Input type="password" size="lg" label="Password" inputRef={passwordRef} />
              <Input type="password" size="lg" label="Password Confirmation" inputRef={passwordConfirmationRef} />
            </div>
            <Button type="submit" className="mt-6 bg-black shadow-[#00000061] hover:shadow-[#00000061]" fullWidth>
              Registrar usuario
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Register;