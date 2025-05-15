import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function LocationDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Location {id}</Text>
    </View>
  );
}
