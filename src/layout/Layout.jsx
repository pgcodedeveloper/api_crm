import { useEffect, useState } from 'react';
import {Outlet, Link, useLocation, useNavigate} from 'react-router-dom'

const Layout = ({login,usuario}) => {

  const location = useLocation();
  const url = location.pathname;
  const navegacion= useNavigate();


  const reedireccionar= (log) =>{
    if(log == "false" || log == false){
      window.location.href= window.location.origin + '/';
    };
  }
  const cerrarSesion = () =>{
    localStorage.removeItem('login');
    localStorage.removeItem('usuario');
    navegacion('/');
  }
  useEffect( () =>{
    reedireccionar(login);
  },[login])
  return (
    <>
      {login== true || login =="true" ? (
        <div className='md:flex md:min-h-screen'>
      
          <div className='md:w-1/4 bg-blue-900 px-5 py-10 text-center md:text-left'>
            <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

            <p className='mt-8 text-2xl font-semibold text-white'>Hola: <span className='text-red-500 text-xl'>{usuario[0]}</span></p>
            <nav className='mt-10'>
              <Link to="/clientes" className={`${url === '/clientes' ? 'bg-blue-600' : ''} text-white px-4 rounded-md text-2xl block mt-2`}>Clientes</Link>
              <Link to="/clientes/nuevo" className={`${url === '/clientes/nuevo' ? 'bg-blue-600' : ''} text-white rounded-md px-4 text-2xl block mt-2`}>Nuevo Cliente</Link>
              <button type='button' onClick={() => cerrarSesion()} className='bg-orange-600 px-2 py-4 rounded-lg mt-12 block w-full text-white font-bold uppercase hover:bg-orange-800'>Cerrar Sesión</button>
            </nav>
          </div>
          <div className='md:w-3/4 md:p-10 p-2 md:h-screen md:overflow-y-scroll text-center'>
            <Outlet />
          </div>
          
        </div>
      ) : (
        reedireccionar()
      )}
    
    </>
    
  )
}

export default Layout
