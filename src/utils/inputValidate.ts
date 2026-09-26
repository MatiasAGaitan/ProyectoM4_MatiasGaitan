export function validateNewTask(title: string, description: string) {
    if (!title.trim()) {
        return "Debes ingresar una tarea"
    } else if (title.trim().length < 3) {
        return "La tarea debe tener al menos 3 caracteres"
    } else if (!description.trim()) {
        return "Debes ingresar una descripción"
    } else if (description.trim().length < 10) {
        return "La descripción debe tener al menos 10 caracteres"
    } else {
        return ""
    }
}
