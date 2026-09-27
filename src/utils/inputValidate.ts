export function validateNewTask(title: string, description: string) {
    if (!title.trim()) {
        return "El titulo es obligatorio"
    } else if (title.trim().length < 3) {
        return "El titulo debe tener al menos 3 caracteres"
    } else if (!description.trim()) {
        return "La descripcion es obligatoria"
    } else if (description.trim().length < 10) {
        return "La descripcion debe tener al menos 10 caracteres"
    } else {
        return ""
    }
}
