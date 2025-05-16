import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function NewTaskScreen() {
  const { id: locationId, taskId } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "New Task" }} />
      <Text>New Task</Text>
    </View>
  );
}
