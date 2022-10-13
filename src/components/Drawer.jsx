import { XIcon} from '@heroicons/react/solid'

import clickedOut from "@/utils/clickedOut"
import  NavLink  from '@/components/NavLink'
import { useEffect } from 'react'


const Drawer = ({setShowDrawer, lisItem}) => {
    
    clickedOut((e)=> {
        if(JSON.parse(e.target.ariaHidden) && e.target.role === "overlay"){    
            setShowDrawer(false)
        }
    })

    useEffect(() => {
        document.documentElement.style = 'overflow:hidden'
        return () => {
            document.documentElement.style = ''
        };
    }, []);


    return(
        <div className="fixed inset-0 w-full h-full z-50" role="dialog" aria-modal="true">
            <div className="fixed inset-0 backdrop-blur-sm bg-black/20 dark:bg-slate-900/80" aria-hidden="true" role="overlay"></div>
            <div className="dark:bg-slate-800 fixed w-60 h-full p-4 bg-white">
                <button 
                    className="absolute right-4 btn-icon" onClick={()=> setShowDrawer(false)}
                >
                    <XIcon></XIcon>
                </button>

                <div className="">
                    <ul className="flex-col mt-6">
                        {
                            lisItem.map((item) => {
                                return (
                                    <li key={item.title} className="btn-item my-4"
                                        onClick={()=>setShowDrawer(false)}
                                    >
                                        <NavLink 
                                            to={item.to}
                                        >
                                            <div className="flex items-center p-2">
                                                <div className='h-5 w-5 mr-4'>
                                                    {item.icon}
                                                </div>
                                                <p>{item.title}</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Drawer