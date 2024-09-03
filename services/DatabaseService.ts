import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { Dict, Plant, PlantCollection } from "./Database";

const dbErrors = {
    createDataError: "Error creating dataset in database",
    connectionError: "Error connecting to database",
    fetchAllError: "Error fetching all data from database",
    fetchByIdError: "Error fetching dataset from database",
    updateError: "Error updating dataset in database",
    deleteError: "Error deleting dataset from database",
}

const tableCreationMap: Dict = {
    PlantCollection: `
    CREATE TABLE IF NOT EXISTS PlantCollection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lastActive DATE NOT NULL
    )
  `,
    Plant: `
    CREATE TABLE IF NOT EXISTS Plant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      frequency INTEGER NOT NULL,
      waterAmount INTEGER NOT NULL,
      collectionId INTEGER,
      FOREIGN KEY(collectionId) REFERENCES PlantCollection(id)
    )
  `,
}

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    const db = await openDatabaseAsync('plant-pal.sqlite');
    if (!db) throw new Error(dbErrors.connectionError);
    return initializeDatabase(db);
};

const initializeDatabase = async (db: SQLiteDatabase) => {
    const tableNames = Object.keys(tableCreationMap);

    for await (let name of tableNames) {
        const checkQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}';`;
        const results = await db.getAllAsync(checkQuery);

        if (results.length == 0) {
            console.log('results', results);
            const query = tableCreationMap[name];
            await db.execAsync(query);
        }
    }
    return db;
};

export const createData = async (tableName: string, data: Plant | PlantCollection) => {
    const db = await getDBConnection();

    try {
        const columns = Object.keys(data).join(", ");
        const values = Object.values(data).map(x => `'${x}'`).join(", ");

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
        return db.runAsync(query);
    } catch (err) {
        console.log(dbErrors.createDataError, err);
    }
};

export const getAll = async (tableName: string) => {
    const db = await getDBConnection();

    try {
        const query = `SELECT * FROM ${tableName};`;
        const result = await db.getAllAsync(query);
        return result;
    } catch (err) {
        console.log(dbErrors.fetchAllError, err);
    }
};

export const getById = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    try {
        const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
        return await db.runAsync(query, [id]);
    } catch (err) {
        console.log(dbErrors.fetchByIdError, err);
    }
};

export const getPlantsByCollectionId
    = async (tableName: string, collectionId: number) => {
    const db = await getDBConnection();

    try {
        const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
        return await db.runAsync(query, [collectionId]);
    } catch (err) {
        console.log(dbErrors.fetchByIdError, err);
    }
};


export const updateData = async (tableName: string, id: number, data: Plant | PlantCollection) => {
    const db = await getDBConnection();

    try {
        const keyValue = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(", ");
        const query = `UPDATE ${tableName} SET ${keyValue} WHERE id = ?;`;
        return db.runAsync(query, [id]);
    } catch (err) {
        console.log(dbErrors.updateError, err);
    }
};

export const deleteData = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    try {
        const query = `DELETE FROM ${tableName} WHERE id = ?;`;
        return db.runAsync(query, [id]);
    } catch (err) {
        console.log(dbErrors.deleteError, err);
    }
};
