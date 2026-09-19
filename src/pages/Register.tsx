import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"

function Register() {
    return (
        <div className="page-container">
            <h1>Registrarse</h1>
            <RegisterForm />
            <div className="form-actions">
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    )
}

export default Register