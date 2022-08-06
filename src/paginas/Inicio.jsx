import {useState,useEffect} from 'react'
import Cliente from '../components/Cliente';


const Inicio = () => {

  //{} Objeto en JS
  // [] Arreglo en JS

  const [clientes, setClientes] = useState([]);

  useEffect(() =>{
    const consultarAPI= async () =>{
      try {
        const url= import.meta.env.VITE_API_URL +'/clientes';
        const respuesta= await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error)
      }
    }
    consultarAPI();
  },[])

  const tamañoPantalla= () =>{
    let tamaño= document.body.clientWidth;
    window.addEventListener('resize',() =>{
      tamaño= document.body.clientWidth;
      return tamaño;
    });
    return tamaño;
  }

  // Funcion que elimina un registro de la base de datos
  const handleEliminar = async (id) =>{
    try {
      const url= import.meta.env.VITE_API_URL +`/clientes/${id}`;
      const respuesta= await fetch(url,{
          method: 'DELETE'
      });
      const resultado= await respuesta.json();
      if(resultado){

        //Nuevo arreglo de clientes, pero sin el cliente que se elimino
        const arrray= clientes.filter(cliente => cliente.id !== id);
        setClientes(arrray); 
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900 uppercase text-center'>Tabla de Clientes</h1>
      <p className='mt-3 text-center'>Administra tus clientes</p>

      <table className='md:w-full mt-5 table-auto shadow mx-auto bg-white'>
        <thead className='bg-blue-800'>
            <tr className='text-white'>
              {tamañoPantalla() >= 1024 ? (
                <>
                  <th className='p-2 '>Nombre</th>
                  <th className='p-2'>Contacto</th>
                  <th className='p-2'>Empresa</th>
                  <th className='p-2'>Acciones</th>
                </>
              ): (
                <>
                  <th className='p-2 '>Datos</th>
                  <th className='p-2'>Acciones</th>
                </>
              )}
              
            </tr>
        </thead>
        <tbody className='text-center'>
          {clientes.map(cliente => (
          <Cliente 
            key={cliente.id}
            cliente= {cliente}
            handleEliminar={handleEliminar}
          />
          ))}  
        </tbody>
      </table>
    </>
  )
}

export default Inicio
