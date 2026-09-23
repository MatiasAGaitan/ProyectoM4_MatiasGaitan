import type { Task } from "../types/task";

export const createTaskSummary = (tasks: Task[]): string => {

	if (tasks.length === 0) {
		return `
Resumen de tareas

Actualmente no tienes tareas registradas.

Cuando agregues nuevas tareas, podrás recibir aquí un resumen de tu progreso.
			
Gracias por usar nuestra aplicación.
  `.trim();
	}

	const tasksCompleted = tasks.filter((task) => task.completed).map((task) => task.title)
	const tasksIncompleted = tasks.filter((task) => !task.completed).map((task) => task.title)

	return `
Resumen de tareas

Total de tareas: ${tasks.length}
Tareas completadas: ${tasksCompleted.length}
Tareas pendientes: ${tasksIncompleted.length}

✅ Completadas:
${tasksCompleted.length > 0
			? tasksCompleted.map(task => `- ${task}`).join("\n")
			: "- No hay tareas completadas"}

⏳ Pendientes:
${tasksIncompleted.length > 0
			? tasksIncompleted.map(task => `- ${task}`).join("\n")
			: "- No hay tareas pendientes"}

Gracias por usar nuestra aplicación.

¡Sigue avanzando con tus tareas!
  `.trim();
};