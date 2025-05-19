import { DB_NAME, DB_VERSION } from "@/configs/db";
import * as Notifications from "expo-notifications";
import { Slot, useRouter } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (resp) => {
        const data = resp.notification.request.content.data;
        const locationId = data?.locationId;
        const taskId = data?.taskId;

        console.log({ locationId, taskId });
        if (locationId && taskId) {
          router.navigate(
            `/locations/${locationId}/task-detail?taskId=${taskId}`
          );
        }
      }
    );
    return () => subscription.remove();
  }, [router]);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <SQLiteProvider
        useSuspense
        databaseName={DB_NAME}
        onInit={migrateDatabase}
      >
        <Slot />
      </SQLiteProvider>
    </Suspense>
  );
}

async function migrateDatabase(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (!result) {
    throw new Error("Failed to get user version");
  }

  let { user_version: currentVersion } = result;

  if (currentVersion >= DB_VERSION) return;

  if (currentVersion === 0) {
    console.log("Migrating db to version 1");
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
    CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, isUrgent INTEGER NOT NULL, locationId INTEGER, imageUri TEXT, FOREIGN KEY (locationId) REFERENCES locations(id));
`);
    await db.runAsync("INSERT INTO locations (name) VALUES (?)", "School");
    await db.runAsync("INSERT INTO locations (name) VALUES (?)", "Hospital");
    currentVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}
