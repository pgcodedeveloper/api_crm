import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup' 
import { useNavigate } from 'react-router-dom'
import Alerta from './Alerta';

const Formulario = ({cliente}) => {

    const navegacion= useNavigate()
    const nuevoClienteSchema= Yup.object().shape({
        nombre: Yup.string()
                    .min(3,"El nombre es muy corto")
                    .max(50, "El nombre es muy largo")
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required("El nombre de la empresa es Obligatorio"),
        email: Yup.string()
                    .email("E-Mail no válido")
                    .required("El E-mail es Obligatorio"),
        telefono: Yup.number().typeError("El número no es válido")
                    .integer("El número no puede ser decimal")
                    .positive("El Número no puede ser negativo")
    });

    const handleSubmit= async (valores) =>{
        try {
            if(!cliente.id){

                //Registro nuevo en el BD
                const url= `https://my-json-server.typicode.com/pgcodedeveloper/api_crm/clientes`;
                const respuesta= await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const resultado = await respuesta.json();
                if(resultado){
                    navegacion('/clientes');
                }
            }
            else{

                //Actualizando un registro a partir de su ID con PUT
                const url= `https://my-json-server.typicode.com/pgcodedeveloper/api_crm/clientes/${cliente.id}`;
                const respuesta= await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resultado= await respuesta.json();
                if(resultado){
                    navegacion('/clientes');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl text-center uppercase'>{cliente.nombre ? 'Editar Datos' : 'Agregar Cliente'}</h1>

            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async(values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {

                    return (
                        <Form className='mt-10 text-left'>
                            <div className='mb-4'>
                                <label htmlFor="nombre" className='text-gray-800 font-black'>Nombre:</label>
                                <Field id="nombre" name="nombre" type="text" placeholder="Nombre del Cliente" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="empresa" className='text-gray-800 font-black'>Empresa:</label>
                                <Field id="empresa" name="empresa" type="text" placeholder="Nombre de la Empresa" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="email" className='text-gray-800 font-black'>Email del Cliente:</label>
                                <Field id="email" name="email" type="email" placeholder="Dirección de Correo" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="telefono" className='text-gray-800 font-black'>Teléfono:</label>
                                <Field id="telefono" name="telefono" type="tel" placeholder="Número de Teléfono" className="mt-2 block p-3 w-full bg-gray-100"/>
                                {errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="notas" className='text-gray-800 font-black'>Notas:</label>
                                <Field as="textarea" name="notas" id="notas" type="text" placeholder="Notas del Cliente" className="h-40 mt-2 block p-3 w-full bg-gray-100"/>
                            </div>

                            <input type="submit" value={cliente.nombre ? 'Guardar Cambios' : 'Agregar Cliente'} className='mt-5 w-full cursor-pointer bg-blue-900 p-3 text-white uppercase font-bold rounded-md text-lg' />
                        </Form>
                    )
                }}
                
            </Formik>
        
        </div>
    )
}

Formulario.defaultProps= {
    cliente: {}
}
export default Formulario
