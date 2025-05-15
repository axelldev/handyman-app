import { DB_NAME, DB_VERSION } from "@/configs/db";
import { Slot } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDatabase}>
      <Slot />
    </SQLiteProvider>
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
