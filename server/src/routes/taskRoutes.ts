import { Router } from "express";
import {
  createTask,
  getTasks,
  toggleTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", toggleTask);
router.delete("/:id", deleteTask);

export default router;