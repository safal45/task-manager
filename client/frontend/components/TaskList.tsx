"use client";

import { useEffect, useState } from "react";

import { Task } from "@/types/task";
import {
  getTasks,
  toggleTask,
  deleteTask,
} from "@/lib/api";

import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };
    loadTasks();
  }, []);

  // Add task to state
  const handleTaskAdded = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // Toggle task
  const handleToggle = async (id: string) => {
    try {
      const updatedTask = await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">

      <h1 className="mb-6 text-center text-3xl font-bold">
        Task Manager
      </h1>

      <TaskForm onTaskAdded={handleTaskAdded} />

      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks yet.
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}