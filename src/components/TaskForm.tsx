import { useAuth } from "../features/Authenticator"
import { useState } from "react"
import type { Task, NewTaskInput } from "../types/task"
import type { TaskStatus } from "../types/status"
import { addTask } from "../services/firestore"

interface TaskFormProps {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setTaskStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>
}

function TaskForm({ setTasks, setTaskStatus }: TaskFormProps) {
    const { user } = useAuth()

    const [newTask, setNewTask] = useState<NewTaskInput>({ title: "" })
    const [errorTaskInput, setErrorTaskInput] = useState<string>("")

    //estados para agregar tareas
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errorSubmit, setErrorSubmit] = useState<string>("")


    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            setTasks(prev => [...prev, data])
            setNewTask({ title: "" })
            setTaskStatus("create-success")
        } catch (error) {
            setErrorSubmit(error instanceof Error ? error.message : "Error al agregar la tarea")
            setTaskStatus("create-error")
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setTaskStatus(null), 3000)
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

            {errorSubmit && <p className="task-state-msg error-text">{errorSubmit}</p>}

        </div>
    )
}

export default TaskForm