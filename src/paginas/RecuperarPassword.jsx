import {Link, useNavigate} from 'react-router-dom'
import { Formik,Form, Field} from 'formik';
import * as Yup from 'yup'
import Alerta from '../components/Alerta';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const RecuperarPassword = () => {

    const nav= useNavigate();
    let usuario;
    //Funcion que verifica si existe el usauario
    const existeUser= async (email) =>{
        if(email){
            try {
                const url= `https://my-json-server.typicode.com/pgcodedeveloper/api_crm/usuarios?email=${email}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                if(resultado.length > 0){
                    return resultado;
                }
            } catch (error) {
                console.log(error);
            }
        }
        return usuario=false;
    }

    // Funcion submit 
    const handleSubmit = async (values) =>{
        //Verificar que el Usuario exista
        usuario= await existeUser(values.email);
        if(usuario[0].id){
            try {
                usuario[0].password= '';
                const url= `https://my-json-server.typicode.com/pgcodedeveloper/api_crm/usuarios/${usuario[0].id}`;
                const respuesta= await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(usuario[0]),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resultado = await respuesta.json();
                if(resultado){
                    nav(`/cambiar-password/${usuario[0].id}`);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else{
            Swal.fire({
                title: 'El Usuario no existe',
                text: "Intente nuevamente",
                icon: 'error'
            });
        }
    }

    const usuarioSchema= Yup.object().shape({
        email: Yup.string().email('E-mail no válido').required('El E-mail es obligatorio')
    });
    return (
        <div className='bg-gray-200 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h2 className='text-center text-gray-600 text-lg uppercase font-extrabold'>Crea Tu Cuenta</h2>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={usuarioSchema}
                onSubmit={(values, {resetForm}) => {
                    handleSubmit(values);
                    resetForm();
                }}
            >
                {({errors, touched}) =>{

                    return(
                        <Form className='mt-5'>
                            <div className='mb-4'>
                                <label htmlFor="email" className='text-gray-800 font-black'>E-Mail:</label>
                                <Field id="email" name="email" type="email" placeholder="E-Mail de usuario" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ): null}
                            </div>
                        
                            <input type="submit" value="Recuperar" className='mt-5 w-full cursor-pointer bg-blue-900 p-3 text-white uppercase font-bold rounded-md text-lg' />
                        
                            <div className='flex md:flex-row flex-col items-center text-center mt-5 justify-between'>
                                <Link to='/' className='text-sm font-bold text-blue-500 hover:text-blue-700 mb-5 md:mb-0'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                                <Link to='/crear-cuenta' className='text-sm font-bold text-blue-500 hover:text-blue-700'>¿Aún no tienes una cuenta? Crear una</Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
        
    )
}

export default RecuperarPassword
