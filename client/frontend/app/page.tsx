"use client";

import { useEffect } from "react";
import { getTasks } from "@/lib/api";

export default function Home() {
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      console.log(tasks);
    };

    fetchTasks();
  }, []);

  return <h1>Task Manager</h1>;
}