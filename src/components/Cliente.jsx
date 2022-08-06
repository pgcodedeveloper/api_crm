import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Cliente = ({cliente, handleEliminar}) => {

    const { nombre, empresa, email, telefono, notas, id} = cliente;

    //Para realizar el router a un cliente y su id
    const nav= useNavigate();


    //Para obtener el tamaño de la pantalla del cliente
    const tamañoPantalla= () =>{
        let tamaño= document.body.clientWidth;
        window.addEventListener('resize',() =>{
          tamaño= document.body.clientWidth;
          return tamaño;
        });
        return tamaño;
    }

    //Funcion para confirmar la accion del usuario
    const confirmarEliminar =() =>{
        Swal.fire({
            title: '¿Deseas eliminar el Cliente?',
            text: "No se puede revertir la operación",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                handleEliminar(id);
            }
        })
    }
    return (
        <tr className='border-b hover:bg-gray-100 cursor-pointer'>
            {tamañoPantalla() >= 1024 ? (
                <>
                    <td className='p-3'>{nombre}</td>
                    <td className='p-3'>
                        <p><span className='text-gray-800 uppercase font-bold'>Email: </span> {email}</p>
                        <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span> {telefono}</p>
                    </td>
                    <td className='p-3'>{empresa}</td>
                    <td className='p-3'>
                        <button type='button' onClick={() => nav(`/clientes/${id}`)} className='bg-orange-600 hover:bg-orange-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Ver</button>
                        <button type='button' onClick={() => nav(`/clientes/editar/${id}`)} className='bg-blue-600 hover:bg-blue-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Editar</button>
                        <button type='button' className='bg-red-600 hover:bg-red-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Eliminar</button>
                    </td>
                </>
            ): (
                <>
                    <td className='p-3'>
                        <p><span className='text-gray-800 uppercase font-bold'>Nombre: </span> {nombre}</p>
                        <p><span className='text-gray-800 uppercase font-bold'>Email: </span> {email}, <span className='text-gray-800 uppercase font-bold'>Telefono: </span> {telefono}</p>
                    </td>
                    <td className='p-3'>
                        <button type='button' onClick={() => nav(`/clientes/${id}`)} className='bg-orange-600 hover:bg-orange-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Ver</button>
                        <button type='button' onClick={() => nav(`/clientes/editar/${id}`)} className='bg-blue-600 hover:bg-blue-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Editar</button>
                        <button type='button' onClick={() => confirmarEliminar()} className='bg-red-600 hover:bg-red-900 mt-2 block w-full text-white p-2 uppercase font-bold text-xs'>Eliminar</button>
                    </td>
                </>
            )}
            
        </tr>
    )
}

export default Cliente
