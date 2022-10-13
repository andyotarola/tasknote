import React from 'react';
import { Link } from 'react-router-dom'
import { CogIcon } from '@heroicons/react/solid'

import navListItem from '@/utils/navListItemHome'
import NavLink from '@/components/NavLink'
import Logo from '../../../components/Logo';

const NavigationHome = ({ setShowDrawer, setShowSetting }) => {

    return (
        <nav className="hidden md:block container mx-auto">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Link to="">
                       <Logo />
                    </Link>
                </div>
                <div className="flex">
                    <ul className="flex">
                        {
                            navListItem.map((item) => {
                                return (
                                    <li key={item.title} className="mx-4 btn-item"
                                        onClick={() => setShowDrawer(false)}
                                    >
                                        <NavLink
                                            to={item.to}
                                        >
                                            <div className="flex items-center p-2">
                                                <p>{item.title}</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className="flex content-center">
                        <button
                            onClick={() => setShowSetting(true)}
                            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            <CogIcon className="h-5 w-5"></CogIcon>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationHome;
