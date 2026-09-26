import { useState } from "react";
import { useAuth } from "../features/Authenticator.tsx";
import { useNavigate } from "react-router-dom";
import { validateErrorsLogin } from "../utils/authValidation.ts";
import type { LoginFormState, FieldError } from "../types/auth.ts";
import { getAuthErrorMessage } from "../features/authErrors.ts";

function LoginForm() {

    const INITIAL_STATE: LoginFormState = {
        email: "",
        password: "",
    }

    const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
    const [errors, setErrors] = useState<FieldError>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false)
    const [isSubmitError, setIsSubmitError] = useState<string>("")
    const navigate = useNavigate()

    const { signIn, signInWithGoogle } = useAuth()

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsSubmitSuccess(false)
        setIsSubmitError("")

        const errorsValidated = validateErrorsLogin(form);
        setErrors(errorsValidated);

        if (Object.keys(errorsValidated).length > 0) return

        setIsSubmitting(true)
        try {
            await signIn(form.email, form.password)
            setIsSubmitSuccess(true)
            setForm(INITIAL_STATE)
            navigate("/tasks", { replace: true })
        } catch (error) {
            setIsSubmitError(getAuthErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleWithInGoogle = async (): Promise<void> => {
        setIsSubmitSuccess(false)
        setIsSubmitError("")
        setIsSubmitting(true)

        try {
            await signInWithGoogle()
            setIsSubmitSuccess(true)
            navigate("/tasks", { replace: true })
        } catch (error) {
            setIsSubmitError(getAuthErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <form
            className="form-container"
            onSubmit={handleSignIn} noValidate
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

            <button
                className="form-button"
                onClick={handleWithInGoogle}
                disabled={isSubmitting}
                type="button"
            >
                {isSubmitting ? "Enviando..." : "Iniciar sesión con Google"}
            </button>

            {isSubmitSuccess && <p className="success-text"> Formulario enviado exitosamente </p>}
            {isSubmitError && <p className="main-error"> {isSubmitError} </p>}

        </form>
    )
}

export default LoginForm