import { useState } from "react";
import simulateSendForm from "./SimulateSendForm.tsx";
import { useNavigate } from "react-router-dom";
import { validateErrorsLogin } from "../utils/authValidation.ts";
import type { LoginFormState, FieldError } from "../types/auth.ts";

function LoginForm() {

    // Estado inicial del formulario
    const INITIAL_STATE: LoginFormState = {
        email: "",
        password: "",
    }

    // Estado del formulario
    const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
    // Estado de los errores para los inputs
    const [errors, setErrors] = useState<FieldError>({})
    // Estado para enviando formulario
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    // Estado de formulario enviado
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false)
    // Estado de errores cuando en la respuesta del servidor
    const [isSubmitError, setIsSubmitError] = useState<string>("")

    // Para navegar a otra ruta
    const navigate = useNavigate()

    // Manejo del envio del formulario
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Formulario no enviado por lo tanto success es false
        setIsSubmitSuccess(false)
        // Reseteamos el error
        setIsSubmitError("")

        const errorsValidated = validateErrorsLogin(form);
        setErrors(errorsValidated);

        if (Object.keys(errorsValidated).length > 0) return

        //Enviando formulario
        setIsSubmitting(true)
        try {
            await simulateSendForm()

            //Formularo enviado por lo tanto true
            setIsSubmitSuccess(true)

            //Limpiamos el formulario
            setForm(INITIAL_STATE)

            // Navegamos a la ruta "/tasks"
            navigate("/tasks", { replace: true })
        } catch (error) {
            error instanceof Error ?
                setIsSubmitError(error.message)
                : setIsSubmitError("Ocurrio un error al enviar el formulario")

        } finally {
            //Formulario enviado por lo tanto false
            setIsSubmitting(false)
        }
    }

    // Manejo del cambio de los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }



    return (
        <form
            className="form-container"
            onSubmit={handleFormSubmit} noValidate
        >
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email:</label>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingrese su email"
                    value={form.email}
                    onChange={handleInputChange}
                />
                {errors.email && <p className="error-text"> {errors.email} </p>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="password">Contraseña:</label>
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={form.password}
                    onChange={handleInputChange}
                />
                {errors.password && <p className="error-text"> {errors.password} </p>}
            </div>

            <button
                className="form-button"
                disabled={isSubmitting}
                type="submit"
            >
                {isSubmitting ? "Enviando..." : "Enviar"}
            </button>

            {isSubmitSuccess && <p className="success-text"> Formulario enviado exitosamente </p>}
            {isSubmitError && <p className="main-error"> {isSubmitError} </p>}

        </form>
    )
}

export default LoginForm