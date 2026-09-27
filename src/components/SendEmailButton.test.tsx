import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import SendEmailButton from "./SendEmailButton"
import type { Task } from "../types/task"

const tasks: Task[] = [
    {
        id: "1",
        title: "Tarea 1",
        description: "Descripcion de tarea 1",
        completed: false,
        userId: "user1",
    },
]

vi.mock("../features/Authenticator", () => ({
    useAuth: () => ({
        user: {
            uid: "user1",
            email: "test@test.com",
            displayName: "Test User",
        },
    }),
}))

describe("SendEmailButton", () => {
    test("renderiza el boton si hay usuario", () => {
        render(<SendEmailButton tasks={tasks} />)

        expect(
            screen.getByRole("button", { name: /enviar resumen por email/i })
        ).toBeInTheDocument()
    })

    test("envia el resumen por email", async () => {
        const user = userEvent.setup()

        const fetchMock = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                message: "Correo enviado correctamente",
            }),
        })

        vi.stubGlobal("fetch", fetchMock)

        render(<SendEmailButton tasks={tasks} />)

        await user.click(
            screen.getByRole("button", { name: /enviar resumen por email/i })
        )

        expect(fetchMock).toHaveBeenCalledWith(
            "/api/send-email",
            expect.objectContaining({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        )

        expect(await screen.findByText("✅ Email enviado correctamente")).toBeInTheDocument()
    })

    test("muestra error si el envio falla", async () => {
        const user = userEvent.setup()

        const fetchMock = vi.fn().mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                error: "No se pudo enviar el correo",
            }),
        })

        vi.stubGlobal("fetch", fetchMock)

        render(<SendEmailButton tasks={tasks} />)

        await user.click(
            screen.getByRole("button", { name: /enviar resumen por email/i })
        )

        expect(await screen.findByText("No se pudo enviar el correo")).toBeInTheDocument()
    })
})