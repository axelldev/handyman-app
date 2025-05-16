import { Task } from "@/types/task";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export default function useTasks() {
  const db = useSQLiteContext();

  const getAllTasks = useCallback(async () => {
    return await db.getAllAsync<Task>("SELECT * FROM tasks", []);
  }, [db]);

  const getTasksByLocationId = useCallback(
    async (locationId: string) => {
      return await db.getAllAsync<Task>(
        "SELECT * FROM tasks WHERE locationId = ?",
        [locationId]
      );
    },
    [db]
  );

  return { getAllTasks, getTasksByLocationId };
}
