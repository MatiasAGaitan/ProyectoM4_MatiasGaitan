import type { Task } from "../types/task"
import type { TaskStatus } from "../types/status"
import { useState, useEffect } from "react"
import { useAuth } from "../features/Authenticator";
import { getTasksByUser } from "../services/firestore";
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList";
import TaskEdit from "../components/TaskEdit";
import SendEmailButton from "../components/SendEmailButton";
import RenderStatus from "../components/RenderStatus";

function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState<Task | null>(null)
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(false)
    const [errorLoadTasks, setErrorLoadTasks] = useState<string>("")

    const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null)


    const { user } = useAuth()


    useEffect(() => {
        if (!user?.uid) return

        (async () => {
            setIsLoadingTasks(true)
            setErrorLoadTasks("")
            try {
                const data = await getTasksByUser(user.uid)
                setTasks(data)
            } catch (error) {
                setErrorLoadTasks(error instanceof Error ? error.message : "Error al obtener las tareas")
            } finally {
                setIsLoadingTasks(false)
            }
        })()
    }, [user?.uid])


    return (
        <div className="tasks-page">
            <TaskForm
                setTasks={setTasks}
                setTaskStatus={setTaskStatus}
            />

            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setIsEditing={setIsEditing}
                editingTaskId={editingTaskId}
                setStatusDelete={setTaskStatus}
            />

            {isEditing && (
                <TaskEdit
                    isEditing={isEditing}
                    editingTaskId={editingTaskId}
                    setEditingTaskId={setEditingTaskId}
                    setIsEditing={setIsEditing}
                    setTasks={setTasks}
                    setTaskStatus={setTaskStatus}
                />
            )}

            {tasks.length === 0 && !isLoadingTasks && !errorLoadTasks &&
                <p className="task-state-msg">No tenés tareas todavía. ¡Crea una!</p>}

            <SendEmailButton tasks={tasks} />

            <p className="task-total">Total: {tasks.length} tarea{tasks.length !== 1 ? "s" : ""}</p>

            <RenderStatus
                taskStatus={taskStatus}
            />
        </div>
    )
}

export default Tasks
