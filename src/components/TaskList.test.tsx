import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import TaskList from "./TaskList"
import { deleteTask } from "../services/firestore"
import type { Task } from "../types/task"

vi.mock("../services/firestore")

const tasks: Task[] = [
    {
        id: "1",
        title: "Tarea 1",
        description: "Descripcion de tarea 1",
        completed: false,
        userId: "user1",
    },
    {
        id: "2",
        title: "Tarea 2",
        description: "Descripcion de tarea 2",
        completed: true,
        userId: "user1",
    },
]

describe("TaskList", () => {
    test("renderiza las tareas", () => {
        render(
            <TaskList
                tasks={tasks}
                setTasks={vi.fn()}
                setIsEditing={vi.fn()}
                editingTaskId={null}
                setStatusDelete={vi.fn()}
            />
        )

        expect(screen.getByText("Tarea 1")).toBeInTheDocument()
        expect(screen.getByText("Descripcion de tarea 1")).toBeInTheDocument()
        expect(screen.getByText("Tarea 2")).toBeInTheDocument()
        expect(screen.getByText("Descripcion de tarea 2")).toBeInTheDocument()
    })

    test("muestra el estado de cada tarea", () => {
        render(
            <TaskList
                tasks={tasks}
                setTasks={vi.fn()}
                setIsEditing={vi.fn()}
                editingTaskId={null}
                setStatusDelete={vi.fn()}
            />
        )

        expect(screen.getByText("Pendiente")).toBeInTheDocument()
        expect(screen.getByText("Completada")).toBeInTheDocument()
    })

    test("llama a setIsEditing al hacer click en editar", async () => {
        const user = userEvent.setup()
        const setIsEditing = vi.fn()

        render(
            <TaskList
                tasks={tasks}
                setTasks={vi.fn()}
                setIsEditing={setIsEditing}
                editingTaskId={null}
                setStatusDelete={vi.fn()}
            />
        )

        const buttons = screen.getAllByRole("button", { name: /editar/i })

        await user.click(buttons[0])

        expect(setIsEditing).toHaveBeenCalledWith(tasks[0])
    })

    test("elimina una tarea", async () => {
        const user = userEvent.setup()
        const setTasks = vi.fn()
        const setStatusDelete = vi.fn()

        vi.mocked(deleteTask).mockResolvedValueOnce()

        render(
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setIsEditing={vi.fn()}
                editingTaskId={null}
                setStatusDelete={setStatusDelete}
            />
        )

        const buttons = screen.getAllByRole("button", { name: /eliminar/i })

        await user.click(buttons[0])

        expect(deleteTask).toHaveBeenCalledWith("1")
        expect(setTasks).toHaveBeenCalled()
        expect(setStatusDelete).toHaveBeenCalledWith("delete-success")
    })
})