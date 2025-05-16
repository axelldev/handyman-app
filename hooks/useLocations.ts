import { Location } from "@/types/location";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export default function useLocations() {
  const db = useSQLiteContext();

  const getLocations = useCallback(async () => {
    return await db.getAllAsync<Location>("SELECT * FROM locations");
  }, [db]);

  const addLocation = useCallback(
    async (locationName: string) => {
      return await db.runAsync(
        "INSERT INTO locations (name) VALUES (?)",
        locationName
      );
    },
    [db]
  );

  const deleteLocation = useCallback(
    async (locationId: number) => {
      return await db.runAsync(
        "DELETE FROM locations WHERE id = ?",
        locationId
      );
    },
    [db]
  );

  const getLocationById = useCallback(
    async (id: number | string) => {
      return await db.getFirstAsync<Location>(
        "SELECT * FROM locations WHERE id = ?",
        id
      );
    },
    [db]
  );

  return {
    getLocations,
    getLocationById,
    addLocation,
    deleteLocation,
  };
}
