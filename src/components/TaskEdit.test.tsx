import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import TaskEdit from "./TaskEdit"
import type { Task } from "../types/task"

vi.mock("../services/firestore")

const task: Task = {
    id: "1",
    title: "Tarea original",
    description: "Descripcion original",
    completed: false,
    userId: "user1",
}

describe("TaskEdit", () => {
    test("renderiza los datos actuales de la tarea", () => {
        render(
            <TaskEdit
                isEditing={task}
                setIsEditing={vi.fn()}
                editingTaskId={null}
                setEditingTaskId={vi.fn()}
                setTasks={vi.fn()}
                setTaskStatus={vi.fn()}
            />
        )

        expect(screen.getByDisplayValue("Tarea original")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Descripcion original")).toBeInTheDocument()
    })

    test("cancela la edicion", async () => {
        const user = userEvent.setup()
        const setIsEditing = vi.fn()

        render(
            <TaskEdit
                isEditing={task}
                setIsEditing={setIsEditing}
                editingTaskId={null}
                setEditingTaskId={vi.fn()}
                setTasks={vi.fn()}
                setTaskStatus={vi.fn()}
            />
        )

        await user.click(screen.getByRole("button", { name: /cancelar/i }))

        expect(setIsEditing).toHaveBeenCalledWith(null)
    })

})