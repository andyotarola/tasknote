import React from "react"
import { NavLink as NavLinkReactRouter } from 'react-router-dom'

const NavLink = ({props, to, children}) => {
    return(
        <NavLinkReactRouter 
            {...props}
            to={to}
            className={({isActive}) => {
                return isActive?'text-sky-500 dark:text-sky-400':''
            }}
            end
        >
            {children}
        </NavLinkReactRouter>
    )
}

export default NavLink
