import { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom'
import Spinner from '../components/Spinner';


const VerCliente = () => {

    const {id}= useParams();
    const navegacion= useNavigate();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect( () =>{
        const consultarAPI= async () =>{
            try {
                const url= `${import.meta.env.VITE_API_URL}/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                if(!resultado){
                    navegacion('/clientes');
                    return;
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
        <div className='p-5'>

            {cargando ? (
                <Spinner/>
            ) :
            (
                <>
                    {Object.keys(cliente).length === 0 ? <p> No Hay Resultados</p> : (
                        <>
                            <h1 className='font-black text-4xl text-blue-900 uppercase text-center'>Datos del Cliente ID:{id}</h1>
                            <p className='mt-3 text-center'>Información detallada del cliente</p>
                            
                            {cliente.nombre && (
                                <p className='font-normal mt-10 text-black text-2xl'>
                                    <span className='text-cyan-700 uppercase font-bold'>Cliente: </span>
                                    {cliente.nombre}
                                </p>
                            )}
        
                            {cliente.empresa && (
                                <p className=' text-2xl font-normal mt-5 text-black'>
                                    <span className=' uppercase text-cyan-700 font-bold'>Empresa: </span>
                                    {cliente.empresa}
                                </p>
                            )}
        
                            {cliente.email && (
                                <p className='font-normal mt-5 text-black text-2xl'>
                                    <span className='uppercase text-cyan-700 font-bold'>E-Mail: </span>
                                    {cliente.email}
                                </p>
                            )}
        
                            {cliente.telefono && (
                                <p className='font-normal mt-5 text-black text-2xl'>
                                    <span className='uppercase text-cyan-700 font-bold'>Teléfono: </span>
                                    {cliente.telefono}
                                </p>
                            )}
                            
                            {cliente.notas && (
                                <p className='font-normal mt-5 text-black text-2xl'>
                                    <span className='uppercase text-cyan-700 font-bold'>Notas: </span>
                                    {cliente.notas}
                                </p>
                            )}
                        </>
                    )}
                </>
                
            )}
            
            <button type='button' onClick={() => navegacion('/clientes')} className='p-3 rounded-xl bg-yellow-500 hover:bg-yellow-700 mt-10  font-bold uppercase text-xl'>Volver</button>
        </div>
    )
}

export default VerCliente
