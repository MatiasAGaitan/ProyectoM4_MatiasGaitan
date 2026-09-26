import type { TaskStatus } from "../types/status"

interface StatusProps {
    taskStatus: TaskStatus

}
function RenderStatus({ taskStatus }: StatusProps) {
    if (taskStatus === "create-success") {
        return (
            <div className="toast toast--success">
                <p>✅ Tarea creada correctamente</p>
            </div>
        )
    } else if (taskStatus === "create-error") {
        return (
            <div className="toast toast--error">
                <p>❌ Error al crear la tarea</p>
            </div>
        )
    } else if (taskStatus === "edit-success") {
        return (
            <div className="toast toast--success">
                <p>✅ Tarea editada correctamente</p>
            </div>
        )
    } else if (taskStatus === "edit-error") {
        return (
            <div className="toast toast--error">
                <p>❌ Error al editar la tarea</p>
            </div>
        )
    } else if (taskStatus === "delete-success") {
        return (
            <div className="toast toast--success">
                <p>✅ Tarea eliminada correctamente</p>
            </div>
        )
    } else if (taskStatus === "delete-error") {
        return (
            <div className="toast toast--error">
                <p>❌ Error al eliminar la tarea</p>
            </div>
        )
    } else {
        return null
    }
}

export default RenderStatus