import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

export type PlantCollection = {
    id?: number;
    title: string;
    lastActive: Date;
};

export type Plant = {
    id?: number;
    title: string;
    frequency: number;
    waterAmount: number;
};

export type Dict = {
    [key: string]: string;
};

const tableCreationMap: Dict = {
    plantCollection: `
    CREATE TABLE IF NOT EXISTS PlantCollection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lastActive DATE NOT NULL
    )
  `,
    plant: `
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

const dbErrors = {
    connectionError: "Error connecting to database",
}

export const getDBConnection = async () => {
    try {
        enablePromise(true);
        const db = await openDatabase({ name: 'plant-pal.db', location: 'default' });
        initializeDatabase(db);
        return db;
    } catch (err) {
        console.error(err);
    }
};

const initializeDatabase = async (db: SQLiteDatabase) => {
    const tableNames = Object.keys(tableCreationMap);
    
    await Promise.all(tableNames.map(async tableName => {
        const checkQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`;
        const [results] = await db.executeSql(checkQuery);
        
        if (results.rows.length === 0) {
            const query = tableCreationMap[tableName];
            return await db.executeSql(query);
        }
    }));
};

// const checkAndCreateTable = async (db: SQLiteDatabase, tableName: string) => {
//     const checkQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`;
//     const [results] = await db.executeSql(checkQuery);

//     if (results.rows.length === 0) {
//         const query = tableCreationMap[tableName];
//         return await db.executeSql(query);
//     }
// }

export const createData = async (tableName: string, data: Plant | PlantCollection) => {
    const db = await getDBConnection();

    if (!db) throw new Error(dbErrors.connectionError);

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data).map(x => `'${x}'`).join(", ");

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    return db.executeSql(query);
};

export const getAll = async (tableName: string) => {
    const db = await getDBConnection();

    if (!db) throw new Error(dbErrors.connectionError);

    const query = `SELECT * FROM ${tableName};`;
    const [results] = await db.executeSql(query);

    if (results.rows.length > 0) {
        return results.rows.raw();
    }

    return [];
};

export const readData = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    if (!db) throw new Error(dbErrors.connectionError);

    const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
    const [results] = await db.executeSql(query, [id]);

    if (results.rows.length > 0) {
        return results.rows.raw();
    }

    return [];
};

export const updateData = async (tableName: string, id: number, data: Plant | PlantCollection) => {
    const db = await getDBConnection();

    if (!db) throw new Error(dbErrors.connectionError);

    const keyValue = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(", ");

    const query = `UPDATE ${tableName} SET ${keyValue} WHERE id = ?;`;

    return db.executeSql(query, [id]);
};

export const deleteData = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    if (!db) throw new Error(dbErrors.connectionError);

    const query = `DELETE FROM ${tableName} WHERE id = ?;`;

    return db.executeSql(query, [id]);
};
