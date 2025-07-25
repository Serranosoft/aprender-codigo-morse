import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

let db;

export async function getDb() {
    if (!db) {
        db = await SQLite.openDatabaseAsync("morse");
    }
    return db;
}

export async function initDb() {
    const db = await getDb();

    await db.execAsync('PRAGMA foreign_keys = ON');

    await db.execAsync(`
        DROP TABLE IF EXISTS learn;
        CREATE TABLE IF NOT EXISTS learn (level TEXT);
    `);

    // Si no hay registros en credits, se establece 15 como valor inicial.
    await db.runAsync(`INSERT INTO learn (level) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM learn)`, 1);
}

export async function getLevel() {
    const db = await getDb();
    const x = await db.getAllAsync("SELECT * FROM learn");
    return x[0].level;
}

export async function updateLevel(level) {
    const db = await getDb();
    db.runAsync("UPDATE learn SET level = ?", level);
}