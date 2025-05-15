import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LocationFormProps {
  onSubmit: (locationName: string) => void;
}

export default function LocationForm({ onSubmit }: LocationFormProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!location.trim()) {
      return;
    }
    onSubmit(location);
    setLocation("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location name"
        onSubmitEditing={handleSubmit}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 8,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    padding: 16,
    backgroundColor: "#000",
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
