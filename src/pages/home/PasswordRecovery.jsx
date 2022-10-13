import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../client';

const PasswordRecovery = () => {

    const [loading, setLoading] = useState(false)
    const naviagte = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = async (formData) => {

        setLoading(true)

        const { error } = await supabase.auth.api.resetPasswordForEmail(formData.email, {
            redirectTo: `${window.location.origin}/recuperar`
        })

        if (!error) {
            naviagte("/iniciar-sesion", {
                state: {
                    recoveryPassword: true
                }
            })
        }

        setLoading(false)
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
                            <span className="">Correo electrónico</span>
                            <input
                                type="email" className="mt-1 block w-full tn-form__input"
                                {...register("email", {
                                    required: "El correo es requerido."
                                })}
                            />
                            {errors.email && <span className="text-red-400 block">{errors.email.message}</span>}
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
        </>
    );
}

export default PasswordRecovery;
