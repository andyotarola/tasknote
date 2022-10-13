import React from "react"
import { Link } from 'react-router-dom'
import { MenuIcon, CogIcon } from '@heroicons/react/solid'

import tasknoteLogo from '../assets/tasknote.svg'
import Logo from "./Logo"

const Header = ({setShowDrawer, setShowSetting, children, username, isDashbord}) => {

    return(
        <header className="
                    backdrop-blur-sm 
                    bg-white    
                    border-slate-900/20
                    dark:bg-slate-900/80 
                    dark:text-white p-3 
                    fixed
                    w-full
                    border-b
                    dark:border-slate-300/10
                "
            >

            <div className={`w-full flex justify-between ${!isDashbord?'md:hidden':null}`}>
                <div className="flex content-center">
                    <button 
                        onClick={() => setShowDrawer(true)} 
                        className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                        <MenuIcon className="h-5 w-5"></MenuIcon>
                    </button>
                    <Link to="">
                       <Logo />
                    </Link>
                </div>
                <div className="flex content-center">
                    {username}
                    <button 
                        onClick={()=> setShowSetting(true)} 
                        className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                        <CogIcon className="h-5 w-5"></CogIcon>
                    </button>
                </div>
            </div>

            {children}

        </header>
    )
}

export default Header