import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav className="layout-nav">
                <Link to="/">Inicio</Link>
                {" | "}
                <Link to="/about">Acerca de</Link>
                {" | "}
                <Link to="/tasks">Tareas</Link>
                {" | "}
                <Link to="/login">Iniciar Seccion</Link>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                {/* <p>&copy; 2024 Proyecto Final. Todos los derechos reservados.</p> */}
            </footer>
        </div>
    )
}

export default Layout