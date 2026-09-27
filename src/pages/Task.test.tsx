import { screen, render } from "@testing-library/react"
import { vi } from "vitest"
import { getTasksByUser } from "../services/firestore"
import Tasks from "./Tasks"

vi.mock("../services/firestore")

vi.mock("../features/Authenticator", () => ({
    useAuth: () => ({
        user: {
            uid: "user1",
            email: "test@test.com",
            displayName: "Test User",
        },
        loading: false,
        signUp: vi.fn(),
        signIn: vi.fn(),
        signInWithGoogle: vi.fn(),
        logout: vi.fn(),
    }),
}))

describe("Testeando componente Task", () => {
    test("validar que se funcione getTasksByUser y el render del componente Tasks", async () => {
        vi.mocked(getTasksByUser).mockResolvedValueOnce(
            [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Description 1",
                    completed: false,
                    userId: "user1"
                }
            ]
        )

        render(<Tasks />)

        const titulo = await screen.findByText("Task 1")
        const descripcion = await screen.findByText("Description 1")

        expect(titulo).toBeInTheDocument()
        expect(descripcion).toBeInTheDocument()
    })
})