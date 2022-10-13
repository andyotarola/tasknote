import React, { useEffect } from "react"
import { MoonIcon, ChipIcon, SunIcon, XIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux'

import clickedOut from "@/utils/clickedOut"
import { setTheme } from "@/store/slices/themeSlice";

const Setting = ({setShowSetting , children}) => {

    clickedOut((e)=> {
        if(JSON.parse(e.target.ariaHidden) && e.target.role === "overlay"){    
            setShowSetting(false)
        }
    })

    const { theme } =  useSelector(state => state.theme)

    const dispatch = useDispatch()

    const styleThemeSelected = "text-sky-400 text:bg-slate-900"
    
    useEffect(() => {
        document.documentElement.style = 'overflow:hidden'
        return () => {
            document.documentElement.style = ''
        }
    }, [])

    const darkMode = () => {
        dispatch(setTheme('dark'))
        localStorage.theme = 'dark'
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }

    const lightMode = () => {
        dispatch(setTheme('light'))
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
    const systemMode = () => {
        dispatch(setTheme('system'))
        localStorage.theme = 'light'
        localStorage.removeItem('theme')
        if ((window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark')
        }
    }

    return(
        <div className="fixed inset-0 w-full h-full z-50" role="dialog" aria-modal="true">
            <div className="fixed inset-0 backdrop-blur-sm bg-black/20 dark:bg-slate-900/80" aria-hidden="true" role="overlay"></div>
            <div className="bg-white dark:bg-slate-800 absolute right-0 w-70 h-full">
                <div className="flex justify-between content-center p-4">
                    <p>Ajustes</p>
                    <button 
                        className="h-5 w-5 hover:dark:text-slate-300 text-slate-500 hover:text-slate-600" 
                        onClick={()=> setShowSetting(false)}
                    >
                        <XIcon></XIcon>
                    </button>
                </div>
                <hr className="dark:border-slate-300/10 border-b" />
                <div className="flex-col p-4">
                    <p className="mb-2">Tema</p>
                    <div className="flex text-black/60 dark:text-white border-2 border-black/20 dark:border-white/20 rounded-md justify-between">
                        <div className={theme ==='dark'?styleThemeSelected:null}>
                            <button 
                                className="
                                    w-full border-r-2 
                                    border-black/20
                                    dark:border-white/20
                                    flex p-3 items-center 
                                    hover:bg-black/5 
                                    dark:hover:bg-black/20
                                "
                                onClick={darkMode}
                            >
                                Dark
                                <MoonIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className={theme ==='system'?styleThemeSelected:null}>
                            <button 
                                className="
                                    w-full border-r-2  
                                    border-black/20
                                    dark:border-white/20
                                    flex p-3 items-center 
                                    hover:bg-black/5 
                                    dark:hover:bg-black/20
                                "
                                onClick={systemMode}
                            >
                                System
                                <ChipIcon className="h-5 w-5"/>
                            </button>
                        </div>
                        <div className={theme ==='light'?styleThemeSelected:null}>
                            <button 
                                className="
                                    w-full 
                                    flex p-3 items-center 
                                    hover:bg-black/5 
                                    dark:hover:bg-black/20
                                "
                                onClick={lightMode}
                            >
                                Light
                                <SunIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>

                    {children}

                </div>
            </div>
        </div>
    )
}

export default Setting