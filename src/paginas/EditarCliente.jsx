import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner';

const EditarCliente = () => {
  const {id}= useParams();
  const navegacion= useNavigate();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect( () =>{
    const consultarAPI= async () =>{
        try {
            const url= `https://my-json-server.typicode.com/pgcodedeveloper/api_crm/clientes/${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            if(!resultado.id){
              setTimeout(() => {
                navegacion('/clientes');
                return;
              }, 1200);
            }
            setCliente(resultado);
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            setCargando(!cargando);
        }, 200);
    }   
    consultarAPI();
  },[])
  return (
    <>
      {cargando ? (
        <Spinner/>
      ) : (
        <>
          {Object.keys(cliente).length === 0 ? (<p className='text-2xl font-bold uppercase mt-5 '> No Hay Resultados</p>) : (
            <>
              <h1 className='font-black text-4xl text-blue-900 uppercase'>Editar Cliente</h1>
              <p className='mt-3'>Llena los campos que deseas cambiar del cliente</p>
              <Formulario cliente={cliente}/>
          
            </>
          )}
        
        </>
      )}
      <button type='button' onClick={() => navegacion('/clientes')} className='p-3 rounded-xl bg-yellow-500 hover:bg-yellow-700 mt-10  font-bold uppercase text-xl'>Volver</button> 
    </>
  )
}

export default EditarCliente
