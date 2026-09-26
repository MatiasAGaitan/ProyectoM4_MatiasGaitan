import { useState } from "react"
import type { Task } from "../types/task"
import type { ButtonEmailStatus, ApiResponse } from "../types/buttonEmail"
import { useAuth } from "../features/Authenticator"
import { createTaskSummary } from "../utils/createTaskSummary"
import { Mail } from "lucide-react"

function SendEmailButton({ tasks }: { tasks: Task[] }) {
    const [status, setStatus] = useState<ButtonEmailStatus>("idle")
    const [error, setError] = useState("")

    const { user } = useAuth()

    if (!user) {
        return null
    }

    const handleSendEmail = async (): Promise<void> => {
        setError("")
        setStatus("loading")

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    message: createTaskSummary(tasks)
                }),
            });

            const data = (await response.json()) as ApiResponse

            if (!response.ok) {
                const errorMessage = data.error ?? "No se pudo enviar el mensaje"
                throw new Error(errorMessage)
            }

            setStatus("success")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
            setStatus("error")

        } finally {
            setTimeout(() => {
                setStatus("idle")
            }, 3000)
        }
    }

    return (
        <>
            <button
                className="form-button email-btn"
                disabled={status === "loading"}
                type="button"
                onClick={handleSendEmail}
            >
                {status === "loading" ? "Enviando..." : "Enviar resumen por email"} <Mail />
            </button>

            {status === "error" && (
                <div className="toast toast--error">
                    <p>{error}</p>
                </div>
            )}
            {status === "success" && (
                <div className="toast toast--success">
                    <p>✅ Email enviado correctamente</p>
                </div>
            )}
        </>
    )
}

export default SendEmailButton
