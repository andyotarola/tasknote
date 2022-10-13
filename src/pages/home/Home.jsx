import React from 'react';
import { Link } from 'react-router-dom';

import add_todo from '../../assets/images/add_todo.png'
import filter_todos from '../../assets/images/filter_todos.png'
import type_todo from '../../assets/images/type_todo.png'
import Footer from './components/Footer';


const Home = () => {
    return (
        <>
            <div className="p-6 container mx-auto flex flex-col items-center">
                <h1 
                    className="
                        mt-8
                        text-4xl 
                        sm:text-5xl
                        lg:text-6xl
                        dark:text-white
                        text-slate-900
                        font-extrabold
                        tracking-tight
                        text-center
                    "
                >
                    Guarda tus tareas del día a día de manera sencilla.
                </h1>
                
                <p className="mt-4 text-xl w-11/12 md:w-8/12 lg:w-4/12 text-center">
                    Concéntrate, organízate y cálmate con Tasknote&nbsp;.La
                    aplicación de listas de pendientes y gestión&nbsp;de tareas n.º 1 del mundo.
                </p>
                <div className="mt-6 sm:flex sm:justify-center mb-8 select-none">
                    <Link to="registro">
                        <div className="text-center btn-primary sm:px-20">
                            Empezar
                        </div>
                    </Link>
                </div>


            </div>
            <div className="landing-container mb-24">
                <div className="block">
                    <h2 className="text-black dark:text-white mb-6 text-2xl md:text-3xl font-extrabold text-center md:text-left">
                        <span className="block">Añade tus tareas.</span>
                        <span className="block">Organiza tu vida.</span>
                        <span className="block">Consigue más cada día.</span>
                    </h2>

                    <p className="mb-6 p-2">Añade tareas como “Correr a las 6:00am” para rellenar tu lista de pendientes en segundos utilizando el reconocimiento de lenguaje coloquial</p>
                </div>

                <img src={add_todo} alt="Agregar tarea" className="landing-img"/>

            </div>

            <div className="landing-container md:grid-flow-col-dense mb-24">
                <div className="block md:col-start-2 md:col-span-1">
                    <h2 className="text-black dark:text-white mb-6 text-2xl md:text-3xl font-extrabold text-center md:text-left">
                        <span className="block">Flltra tus tareas</span>
                        <span className="block">de manera</span>
                        <span className="block">sencilla.</span>
                    </h2>

                    <p className="mb-6 p-2">Puedes filtrar tus tareas mediante el tipo de tarea, si están completadas o no y también mediante un buscador.</p>
                </div>
                <img src={filter_todos} alt="Agregar tarea" className="md:col-start-1 md:col-span-1 landing-img"/>

            </div>

            <div className="landing-container mb-24">
                <div className="block">
                    <h2 className="text-black dark:text-white mb-6 text-2xl md:text-3xl font-extrabold text-center md:text-left">
                        <span className="block">Añade un tipo de tarea</span>
                        <span className="block">para poder organizar</span>
                        <span className="block">mejor tus tareas.</span>
                    </h2>

                    <p className="mb-6 p-2">Añade un tipo de tarea para poder tener una mejor orden de tus tareas.Por ejemplo puedes crear un tipo de tarea “Personal” y en ella puedes colocar todas tu tareas personales, como “Correr a las 6:00am”.</p>
                </div>

                <img src={type_todo} alt="Agregar tarea" className="landing-img"/>

            </div>

            <Footer />

        </>    
    );
}

export default Home;
