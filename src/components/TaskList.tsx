
import { useState } from "react"
import { deleteTask } from "../services/firestore"
import type { Task } from "../types/task"
import type { TaskStatus } from "../types/status"
import { Pencil, Trash2 } from "lucide-react"

interface TaskListProps {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setIsEditing: React.Dispatch<React.SetStateAction<Task | null>>
    editingTaskId: string | null
    setStatusDelete: React.Dispatch<React.SetStateAction<TaskStatus | null>>
}


function TaskList({ tasks, setTasks, setIsEditing, editingTaskId, setStatusDelete }: TaskListProps) {

    const [errorDelete, setErrorDelete] = useState<string>("")
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

    const handleDeleteTask = async (id: string) => {
        setDeletingTaskId(id);
        setErrorDelete("")
        setStatusDelete(null)
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
            setStatusDelete("delete-success")
        } catch (error) {
            setErrorDelete(error instanceof Error ? error.message : "Error al eliminar la tarea")
            setStatusDelete("delete-error")
        } finally {
            setDeletingTaskId(null)
            setTimeout(() => setStatusDelete(null), 3000)
        }
    }

    return (
        <>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li className="task-item" key={task.id}>
                        <div className="task-info">
                            <p className="task-title">{task.title}</p>
                            <p className="task-description">{task.description}</p>
                            <p className={`task-status ${task.completed ? "task-status--done" : "task-status--pending"}`}>
                                {task.completed ? "Completada" : "Pendiente"}
                            </p>
                        </div>
                        <div className="task-actions">
                            <button
                                className="task-btn task-btn--edit"
                                type="button"
                                disabled={deletingTaskId === task.id || editingTaskId === task.id}
                                onClick={() => setIsEditing(task)}>
                                {editingTaskId === task.id ? "Editando..." : "Editar"}
                                <Pencil />
                            </button>
                            <button
                                className="task-btn task-btn--delete"
                                type="button"
                                disabled={deletingTaskId === task.id || editingTaskId === task.id}
                                onClick={() => handleDeleteTask(task.id)}>
                                {deletingTaskId === task.id ? "Eliminando..." : "Eliminar"}
                                <Trash2 />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {errorDelete && <p className="task-state-msg error-text">{errorDelete}</p>}

        </>
    )
}

export default TaskList