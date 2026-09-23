import type { LoginFormState, RegisterFormState, FieldError } from "../types/auth.ts"

// Validacion de errores login
export const validateErrorsLogin = (form: LoginFormState): FieldError => {
    const err: FieldError = {}

    if (form.email.trim() === "") {
        err.email = "El email es requerido"
    } else if (!form.email.includes('@') || !form.email.includes('.')) {
        err.email = "El email tiene que tener formato valido"
    }

    if (form.password.trim() === "") {
        err.password = "La contraseña es requerida"
    } else if (form.password.length < 6) {
        err.password = "La contraseña debe tener al menos 6 caracteres"
    }

    return err
}

// validacion de errores register
export const validateErrorsRegister = (form: RegisterFormState): FieldError => {
    const err: FieldError = {}

    if (!form.name.trim()) {
        err.name = "El nombre es requerido"
    } else if (form.name.length < 3) {
        err.name = "El nombre debe tener mas de 3 caracteres"
    } else if (!form.email.trim()) {
        err.email = "El email es requerido"
    } else if (!form.email.includes('@') || !form.email.includes('.')) {
        err.email = "El email tiene que tener formato valido"
    }

    if (form.password.trim() === "") {
        err.password = "La contraseña es requerida"
    } else if (form.password.length < 6) {
        err.password = "La contraseña debe tener mas de 6 caracteres"
    }

    if (form.passwordConfirmation.trim() === "") {
        err.passwordConfirmation = "La confirmacion de la contraseña es requerida"
    } else if (form.passwordConfirmation !== form.password) {
        err.passwordConfirmation = "La confirmacion de la contraseña no coincide"
    }

    return err
}