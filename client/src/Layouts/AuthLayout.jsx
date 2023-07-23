import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <main className="Auth_Layout">
            <Outlet />
        </main>
    )
}

export default AuthLayout