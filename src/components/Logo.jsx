import React from 'react';

import tasknoteLogo from '../assets/tasknote.svg'


const Logo = () => {
    return (
        <div className="flex items-center ml-2 dark:text-white text-black">
            <img src={tasknoteLogo} alt="Tasknote logo" className="w-5 h-5" />
            Tasknote
        </div>
    );
}

export default Logo;
