import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    if (tasks.length === 0)
      return res.status(404).json({ message: "No existen tareas." });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrad." });

    if (task.user.toString() !== req.user.id)
      return res
        .status(404)
        .json({ message: "No tienes permiso para acceder a esta tarea" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, date } = req.body;

    if (!title || !description)
      return res.status(422).json({ message: "Existen campos incompletos." });

    if (await findTask(title, req.user.id))
      return res.status(409).json({ message: "Titulo de tarea ya existente" });

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ message: "No pudes eliminar esta tarea." });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateTaks = async (req, res) => {
  try {
    // Actualiza tarea por id con los datos del req.body, y el parametro new: true, hace que devuelva la tarea actulizada, ya que por default devuelve los valores anteriores a la actualización
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada." });

    if (task.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "No puedes actualizar esta tarea" });

    if (await findTask(req.body.title, req.user.id))
      return res.status(409).json({ message: "Titulo de tarea ya existente." });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const findTask = async (title, userId) => {
  const task = await Task.findOne({ title: title, user: userId });
  if (!task) return false;

  return true;
};
