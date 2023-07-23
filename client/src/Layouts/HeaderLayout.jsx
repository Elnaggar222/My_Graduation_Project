import React from 'react'
import Header from '../components/layout/Header'
import { Outlet } from 'react-router-dom'

const HeaderLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )

}

export default HeaderLayout