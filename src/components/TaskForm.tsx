import { useAuth } from "../features/Authenticator"
import { useState, useEffect } from "react"
import type { Task, NewTaskInput, EditTask } from "../types/task"
import { addTask, deleteTask, editTask, getTasksByUser } from "../services/firestore"

function TaskForm() {
    const { user } = useAuth()

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<NewTaskInput>({ title: "" })
    const [errorTaskInput, setErrorTaskInput] = useState<string>("")

    //estados para mostrar tareas
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(false)
    const [errorLoadTasks, setErrorLoadTasks] = useState<string>("")

    //estados para agregar tareas
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errorSubmit, setErrorSubmit] = useState<string>("")

    //estados para eliminar tareas
    const [errorDelete, setErrorDelete] = useState<string>("")
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

    //estados para actualizar tareas
    const [isEditing, setIsEditing] = useState<EditTask | null>(null)
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
    const [errorEdit, setErrorEdit] = useState<string>("")

    useEffect(() => {
        if (!user?.uid) return

        (async () => {
            setIsLoadingTasks(true)
            setErrorLoadTasks("")
            try {
                const data = await getTasksByUser(user.uid)
                setTasks(data)
            } catch (error) {
                console.log(error)
                setErrorLoadTasks(error instanceof Error ? error.message : "Error al obtener las tareas")
            } finally {
                setIsLoadingTasks(false)
            }
        })()
    }, [user?.uid])


    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, title: e.target.value })
    };

    const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newTask.title.trim()) {
            setErrorTaskInput("Debes ingresar una tarea")
            return
        } else if (newTask.title.trim().length < 3) {
            setErrorTaskInput("La tarea debe tener al menos 3 caracteres");
            return
        } else {
            setErrorTaskInput("")
        }

        if (!user) return
        setIsSubmitting(true)
        setErrorSubmit("")

        try {
            const data = await addTask(newTask, user.uid)
            setTasks((prev) => [...prev, data])
            setNewTask({ title: "" })
        } catch (error) {
            console.log(error)
            setErrorSubmit(error instanceof Error ? error.message : "Error al agregar la tarea")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteTask = async (id: string) => {
        setDeletingTaskId(id);
        setErrorDelete("")
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (error) {
            console.log(error)
            setErrorDelete(error instanceof Error ? error.message : "Error al eliminar la tarea")
        } finally {
            setDeletingTaskId(null)
        }
    }

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
            setTasks((prev) => prev.map((task) => task.id === id ? { ...task, ...changes } : task))
            setIsEditing(null)
        } catch (error) {
            console.log(error)
            setErrorEdit(error instanceof Error ? error.message : "Error al editar la tarea")
        } finally {
            setEditingTaskId(null)
        }
    }


    return (
        <div className="task-page">
            <p className="task-user">👤 {user?.displayName}</p>

            <form className="task-add-form" noValidate onSubmit={handleSubmitTask}>
                <label className="form-label" htmlFor="title">Nueva tarea</label>
                <div className="task-add-row">
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        name="title"
                        value={newTask.title}
                        onChange={handleTaskChange}
                        placeholder="Agrega una nueva tarea..."
                    />
                    <button className="form-button task-add-btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Agregando..." : "Agregar"}
                    </button>
                </div>
                {errorTaskInput && <p className="error-text">{errorTaskInput}</p>}
            </form>

            {isLoadingTasks && <p className="task-state-msg">Cargando tareas...</p>}
            {errorLoadTasks && <p className="task-state-msg error-text">{errorLoadTasks}</p>}
            {errorSubmit && <p className="task-state-msg error-text">{errorSubmit}</p>}
            {errorDelete && <p className="task-state-msg error-text">{errorDelete}</p>}

            {tasks.length === 0 && !isLoadingTasks && !errorLoadTasks &&
                <p className="task-state-msg">No tenés tareas todavía. ¡Crea una!</p>
            }

            <ul className="task-list">
                {tasks.map((task) => (
                    <li className="task-item" key={task.id}>
                        <div className="task-info">
                            <span className="task-title">{task.title}</span>
                            <span className={`task-status ${task.completed ? "task-status--done" : "task-status--pending"}`}>
                                {task.completed ? "Completada" : "Pendiente"}
                            </span>
                        </div>
                        <div className="task-actions">
                            <button
                                className="task-btn task-btn--edit"
                                type="button"
                                disabled={deletingTaskId === task.id || editingTaskId === task.id}
                                onClick={() => setIsEditing(task)}>
                                {editingTaskId === task.id ? "Editando..." : "Editar"}
                            </button>
                            <button
                                className="task-btn task-btn--delete"
                                type="button"
                                disabled={deletingTaskId === task.id || editingTaskId === task.id}
                                onClick={() => handleDeleteTask(task.id)}>
                                {deletingTaskId === task.id ? "Eliminando..." : "Eliminar"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="task-total">Total: {tasks.length} tarea{tasks.length !== 1 ? "s" : ""}</p>

            {isEditing && (
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
                                onClick={() => setIsEditing((prev) => {
                                    if (!prev) return null;
                                    return { ...prev, completed: !prev.completed };
                                })}
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskForm