import { useState } from "react"
import type { Task } from "../types/task"
import type { TaskStatus } from "../types/status"
import { editTask } from "../services/firestore"

interface TaskEditProps {
    isEditing: Task
    setIsEditing: React.Dispatch<React.SetStateAction<Task | null>>
    editingTaskId: string | null
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setTaskStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>

}

function TaskEdit({ isEditing, setIsEditing, editingTaskId, setEditingTaskId, setTasks, setTaskStatus }: TaskEditProps) {

    const [errorEdit, setErrorEdit] = useState<string>("")

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditing(prev => {
            if (!prev) return null
            return { ...prev, title: e.target.value }
        })
    }

    const handleEditTask = async (e: React.FormEvent<HTMLFormElement>, id: string, changes: Partial<Task>) => {
        e.preventDefault()

        if (!changes.title?.trim()) {
            setErrorEdit("Debes ingresar una tarea")
            return
        } else if (changes.title.trim().length < 3) {
            setErrorEdit("La tarea debe tener al menos 3 caracteres")
            return
        } else {
            setErrorEdit("")
        }

        setEditingTaskId(id)
        setErrorEdit("")
        try {
            await editTask(id, changes);
            setTasks(prev => {
                if (!prev) return []
                return prev.map((task) => task.id === id ? { ...task, ...changes } : task)
            })
            setIsEditing(null)
            setTaskStatus("edit-success")
        } catch (error) {
            setErrorEdit(error instanceof Error ? error.message : "Error al editar la tarea")
            setTaskStatus("edit-error")
        } finally {
            setEditingTaskId(null)
            setTimeout(() => {
                setTaskStatus(null)
            }, 3000)

        }
    }

    const handleEditTaskCompleted = () => {
        setIsEditing(prev => {
            if (!prev) return null
            return { ...prev, completed: !prev.completed }
        })
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">Editar tarea</h2>
                <form
                    className="modal-form"
                    onSubmit={(e) => handleEditTask(e, isEditing.id, { title: isEditing.title, completed: isEditing.completed })}
                    noValidate
                >
                    <input
                        className="form-input"
                        type="text"
                        value={isEditing.title}
                        onChange={handleEditChange}
                    />
                    {errorEdit && <p className="error-text">{errorEdit}</p>}
                    <button
                        className={`task-btn task-btn--toggle ${isEditing.completed ? "task-btn--done" : ""}`}
                        type="button"
                        onClick={handleEditTaskCompleted}
                        disabled={editingTaskId === isEditing.id}>
                        {isEditing.completed ? "✅ Marcar como pendiente" : "⬜ Marcar como completada"}
                    </button>
                    <div className="modal-actions">
                        <button
                            className="task-btn task-btn--cancel"
                            type="button"
                            onClick={() => { setErrorEdit(""); setIsEditing(null) }}
                            disabled={editingTaskId === isEditing.id}>
                            Cancelar
                        </button>
                        <button
                            className="form-button"
                            type="submit"
                            disabled={editingTaskId === isEditing.id}>
                            {editingTaskId === isEditing.id ? "Guardando..." : "Guardar"}
                        </button>

                    </div>
                </form>

                {errorEdit && <p className="task-state-msg error-text">{errorEdit}</p>}
            </div>
        </div>
    )
}

export default TaskEdit