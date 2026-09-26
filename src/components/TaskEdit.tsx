import { useState } from "react"
import type { EditTaskInput, Task } from "../types/task"
import type { TaskStatus } from "../types/status"
import { editTask } from "../services/firestore"
import { validateNewTask } from "../utils/inputValidate"

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
        const { name, value } = e.target
        setIsEditing(prev => {
            if (!prev) return null
            return { ...prev, [name]: value }
        })
    }

    const handleEditTask = async (e: React.FormEvent<HTMLFormElement>, id: string, changes: EditTaskInput) => {
        e.preventDefault()

        const errorMsg = validateNewTask(changes.title, changes.description)
        setErrorEdit(errorMsg)
        if (errorMsg) return

        setEditingTaskId(id)
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
                    onSubmit={(e) => handleEditTask(e, isEditing.id, { title: isEditing.title, description: isEditing.description, completed: isEditing.completed })}
                    noValidate
                >
                    <label className="form-label" htmlFor="title">Titulo</label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        name="title"
                        value={isEditing.title}
                        onChange={handleEditChange}
                    />

                    <label className="form-label" htmlFor="description">Descripción</label>
                    <input
                        className="form-input"
                        type="text"
                        id="description"
                        name="description"
                        value={isEditing.description}
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