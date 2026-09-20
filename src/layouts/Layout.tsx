import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/Authenticator";

function Layout() {
    const { logout, user } = useAuth()
    return (
        <div className="layout-container">
            <nav className="layout-nav">
                <Link to="/">Inicio</Link>
                {" | "}
                <Link to="/about">Acerca de</Link>
                {" | "}
                <Link to="/tasks">Tareas</Link>
                {" | "}
                {!user && <Link to="/login">Iniciar Seccion</Link>}
                {user && <button className="layout-button" onClick={logout}>Cerrar sesión</button>}
            </nav>
            <main className="layout-main">
                <Outlet />
            </main>
            <footer className="layout-footer">
                {/* <p>&copy; 2024 Proyecto Final. Todos los derechos reservados.</p> */}
            </footer>
        </div>
    )
}

export default Layout