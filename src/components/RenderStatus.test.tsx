import { screen, render } from "@testing-library/react"
import RenderStatus from "./RenderStatus"

describe("RenderStatus", () => {
    test("Renderiza el mensaje de create-success", () => {
        render(<RenderStatus taskStatus="create-success" />)
        const texto = screen.getByText("✅ Tarea creada correctamente")

        expect(texto).toBeInTheDocument()
    })
    test("Renderiza el mensaje de create-error", () => {
        render(<RenderStatus taskStatus="create-error" />)
        const texto = screen.getByText("❌ Error al crear la tarea")

        expect(texto).toBeInTheDocument()
    })
    test("Renderiza el mensaje de edit-success", () => {
        render(<RenderStatus taskStatus="edit-success" />)
        const texto = screen.getByText("✅ Tarea editada correctamente")

        expect(texto).toBeInTheDocument()
    })
    test("Renderiza el mensaje de edit-error", () => {
        render(<RenderStatus taskStatus="edit-error" />)
        const texto = screen.getByText("❌ Error al editar la tarea")

        expect(texto).toBeInTheDocument()
    })
    test("Renderiza el mensaje de delete-success", () => {
        render(<RenderStatus taskStatus="delete-success" />)
        const texto = screen.getByText("✅ Tarea eliminada correctamente")

        expect(texto).toBeInTheDocument()
    })
    test("Renderiza el mensaje de delete-error", () => {
        render(<RenderStatus taskStatus="delete-error" />)
        const texto = screen.getByText("❌ Error al eliminar la tarea")

        expect(texto).toBeInTheDocument()
    })
    test("No renderiza nada si el status no es valido", () => {
        render(<RenderStatus taskStatus={null} />)
        const texto = screen.queryByText("❌ Error al crear la tarea")

        expect(texto).not.toBeInTheDocument()
    })
})