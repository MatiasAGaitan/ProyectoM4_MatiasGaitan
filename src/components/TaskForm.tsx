import { useAuth } from "../features/Authenticator"
import { useState } from "react"
import type { Task, NewTaskInput } from "../types/task"
import type { TaskStatus } from "../types/status"
import { addTask } from "../services/firestore"
import { validateNewTask } from "../utils/inputValidate"
import { Plus } from "lucide-react"

interface TaskFormProps {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setTaskStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>
}

function TaskForm({ setTasks, setTaskStatus }: TaskFormProps) {
    const { user } = useAuth()

    const [newTask, setNewTask] = useState<NewTaskInput>({ title: "", description: "" })
    const [errorTaskInput, setErrorTaskInput] = useState<string>("")

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errorSubmit, setErrorSubmit] = useState<string>("")


    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errorMsg = validateNewTask(newTask.title, newTask.description)
        setErrorTaskInput(errorMsg)

        if (errorMsg) return

        if (!user) return
        setIsSubmitting(true)
        setErrorSubmit("")

        try {
            const data = await addTask(newTask, user.uid)
            setTasks(prev => [...prev, data])
            setNewTask({ title: "", description: "" })
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

            <form className="task-add-form" noValidate onSubmit={handleSubmitTask}>
                <p className="task-form-add">Nueva tarea</p>
                <div className="task-add-row">
                    <label className="form-label" htmlFor="title">Titulo</label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        name="title"
                        value={newTask.title}
                        onChange={handleTaskChange}
                        placeholder="Agrega el titulo de la nueva tarea..."
                    />
                    <label className="form-label" htmlFor="description">Descripción</label>
                    <input
                        className="form-input"
                        type="text"
                        id="description"
                        name="description"
                        value={newTask.description}
                        onChange={handleTaskChange}
                        placeholder="Agrega la descripción de la nueva tarea..."
                    />

                    <button className="form-button task-add-btn" type="submit" disabled={isSubmitting}>
                        <Plus /> {isSubmitting ? "Agregando..." : "Agregar"}
                    </button>
                </div>
                {errorTaskInput && <p className="error-text">{errorTaskInput}</p>}
            </form>

            {errorSubmit && <p className="task-state-msg error-text">{errorSubmit}</p>}

        </div>
    )
}

export default TaskForm