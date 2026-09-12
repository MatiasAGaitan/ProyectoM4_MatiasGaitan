import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
                <Link to="/">Inicio</Link>
                {" | "}
                <Link to="/about">Acerca de</Link>
                {" | "}
                <Link to="/tasks">Tareas</Link>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </div>
    )
}

export default Layout