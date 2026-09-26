import type { Timestamp } from "firebase/firestore";

export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
    userId: string
    createdAt?: Timestamp
}

export interface NewTaskInput {
    title: string
    description: string
}

export type EditTaskInput = Pick<Task, "title" | "description" | "completed">
