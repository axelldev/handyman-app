import { TaskForm } from "@/components/task-form";
import useTasks from "@/hooks/useTasks";
import { Task, TaskFormValues } from "@/types/task";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id: locationId, taskId } = useLocalSearchParams<{
    id: string;
    taskId: string;
  }>();
  const [task, setTask] = useState<Task | null>(null);
  const { getTaskById, createTask, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    if (!taskId) return;
    getTaskById(taskId).then((task) => {
      if (!task) return;
      setTask(task);
    });

    Notifications.requestPermissionsAsync();
  }, [getTaskById, taskId]);

  const handleScheduleNotification = async (task: Task) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Urgent task reminder",
        body: `Don't forget your urget task ${task.title}`,
        data: { taskId: task.id, locationId: task.locationId },
      },
      trigger: null,
    });
  };

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      if (task) {
        await updateTask({
          ...values,
          id: task.id,
          locationId: Number(locationId),
        });
      } else {
        const { id } = await createTask({ locationId, ...values });
        if (values.isUrgent) {
          handleScheduleNotification({
            ...values,
            id,
            locationId: Number(locationId),
          });
        }
      }
      setTask(null);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishTask = async () => {
    try {
      if (!task) return;

      Alert.alert("Finish Task", "Are you sure you want to finish this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Finish",
          style: "destructive",
          onPress: async () => {
            await deleteTask(task.id);
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack.Screen options={{ title: "New Task" }} />
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          submitButtonLabel={task ? "Update Task" : "Create Task"}
        />
        {task && (
          <TouchableOpacity
            style={styles.finishTaskButton}
            onPress={handleFinishTask}
          >
            <Text style={styles.finishTaskButtonText}>Finish Task</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  finishTaskButton: {
    backgroundColor: "#24D48B",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  finishTaskButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
