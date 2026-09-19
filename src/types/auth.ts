//Tipado del formulario para login
export interface LoginFormState {
    email: string;
    password: string;
}

//Tipado del formulario para register
export interface RegisterFormState {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

// Tipado del error
export type FieldError = Partial<Record<keyof LoginFormState | keyof RegisterFormState, string>>