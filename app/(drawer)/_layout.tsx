import DrawerContent from "@/components/drawer-content";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Drawer } from "expo-router/drawer";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const db = SQLite.openDatabaseSync("locations");

export default function DrawerLayout() {
  useDrizzleStudio(db);

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          headerTintColor: "#000",
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Manage Locations" }} />
        <Drawer.Screen
          name="locations"
          options={{
            headerShown: false,
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
