import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import supabase from '../../client';
import { setUser } from '../../store/slices/userSlice';

const EditProfile = () => {

    const session = supabase.auth.session()
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if (user) {
            setValue("email", user.email)
            setValue("fullname", user.fullname)
            setValue("username", user.username)
        }

    }, [user]);

    const [matchInvalid, setMatchInvalid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isUnique, setisUnique] = useState(true);

    const onSubmit = async (formData) => {

        try {
            setLoading(true)
            setMatchInvalid(false)
            setisUnique(true)

            const profile = {}

            if (user.username !== formData.username) {
                const { data: isUniqueUsername } = await supabase.from("profiles")
                    .select("username")
                    .eq("username", formData.username)

                if (isUniqueUsername.length > 0) throw new Error("The username is in use")

                profile["username"] = formData.username
            }

            if (user.fullname !== formData.fullname) profile["fullname"] = formData.fullname

            if (formData.password !== formData.passwordRepeat) {
                setMatchInvalid(true)
                throw new Error("Match password invalid.")
            }
            if (user.username !== formData.username || user.fullname !== formData.fullname) {
                await supabase.from("profiles")
                    .update({ ...profile })
                    .match({ id: user.id })
            }

            if(formData.password.length > 0){
                await supabase.auth.api.updateUser(session.access_token, { password: formData.password})    
            }

            dispatch(setUser({
                id: user.id,
                fullname: formData.fullname,
                username: formData.username,
                email: user.email
            }))

            setLoading(false)
            
            navigate("/dashboard")

        } catch (error) {
            setLoading(false)
            if (error.message === 'The username is in use') {
                setisUnique(false)
            }
        }

    }

    return (
        <>
            <div
                className="
                    w-11/12 mx-auto border-2 rounded-md mt-1 px-6 py-8 md:w-8/12 lg:w-6/12 xl:w-4/12
                    bg-white border-slate-200
                    dark:border-slate-700 dark:bg-slate-800
                "
            >
                <div className="grid gap-2 mb-4">
                    <h1 className="text-center text-2xl dark:text-white font-extrabold">Editar Perfil</h1>
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
                                        message: 'El nombre completo no debe empezar ni terminar con un espacio.',
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
                            <span className="">Correo electrónico</span>

                            <p className="
                                border 
                                dark:border-gray-600 px-2 py-3 
                                border-gray-500 
                                opacity-60 
                                select-none
                                whitespace-nowrap
                                text-ellipsis
                                overflow-x-hidden
                            ">
                                {user?.email}
                            </p>

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
                            {!isUnique && <span className="text-red-400 block">El nombre de usuario ya existe, por favor ingrese otro.</span>}

                        </label>
                        <label className="block">
                            <span className="">Contraseña</span>
                            <input
                                type="password" className="mt-1 block w-full tn-form__input"
                                {...register("password")}
                            />
                            <span className="text-xs opacity-60">Si no quieres cambiar tu contraseña deja esto en blanco</span>
                            {errors.password && <span className="text-red-400">{errors.password.message}</span>}
                            {matchInvalid && <span className="text-red-400 block">Las contraseñas no coinciden.</span>}

                        </label>
                        <label className="block">
                            <span className="">Repetir contraseña</span>
                            <input
                                type="password" className="mt-1 block w-full tn-form__input"
                                {...register("passwordRepeat")}
                            />
                        </label>

                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Actualizar'}
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
