import { Task, TaskFormValues } from "@/types/task";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export default function useTasks() {
  const db = useSQLiteContext();

  const getAllTasks = useCallback(async () => {
    return await db.getAllAsync<Task>("SELECT * FROM tasks", []);
  }, [db]);

  const getTaskById = useCallback(
    async (id: string | number) => {
      return await db.getFirstAsync<Task>("SELECT * FROM tasks WHERE id = ?", [
        id,
      ]);
    },
    [db]
  );

  const getTasksByLocationId = useCallback(
    async (locationId: string) => {
      return await db.getAllAsync<Task>(
        "SELECT * FROM tasks WHERE locationId = ?",
        [locationId]
      );
    },
    [db]
  );

  const updateTask = useCallback(
    async (updatedTask: Task) => {
      return await db.runAsync(
        "UPDATE tasks SET title = ?, description = ?, isUrgent = ?, imageUri = ? WHERE id = ?",
        [
          updatedTask.title,
          updatedTask.description,
          updatedTask.isUrgent,
          updatedTask.imageUri,
          updatedTask.id,
        ]
      );
    },
    [db]
  );

  const createTask = useCallback(
    async ({
      locationId,
      ...taskValues
    }: { locationId: string | number } & TaskFormValues) => {
      const result = await db.runAsync(
        "INSERT INTO tasks (locationId, title, description, isUrgent, imageUri) VALUES (?, ?, ?, ?, ?)",
        [
          locationId,
          taskValues.title,
          taskValues.description,
          taskValues.isUrgent,
          taskValues.imageUri,
        ]
      );

      return { id: result.lastInsertRowId };
    },
    [db]
  );

  const deleteTask = useCallback(
    async (id: string | number) => {
      return await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
    },
    [db]
  );

  return {
    getAllTasks,
    getTaskById,
    getTasksByLocationId,
    createTask,
    updateTask,
    deleteTask,
  };
}
