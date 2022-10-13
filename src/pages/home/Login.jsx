import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import supabase from '../../client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const  { register, handleSubmit, formState: {errors} } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {state} = useLocation()
    const session = supabase.auth.session()

    const [credentialValidation, setCredentialValidation] = useState({
        message: '',
        error: false
    })

    useEffect(()=> {
        if(session) navigate("/dashboard")
    },[])

    useEffect(() => {
        if(state !== null){
            if(state.signUp) toast.success("Por favor revise su bandeja de entrada, y confirme su correo.")
            else if (state.recoveryPassword) toast.success("Por favor revise su bandeja de entrada.")
            else if (state.recoveryPasswordSuccess) toast.success("Cambio de contraseña existosa.")
        }
    }, []);

    const onSubmit = async(formData) => {

        try{
            setIsLoading(true)
            setCredentialValidation({
                message: "",
                error: false
            })

            const { error } =  await supabase.auth.signIn({
                email: formData.email,
                password: formData.password
            })

            if(error) throw error

            navigate("/dashboard")

        }catch(err) {
            setIsLoading(false)
            if(err.message === 'Invalid login credentials'){
                setCredentialValidation({
                    message: "Credenciales inválidas.",
                    error: true
                })
            }else if(err.message === 'Email not confirmed'){
                setCredentialValidation({
                    message: "Por favor revise su bandeja correo , y confirme su correo para que pueda usar la App.",
                    error: true
                })
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
                    <h1 className="text-center text-2xl dark:text-white font-extrabold">Inicia sesión</h1>
                </div>
            
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid auto-cols-fr gap-y-4 dark:text-white">

                        <label className="block">
                            <span className="">Correo electrónico</span>
                            <input 
                                type="email" className="mt-1 block w-full tn-form__input"
                                {...register("email", {
                                    required:"El correo es requerido."
                                })}
                            />
                            {errors.email && <span className="text-red-400 block">{errors.email.message}</span>}
                            {
                                credentialValidation.error && 
                                <span className="text-red-400 block">{credentialValidation.message}</span>
                            }
                        </label>

                        <label className="block">
                            <span className="">Contraseña</span>
                            <input 
                                type="password" className="mt-1 block w-full tn-form__input"
                                {...register("password", {
                                    required: "La contraseña es requerida."
                                })}
                            />
                            {errors.password && <span className="text-red-400">{errors.password.message}</span>}

                        </label>
                        <button className="btn-primary" type="submit" disabled={isLoading}>
                            {isLoading?'Cargando...':'Iniciar sesión'}
                        </button>
                        
                        <span className="text-center">
                            ¿No tienes una cuenta?
                            <Link to="/registro">
                                <span className='text-sky-400'>Regístrate gratis</span>
                            </Link>
                        </span>
                        <span className="text-center">
                            <Link to="/recuperacion">
                                <span className='text-sky-400'>¿Olvidaste tu contraseña?</span>
                            </Link>
                        </span>
                    </div>

                </form>
                <ToastContainer autoClose={4000} />
        </div>
       </>
    );
}

export default Login;
