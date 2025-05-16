import { Location } from "@/types/location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LocationItemProps {
  location: Location;
  onDelete: (location: Location) => void;
}

export default function LocationItem({
  location,
  onDelete,
}: LocationItemProps) {
  return (
    <Link href={`/locations/${location.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Text>{location.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(location)}
        >
          <Ionicons name="trash" size={24} color="#F00" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
