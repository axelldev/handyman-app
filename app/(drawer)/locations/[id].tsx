import { TaskListItem } from "@/components/task-list-item";
import useLocations from "@/hooks/useLocations";
import useTasks from "@/hooks/useTasks";
import { Location } from "@/types/location";
import { Task } from "@/types/task";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export default function LocationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getLocationById } = useLocations();
  const { getTasksByLocationId } = useTasks();

  const [location, setLocation] = useState<Location | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadLocation = useCallback(async () => {
    try {
      const location = await getLocationById(id);
      const tasks = await getTasksByLocationId(id);
      setLocation(location);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }, [getLocationById, getTasksByLocationId, id]);

  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: location?.name }} />
      <FlatList
        data={tasks}
        renderItem={({ item: task }) => <TaskListItem task={task} />}
      />
      <Link href={`/locations/${id}/new-task`} asChild>
        <TouchableOpacity style={styles.fabAddTask}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabAddTask: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#000",
    padding: 16,
    borderRadius: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
