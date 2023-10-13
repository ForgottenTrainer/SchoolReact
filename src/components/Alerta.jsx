import toast, { Toaster } from 'react-hot-toast';

const Alerta = ({children}) => {
    toast.error(children);
    return (
      <div className=''>
        {Toaster}
      </div>
    )
  }
  
  export default Alerta
  