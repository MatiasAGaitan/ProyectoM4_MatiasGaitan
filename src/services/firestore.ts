import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
    type DocumentData,
} from "firebase/firestore";

import { db } from "../config/firebase.config";
import type { NewTaskInput, Task } from "../types/task";

type TaskFirestoreDoc = Omit<Task, "id">;

function mapTask(docId: string, data: DocumentData): Task {
    const typed = data as TaskFirestoreDoc;

    return {
        id: docId,
        title: typed.title,
        description: typed.description,
        completed: typed.completed,
        userId: typed.userId,
        createdAt: typed.createdAt,
    };
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => mapTask(d.id, d.data()));
}

export async function addTask(input: NewTaskInput, userId: string): Promise<Task> {
    const payload: Omit<Task, "id"> = {
        title: input.title,
        description: input.description,
        completed: false,
        userId: userId,
        createdAt: serverTimestamp() as unknown as Task["createdAt"],
    };

    const docRef = await addDoc(collection(db, "tasks"), payload);

    return {
        id: docRef.id,
        ...payload,
    };
}

export async function deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, "tasks", taskId);

    await deleteDoc(taskRef);
}

export async function editTask(taskId: string, changes: Partial<Task>): Promise<void> {
    const taskRef = doc(db, "tasks", taskId);

    await updateDoc(taskRef, changes);
}
