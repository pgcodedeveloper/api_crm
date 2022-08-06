import {Link, useNavigate} from 'react-router-dom'
import { Formik,Form, Field} from 'formik';
import * as Yup from 'yup'
import Alerta from '../components/Alerta';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CrearCuenta = () => {

    const nav= useNavigate();
    let usuario;
    //Funcion que verifica si existe el usauario
    const existeUser= async (email) =>{
        if(email){
            try {
                const url= import.meta.env.VITE_API_URL + `/usuarios?email=${email}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                if(resultado.length > 0){
                    return usuario=true;
                }
            } catch (error) {
                console.log(error);
            }
        }
        return usuario=false;
    }
    function hashIt(password){
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return hashedPassword;
    }
    // Funcion submit 
    const handleSubmit = async (values) =>{
        if(values.password === values.passwordR){
            //Verificar que el Usuario no exista
            usuario= await existeUser(values.email);

            if(!usuario){
                values.password=hashIt(values.password);
                delete values.passwordR;
                try {
                    const url= import.meta.env.VITE_API_URL + '/usuarios';
                    const respuesta= await fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const resultado = await respuesta.json();
                    if(resultado){
                        nav('/');
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            else{
                Swal.fire({
                    title: 'El Usuario ya existe',
                    text: "Intente nuevamente",
                    icon: 'error'
                });
            }
        }
        else{
            Swal.fire({
                title: 'Los Passwords no son iguales',
                text: "Intente nuevamente",
                icon: 'error'
            });
        }
    }

    const usuarioSchema= Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('E-mail no válido').required('El E-mail es obligatorio'),
        password: Yup.string().required('El password es obligatorio').min(6,'El password es muy corto'),
        passwordR: Yup.string().required('Es obligatorio')
    });
    return (
        <div className='bg-gray-200 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h2 className='text-center text-gray-600 text-lg uppercase font-extrabold'>Crea Tu Cuenta</h2>
            <Formik
                initialValues={{
                    nombre: '',
                    email: '',
                    password: '',
                    passwordR: ''
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
                                <label htmlFor="nombre" className='text-gray-800 font-black'>Nombre:</label>
                                <Field id="nombre" name="nombre" type="text" placeholder="Nombre de usuario" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ): null}
                            </div>
            
                            <div className='mb-4'>
                                <label htmlFor="email" className='text-gray-800 font-black'>E-Mail:</label>
                                <Field id="email" name="email" type="email" placeholder="E-Mail de usuario" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ): null}
                            </div>
            
                            <div className='mb-4'>
                                <label htmlFor="password" className='text-gray-800 font-black'>Password:</label>
                                <Field id="password" name="password" type="password" placeholder="Password de usuario" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.password && touched.password ? (
                                    <Alerta>{errors.password}</Alerta>
                                ): null}
                            </div>
                
                            <div className='mb-4'>
                                <label htmlFor="passwordR" className='text-gray-800 font-black'>Repetir Password:</label>
                                <Field id="passwordR" name="passwordR" type="password" placeholder="Repetir el Password" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.passwordR && touched.passwordR ? (
                                    <Alerta>{errors.passwordR}</Alerta>
                                ): null}
                            </div>
                        
                            <input type="submit" value="Crear Cuenta" className='mt-5 w-full cursor-pointer bg-blue-900 p-3 text-white uppercase font-bold rounded-md text-lg' />
                        
                            <div className='flex md:flex-row flex-col items-center text-center mt-5 justify-between'>
                                <Link to='/' className='text-sm font-bold text-blue-500 hover:text-blue-700 mb-5 md:mb-0'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                                <Link to='/olvide-password' className='text-sm font-bold text-blue-500 hover:text-blue-700'>¿Olvidastes tu Password? Recuperar ahora</Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
        
    )
}

export default CrearCuenta
