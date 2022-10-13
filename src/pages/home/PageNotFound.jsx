import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className='flex flex-col justify-center h-screen items-center'>
        <h1 className='text-black font-extrabold dark:text-white text-4xl mb-4'>404</h1>
        <h2 className='text-black font-extrabold dark:text-white text-2xl mb-4'>Página no encontrada</h2>
        <span className='text-sky-400'>
          <Link to='/'>Regresar al inicio</Link>
        </span>
      </div>
    </>
  );
}

export default PageNotFound;
