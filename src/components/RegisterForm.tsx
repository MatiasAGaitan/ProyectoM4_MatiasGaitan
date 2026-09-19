import { useState } from "react";
import type { FieldError, RegisterFormState } from "../types/auth.ts"
import { validateErrorsRegister } from "../utils/authValidation.ts";
import simulateSendForm from "./SimulateSendForm.tsx";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate()

    // Estado inicial del formulario
    const INITIAL_STATE: RegisterFormState = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    }

    const [formRegister, setFormRegister] = useState<RegisterFormState>(INITIAL_STATE)
    const [errorsRegister, setErrorsRegister] = useState<FieldError>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false)
    const [isSubmitError, setIsSubmitError] = useState<string>("")

    const handlerFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Formulario enviado? False
        setIsSubmitSuccess(false)
        // Reseteamos los errores
        setIsSubmitError("")

        // Valida el formulario
        const errorsValidated = validateErrorsRegister(formRegister)
        setErrorsRegister(errorsValidated);

        if (Object.keys(errorsValidated).length > 0) return
        //Iniciando el envio del formulario
        setIsSubmitting(true)

        try {
            await simulateSendForm()
            //Formulario enviado
            setIsSubmitSuccess(true)
            // Limpiamos el formulario
            setFormRegister(INITIAL_STATE)
            //Navegamos a la ruta "/tasks"
            navigate("/tasks", { replace: true })
        } catch (error) {
            error instanceof Error ?
                setIsSubmitError(error.message)
                : setIsSubmitError("Ocurrio un error al enviar el formulario")
        } finally {
            // Formulario enviado
            setIsSubmitting(false)
            console.log("reinicio de boton")
        }
    }

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormRegister((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <form 
            className="form-container"
            onSubmit={handlerFormSubmit} 
            noValidate
        >
            <div className="form-group">
                <label className="form-label" htmlFor="name">Nombre:</label>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingresa tu nombre"
                    value={formRegister.name}
                    onChange={handlerInputChange}
                />
                {errorsRegister.name && <p className="error-text"> {errorsRegister.name} </p>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="email">Email:</label>
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu email"
                    value={formRegister.email}
                    onChange={handlerInputChange}
                />
                {errorsRegister.email && <p className="error-text"> {errorsRegister.email} </p>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="password">Password:</label>
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={formRegister.password}
                    onChange={handlerInputChange}
                />
                {errorsRegister.password && <p className="error-text"> {errorsRegister.password} </p>}
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="passwordConfirmation">Confirmar Password:</label>
                <input
                    className="form-input"
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="Confirma tu contraseña"
                    value={formRegister.passwordConfirmation}
                    onChange={handlerInputChange}
                />
                {errorsRegister.passwordConfirmation && <p className="error-text"> {errorsRegister.passwordConfirmation} </p>}
            </div>

            <button
                className="form-button"
                disabled={isSubmitting}
                type="submit">
                {isSubmitting ? "Enviando..." : "Registrarse"}
            </button>

            {isSubmitSuccess && <p className="success-text"> Registro exitoso </p>}
            {isSubmitError && <p className="main-error"> {isSubmitError} </p>}
        </form>
    )
}

export default RegisterForm