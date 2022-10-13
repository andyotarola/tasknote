import React from 'react';
import { useState } from 'react';

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../client';

const RecoverPassword = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm()

    const [matchInvalid, setMatchInvalid] = useState(false)

    const onSubmit = async (formData) => {

        try{
            setLoading(true)
            setMatchInvalid(false)

            const session = supabase.auth.session()
            if(formData.password === formData.passwordRepeat){
           
                supabase.auth.api.updateUser(session.access_token, {
                    password: formData.password
                }).then(()=> {
                    navigate("/iniciar-sesion", {
                        state: {
                            recoveryPasswordSuccess: true
                        }
                    })
                })
                
            }else{
                setMatchInvalid(true)
            }
    
            setLoading(false)

        }catch{
            toast.error("Token inválido", {
                position: "bottom-left",
                autoClose: 2000,
                theme: 'colored'
            })
            setLoading(false)
        }
    }

    return (
        <>
            <div
                className="
                 w-11/12 mx-auto border-2 rounded-md mt-4 px-6 py-8 md:w-8/12 lg:w-6/12 xl:w-4/12
                 bg-white border-slate-200
                 dark:border-slate-700 dark:bg-slate-800
             "
            >

                <div className="grid gap-2 mb-6">
                    <h1 className="text-center text-2xl dark:text-white font-extrabold">Recuperar contraseña</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid auto-cols-fr  dark:text-white">

                        <label className="block mb-6">
                            <span className="">Nueva Contraseña</span>
                            <input
                                type="password" className="mt-1 block w-full tn-form__input"
                                {...register("password", {
                                    required: "La contrasña es requerida."
                                })}
                            />
                            {errors.password && <span className="text-red-400 block">{errors.password.message}</span>}
                            {matchInvalid && <span className="text-red-400 block">Las contraseñas no coinciden.</span>}

                        </label>

                        <label className="block mb-6">
                             <span className="">Repetir nueva Contraseña</span>
                             <input 
                                 type="password" className="mt-1 block w-full tn-form__input"
                                 {...register("passwordRepeat")}
                             />
                         </label>

                        <button className="btn-primary mb-6" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Recuperar contraseña'}
                        </button>

                        <span className="text-center">
                            ¿No tienes una cuenta?
                            <Link to="/registro">
                                <span className='text-sky-400'>Regístrate gratis</span>
                            </Link>
                        </span>
                        <span className="text-center">
                            También puedes
                            <Link to="/iniciar-sesion">
                                <span className='text-sky-400 ml-1'>iniciar sesión</span>
                            </Link>
                        </span>

                    </div>

                </form>

            </div>

            <ToastContainer />
        </>
    );
}

export default RecoverPassword;
