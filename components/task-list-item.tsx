import { Task } from "@/types/task";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <Link
      href={`/locations/${task.locationId}/task-detail?taskId=${task.id}`}
      asChild
    >
      <TouchableOpacity>
        <View style={styles.container}>
          <View>
            <Ionicons
              size={24}
              name="checkmark-done-circle-outline"
              color={task.isUrgent ? "red" : "black"}
              style={styles.checkbox}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkbox: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
});
