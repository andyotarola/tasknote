import React, { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/Header';
import Setting from '@/components/Setting';
import Drawer from '@/components/Drawer'
import navListItem from '@/utils/navListItemDashbord'
import { LoginIcon, PencilAltIcon } from '@heroicons/react/solid';
import supabase from '../../client';
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../../store/slices/userSlice';
import { removeTodos } from '../../store/slices/todoSlice';
import { removeTypesTodos } from '../../store/slices/typesTodosSlice';
import { resetFilters } from '../../store/slices/filterTodoSlice';

const DashbordLayout = () => {

    const [showSetting, setShowSetting] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error){
            dispatch(removeUser())
            dispatch(removeTodos())
            dispatch(removeTypesTodos())
            dispatch(resetFilters({done: false, all: true, selectedType: -1}))
            localStorage.removeItem("filters_todos")
            navigate("/")
        }
    }


    return (
        <>
            <Header setShowDrawer={setShowDrawer} setShowSetting={setShowSetting} username={user?.username} isDashbord={true} />

            <main className="w-11/12 mx-auto md:w-10/12 lg:w-8/12 xl:w-6/12 pt-14 md:pt-16">
                <Outlet></Outlet>
            </main>

            {showSetting ?
                <Setting setShowSetting={setShowSetting}>
                    <ul className="mt-4">

                        <li className="btn-item mb-4" onClick={() => setShowSetting(false)}>
                            <Link to="editar-perfil">
                                <div className="flex items-center  py-3 px-4">
                                    <div className='h-5 w-5 mr-4'>
                                        <PencilAltIcon />
                                    </div>
                                    <p>Editar perfil</p>
                                </div>
                            </Link>
                        </li>

                        <li className="btn-item"
                            onClick={() => setShowDrawer(false)}
                        >
                            <button className="w-full text-left py-3 px-4 flex items-center" onClick={signOut}>
                                <LoginIcon className="w-5 h-5 mr-2"></LoginIcon>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </Setting>

                : ''
            }

            {showDrawer ? <Drawer setShowDrawer={setShowDrawer} lisItem={navListItem} /> : ''}

        </>
    );
}

export default DashbordLayout;
