import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function LocationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: () => (
            <View style={{ marginLeft: -16 }}>
              <DrawerToggleButton tintColor="#000" />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
