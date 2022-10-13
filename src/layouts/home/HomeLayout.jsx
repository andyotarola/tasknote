import React, { useState } from 'react';

import { Outlet } from 'react-router-dom'
import NavigationHome from './components/NavigationHome'

import Setting from '@/components/Setting';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import navListItem from '@/utils/navListItemHome'

const HomeLayout = () => {

    const [showSetting, setShowSetting] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <Header setShowDrawer={setShowDrawer} setShowSetting={setShowSetting}>
                <NavigationHome setShowDrawer={setShowDrawer} setShowSetting={setShowSetting}/>
            </Header>

            <div className="pt-14 md:pt-16">
                <Outlet></Outlet>
            </div>

            {showSetting?<Setting setShowSetting={setShowSetting} />:''}
            {showDrawer?<Drawer setShowDrawer={setShowDrawer} lisItem={navListItem} />:''}

        </>
    );
}

export default HomeLayout;
