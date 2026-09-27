import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import TaskForm from "./TaskForm"
import { addTask } from "../services/firestore"

vi.mock("../services/firestore")

vi.mock("../features/Authenticator", () => ({
    useAuth: () => ({
        user: {
            uid: "user1",
            email: "test@test.com",
            displayName: "Test User",
        },
    }),
}))

describe("TaskForm", () => {
    test("renderiza los campos y el boton", () => {
        render(
            <TaskForm
                setTasks={vi.fn()}
                setTaskStatus={vi.fn()}
            />
        )

        expect(screen.getByLabelText("Titulo")).toBeInTheDocument()
        expect(screen.getByLabelText("Descripción")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /agregar/i })).toBeInTheDocument()
    })

    test("muestra error si se envia vacio", async () => {
        const user = userEvent.setup()

        render(
            <TaskForm
                setTasks={vi.fn()}
                setTaskStatus={vi.fn()}
            />
        )

        await user.click(screen.getByRole("button", { name: /agregar/i }))

        expect(screen.getByText("El titulo es obligatorio")).toBeInTheDocument()
    })

    test("crea una tarea con datos validos", async () => {
        const user = userEvent.setup()
        const setTasks = vi.fn()
        const setTaskStatus = vi.fn()

        vi.mocked(addTask).mockResolvedValueOnce({
            id: "1",
            title: "Nueva tarea",
            description: "Descripcion valida",
            completed: false,
            userId: "user1",
        })

        render(
            <TaskForm
                setTasks={setTasks}
                setTaskStatus={setTaskStatus}
            />
        )

        await user.type(screen.getByLabelText("Titulo"), "Nueva tarea")
        await user.type(screen.getByLabelText("Descripción"), "Descripcion valida")
        await user.click(screen.getByRole("button", { name: /agregar/i }))

        expect(addTask).toHaveBeenCalledWith(
            {
                title: "Nueva tarea",
                description: "Descripcion valida",
            },
            "user1"
        )

        expect(setTasks).toHaveBeenCalled()
        expect(setTaskStatus).toHaveBeenCalledWith("create-success")
    })
})