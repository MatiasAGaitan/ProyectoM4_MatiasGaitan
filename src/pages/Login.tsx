import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
function Login() {
    return (
        <div className="page-container">
            <h1>Inciar Seccion</h1>
            <LoginForm />
            <div className="form-actions">
                <Link to="/register">¿No tienes una cuenta? Registrate</Link>
                {" | "}
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    )
}

export default Login
