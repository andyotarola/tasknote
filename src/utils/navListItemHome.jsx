import { LoginIcon } from '@heroicons/react/outline'
import { HomeIcon, UserAddIcon} from '@heroicons/react/solid'

export default [
    {
        title: 'Inicio',
        icon: <HomeIcon />,
        to: ''
    },
    {
        title: 'Registrarse',
        icon: <UserAddIcon />,
        to: 'registro'
    },
    {
        title: 'Iniciar sesión',
        icon: <LoginIcon />,
        to: 'iniciar-sesion'
    }
]