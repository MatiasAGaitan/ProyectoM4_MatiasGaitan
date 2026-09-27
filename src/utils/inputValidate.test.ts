import { validateNewTask } from "./inputValidate";
//validateNewTask requiere por parametro (title: string, description: string)

describe('validateNewTask', () => {
    test('Devuelve errores si el titulo es invalido', () => {
        const errors = validateNewTask("", "")
        expect(errors).toBe('El titulo es obligatorio')
    })

    test('Devuelve errores si el titulo es muy corto', () => {
        const errors = validateNewTask("a", "")
        expect(errors).toBe('El titulo debe tener al menos 3 caracteres')
    })

    test('Devuelve errores si la descripcion es invalida', () => {
        const errors = validateNewTask("titulo", "")
        expect(errors).toBe('La descripcion es obligatoria')
    })

    test('Devuelve errores si la descripcion es muy corta', () => {
        const errors = validateNewTask("titulo", "a")
        expect(errors).toBe('La descripcion debe tener al menos 10 caracteres')
    })

    test('Pasa correctamente si el titulo y la descripcion son validos', () => {
        const errors = validateNewTask("titulo", "descripcion")
        expect(errors).toBe("")
    })
})