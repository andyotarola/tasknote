import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

import supabase from '../../client'

const Signup = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const [isUnique, setisUnique] = useState({
        email: true,
        username: true
    });
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true)
            setisUnique({email: true, username: true})

            const  {data:isUniqueEmail} = await supabase.from("profiles")
                                .select("email")
                                .eq("email", formData.email)
            
            if(isUniqueEmail.length > 0) throw new Error("The email is in use")

            const {data:isUniqueUsername} = await supabase.from("profiles")
                                    .select("username")
                                    .eq("username", formData.username)

            if(isUniqueUsername.length > 0) throw new Error("The username is in use")

            const {user} = await supabase.auth.signUp({email: formData.email, password:formData.password} , {
                redirectTo: `${window.location.origin}/iniciar-sesion`
            })

            await supabase.from("profiles")
                .insert([{
                    fullname: formData.fullname, 
                    email: formData.email, 
                    username:formData.username,
                    id: user.id
            }])

            
            navigate("/iniciar-sesion", {
                state: {
                    signUp: true
                }
            })

        }catch(error){
            setIsLoading(false)
            if(error.message === 'The email is in use'){
                setisUnique({username: true, email: false})
            }else if(error.message === 'The username is in use'){
                setisUnique({email:true, username: false})
            }
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
                    <h1 className="text-center text-2xl dark:text-white font-extrabold">Crea tu cuenta</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid auto-cols-fr gap-y-4 dark:text-white">
                        <label className="block">
                            <span className="">Nombre completo</span>
                            <input 
                                type="text" 
                                className="mt-1 block w-full tn-form__input"
                                {...register("fullname", {
                                    required: "El nombre completo es requerido.",
                                    pattern: {
                                        message : 'El nombre completo no debe empezar ni terminar con un espacio.',
                                        value: /^\S([A-Za-z]|\s)+\S$/g
                                    },
                                    minLength: {
                                        message: "El nombre completo debe tener como mínimo 6 carácteres.",
                                        value: 6
                                    }
                                })}
                            />
                            
                            {errors.fullname && <span className="text-red-400">{errors.fullname.message}</span>}

                        </label>
                        <label className="block">
                            <span className="">Nombre de usuario</span>
                            <input 
                                type="text" 
                                className="mt-1 block w-full tn-form__input"
                                {...register("username", {
                                    required: "El nombre de usuario es requerido.",
                                    minLength: {
                                        message: "El nombre de usuario debe tene minimo 4 caracteres.",
                                        value: 4
                                    },
                                    pattern: {
                                        message: "El nombre de usuario tiene caracteres extraños.",
                                        value: /^\w+$/g
                                    }
                                })}
                            />
                            {errors.username && <span className="text-red-400 block">{errors.username.message}</span>}
                            {!isUnique.username && <span className="text-red-400 block">El nombre de usuario ya existe, por favor ingrese otro.</span>}

                        </label>
                        <label className="block">
                            <span className="">Email</span>
                            <input 
                                type="email" className="mt-1 block w-full tn-form__input"
                                {...register("email", {
                                    required:"El correo es requerido.",
                                    minLength: {
                                        message: "El correo debe tener minimo 6 caracteres.",
                                        value: 6
                                    },
                                    pattern: {
                                        message: "El correo tiene caracteres extraños.",
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                    }
                                })}
                            />
                            {errors.email && <span className="text-red-400 block">{errors.email.message}</span>}
                            {!isUnique.email && <span className="text-red-400 block">El correo ya existe, por favor ingrese otro.</span>}

                        </label>
                        <label className="block">
                            <span className="">Contraseña</span>
                            <input 
                                type="password" className="mt-1 block w-full tn-form__input"
                                {...register("password", {
                                    required: "La contraseña es requerida.",
                                    minLength: {
                                        message: "La contraseña debe tener minimo 6 carecteres",
                                        value: 6
                                    }
                                })}
                            />
                            {errors.password && <span className="text-red-400">{errors.password.message}</span>}

                        </label>
                        
                        <button className="btn-primary" type="submit" disabled={isLoading}>
                            {isLoading?'Cargando...':'Registrate'}
                        </button>

                        <span className="text-center">
                            ¿Ya tienes cuenta?
                            <Link to="/iniciar-sesion">
                                <span className='text-sky-400'>Inicia sesión</span>
                            </Link>
                        </span>

                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;
