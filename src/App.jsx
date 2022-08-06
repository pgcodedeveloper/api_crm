import { useEffect, useState } from 'react'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Inicio from './paginas/Inicio'
import LoginForm from './paginas/LoginForm'
import EditarCliente  from './paginas/EditarCliente'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'
import CrearCuenta from './paginas/CrearCuenta'
import RecuperarPassword from './paginas/RecuperarPassword'
import CambiarPassword from './paginas/CambiarPassword'

function App() {

  const loginLS= localStorage.getItem('login');
  const [login, setLogin] = useState(loginLS ?? false);
  const usuarioLS= JSON.parse(localStorage.getItem('usuario'));
  const [usuario,setUsuario] = useState(usuarioLS ?? []);

  useEffect ( () =>{
    localStorage.setItem('login',login ?? false);
    localStorage.setItem('usuario',JSON.stringify(usuario) ?? []);
  },[login])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IniciarSesion />}>
          <Route index element={<LoginForm setLogin={setLogin} setUsuario={setUsuario}/>}/>
          <Route path='/crear-cuenta' element={<CrearCuenta />}/>
          <Route path='/olvide-password' element={<RecuperarPassword/>}/>
          <Route path='/cambiar-password/:id' element={<CambiarPassword/>} />
        </Route>

        <Route path='/clientes' element={<Layout login={login} usuario={usuario}/>}>
          <Route index element={<Inicio/>}/>
          <Route path='nuevo' element={<NuevoCliente/>}/>
          <Route path='editar/:id' element={<EditarCliente/>}/>
          <Route path=':id' element={<VerCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
