import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/Authenticator";
import { Home, ListTodo, Info, LogOut, LogIn, User } from "lucide-react";

function Layout() {
    const { logout, user } = useAuth()
    return (
        <div className="layout-container">
            <aside className="layout-sidebar">
                <div className="layout-brand">
                    <span className="layout-brand-icon">✓</span>
                    <span className="layout-brand-text">MateCode</span>
                </div>

                <nav className="layout-nav">
                    <Link to="/"><Home />Inicio</Link>
                    <Link to="/tasks"><ListTodo />Tareas</Link>
                    <Link to="/about"><Info />Acerca de</Link>
                </nav>

                <div className="layout-footer">
                    <p>© 2026 MateCode. Todos los derechos reservados.</p>
                </div>
            </aside>

            <div className="layout-content">
                <header className="layout-header">
                    {user && (
                        <p className="layout-user">
                            <User /> {user.displayName}
                        </p>
                    )}

                    {user && (
                        <button className="layout-button" onClick={logout}>
                            <LogOut /> Cerrar sesión
                        </button>
                    )}

                    {!user && (
                        <Link className="layout-login-link" to="/login">
                            <LogIn /> Iniciar sesión
                        </Link>
                    )}
                </header>

                <main className="layout-main">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default Layout