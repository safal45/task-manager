"use client";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="h-5 w-5 cursor-pointer"
        />

        <span
          className={
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900"
          }
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}