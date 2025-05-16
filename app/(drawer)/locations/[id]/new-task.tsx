import { TaskForm } from "@/components/task-form";
import useTasks from "@/hooks/useTasks";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function NewTaskScreen() {
  const { id: locationId, taskId } = useLocalSearchParams<{
    id: string;
    taskId: string;
  }>();
  const { getTaskById } = useTasks();

  useEffect(() => {
    if (!taskId) return;
    getTaskById(taskId).then((task) => {
      if (!task) return;
    });
  }, [getTaskById, taskId]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Task" }} />
      <TaskForm onSubmit={console.log} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
