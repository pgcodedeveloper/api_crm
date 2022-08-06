import {Outlet} from 'react-router-dom'

const IniciarSesion = () => {
  return (
    <div className='w-4/5 mt-10 p-3 mx-auto'>
      <h1 className='text-4xl font-black text-center text-blue-700 '>CRM - Clientes</h1>

      <Outlet />
    </div>
  )
}

export default IniciarSesion
