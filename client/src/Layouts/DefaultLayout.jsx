import { Outlet } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout