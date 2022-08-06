import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup' 
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';
import bcrypt from 'bcryptjs'

const LoginForm = ({setLogin,setUsuario}) => {


  const usuarioSchema= Yup.object().shape({
    email: Yup.string()
                .email("E-Mail no válido")
                .required("El E-mail es Obligatorio"),
    password: Yup.string().required('El password es Obligatorio')
  });
  const navegacion = useNavigate();


  const handleSubmit = async (valores) =>{
    //console.log(valores);
    try {
      const url= import.meta.env.VITE_API_URL + `/usuarios?email=${valores.email}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      if(resultado.length > 0){
        const passwordOK = bcrypt.compareSync(valores.password, resultado[0].password)
        if(passwordOK){
          setLogin(true);
          setUsuario([
            resultado[0].nombre,
            resultado[0].id,
            resultado[0].email
          ]);
          navegacion('/clientes');
        }
        else{
          swal.fire(
            'Atención!',
            'El Password es Incorrecto',
            'error'
          );
        }
      }
      else{
        swal.fire(
          'Atención!',
          'El Usuario no existe',
          'error'
        );
      }
      
    } catch (error) {
      console.log();
    }
    
  }
  return (
    <div className='bg-gray-200 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h2 className='text-center text-gray-600 text-lg uppercase font-extrabold'>Iniciar Sesión</h2>

      <Formik 
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={usuarioSchema}

        onSubmit={ async(values, {resetForm}) => {
          await handleSubmit(values)
          resetForm();
          
      }}
      >
        {({errors, touched}) =>{

            return(
              <>
                <Form className='mt-5'>`

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
                  
                  <input type="submit" value="Iniciar Sesión" className='mt-5 w-full cursor-pointer bg-blue-900 p-3 text-white uppercase font-bold rounded-md text-lg' />
                  
                  <div className='flex md:flex-row flex-col items-center text-center mt-5 justify-between'>
                    <Link to='/crear-cuenta' className='text-sm font-bold text-blue-500 hover:text-blue-700 mb-5 md:mb-0'>¿Aún no tienes una cuenta? Crear una</Link>
                    <Link to='/olvide-password' className='text-sm font-bold text-blue-500 hover:text-blue-700'>¿Olvidastes tu Password? Recuperar ahora</Link>
                  </div>
                
                </Form>
              
              </>
            )
        }}
        
      </Formik>

    </div>
  )
}

export default LoginForm
