import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='bg-red-600 text-center font-bold uppercase text-white my-4 p-3'>
        {children}
    </div>
  )
}

export default Alerta
