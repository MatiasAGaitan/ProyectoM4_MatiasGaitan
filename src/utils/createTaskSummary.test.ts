import { createTaskSummary } from "./createTaskSummary"
import type { Task } from "../types/task"

describe("createTaskSummary", () => {
    test("Devuelve resumen sin tareas", () => {
        const tasks: Task[] = []
        const summary = createTaskSummary(tasks)
        expect(summary).toContain("Actualmente no tienes tareas registradas")
    })
    test("Devuelve resumen con tasks completadas y pendientes", () => {
        const tasks: Task[] = [
            {
                id: "1",
                title: "task1",
                description: "description1",
                completed: false,
                userId: "1"
            }
        ]
        const summary = createTaskSummary(tasks)
        expect(summary).toContain("Resumen de tareas")
        expect(summary).toContain("Total de tareas: 1")
        expect(summary).toContain("Tareas completadas: 0")
        expect(summary).toContain("Tareas pendientes: 1")
    })
})
