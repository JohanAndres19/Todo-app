import { Router } from "express";
import type { Request, Response } from "express";
import { Task } from "./model.ts";

const listTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub;
    if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo tareas", error });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub;
    if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

    const { title, description } = req.body;

    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creando tarea", error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub;
    if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando tarea", error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.sub;
    if (!userId) return res.status(401).json({ message: "Usuario no autenticado" });

    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando tarea", error });
  }
};



// -------------------------------------------------
const router = Router();

router.get("/", listTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete(":id", deleteTask);

export default router;
