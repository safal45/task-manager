import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task from "../models/task";

// Cre task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    if (typeof title !== "string") {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
      return;
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
      return;
    }

    if (trimmedTitle.length > 200) {
      res.status(400).json({
        success: false,
        message: "Title cannot exceed 200 characters",
      });
      return;
    }

    const task = await Task.create({
      title: trimmedTitle,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle Task Completion
export const toggleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string )) {
      res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
      return;
    }

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    task.completed = !task.completed;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
      return;
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};