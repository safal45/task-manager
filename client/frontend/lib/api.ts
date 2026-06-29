import { Task } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await res.json();

  return result.data;
  
};

// Add task
export const addTask = async (title: string): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

// Toggle task
export const toggleTask = async (id: string): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

// Delete task
export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }
};