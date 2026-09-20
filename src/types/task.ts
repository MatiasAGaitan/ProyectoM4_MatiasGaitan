import type { Timestamp } from "firebase/firestore";

// Tipado de tareas
export interface Task {
    id: string
    title: string
    completed: boolean
    userId: string
    createdAt?: Timestamp
}

export interface NewTaskInput {
    title: string
}

export interface EditTask {
    id: string
    title?: string
    completed?: boolean
}