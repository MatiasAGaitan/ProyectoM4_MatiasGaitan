import { validateErrorsLogin, validateErrorsRegister } from "./authValidation";

describe("authValidation", () => {
    describe("validateErrorsLogin", () => {
        test("Devuelve errores si no se recibe un email", () => {
            const errors = validateErrorsLogin({ email: "", password: "password" })
            expect(errors.email).toBe('El email es requerido')
        })

        test("Devuelve errores si el email tiene formato incorrecto", () => {
            const errors = validateErrorsLogin({ email: "a", password: "password" })
            expect(errors.email).toBe('El email tiene que tener formato valido')
        })

        test("Devuelve errores si no se recibe la contraseña", () => {
            const errors = validateErrorsLogin({ email: "email", password: "" })
            expect(errors.password).toBe('La contraseña es requerida')
        })

        test("Devuelve errores si la contraseña es menor a 6 caracteres", () => {
            const errors = validateErrorsLogin({ email: "email", password: "a" })
            expect(errors.password).toBe('La contraseña debe tener al menos 6 caracteres')
        })

        test("Pasa correctamente si el email y la contraseña son validos", () => {
            const errors = validateErrorsLogin({ email: "example@example.com", password: "password" })
            expect(errors).toEqual({})
        })
    })

    describe("validateErrorsRegister", () => {
        test("Devuelve errores si no se recibe un nombre", () => {
            const errors = validateErrorsRegister({ name: "", email: "email", password: "password", passwordConfirmation: "password" })
            expect(errors.name).toBe('El nombre es requerido')
        })

        test("Devuelve errores si el nombre es menor a 3 caracteres", () => {
            const errors = validateErrorsRegister({ name: "a", email: "email", password: "password", passwordConfirmation: "password" })
            expect(errors.name).toBe('El nombre debe tener mas de 3 caracteres')
        })
        test("Devuelve errores si no se recibe un email", () => {
            const errors = validateErrorsRegister({ name: "name", email: "", password: "password", passwordConfirmation: "password" })
            expect(errors.email).toBe('El email es requerido')
        })

        test("Devuelve errores si el email tiene formato incorrecto", () => {
            const errors = validateErrorsRegister({ name: "name", email: "a", password: "password", passwordConfirmation: "password" })
            expect(errors.email).toBe('El email tiene que tener formato valido')
        })

        test("Devuelve errores si no se recibe la contraseña", () => {
            const errors = validateErrorsRegister({ name: "name", email: "email", password: "", passwordConfirmation: "password" })
            expect(errors.password).toBe('La contraseña es requerida')
        })

        test("Devuelve errores si la contraseña es menor a 6 caracteres", () => {
            const errors = validateErrorsRegister({ name: "name", email: "email", password: "a", passwordConfirmation: "password" })
            expect(errors.password).toBe('La contraseña debe tener mas de 6 caracteres')
        })

        test("Devuelve errores si no se recibe la confirmacion de la contraseña", () => {
            const errors = validateErrorsRegister({ name: "name", email: "email", password: "password", passwordConfirmation: "" })
            expect(errors.passwordConfirmation).toBe('La confirmacion de la contraseña es requerida')
        })

        test("Devuelve errores si la confirmacion de la contraseña no coincide", () => {
            const errors = validateErrorsRegister({ name: "name", email: "email", password: "password", passwordConfirmation: "a" })
            expect(errors.passwordConfirmation).toBe('La confirmacion de la contraseña no coincide')
        })

        test("Pasa correctamente si el email y la contraseña son validos", () => {
            const errors = validateErrorsRegister({ name: "name", email: "example@example.com", password: "password", passwordConfirmation: "password" })
            expect(errors).toEqual({})
        })
    })
})