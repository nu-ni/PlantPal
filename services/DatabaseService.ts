import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { Dict, Plant, PlantCollection } from "../data/models";
import { Errors } from "@/Errors/error-messages";

export enum Tables {
    PLANT = 'Plant',
    PLANT_COLLECTION = 'PlantCollection',
}

const tableCreationMap: Dict = {
    [Tables.PLANT_COLLECTION]: `
    CREATE TABLE IF NOT EXISTS PlantCollection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lastActive DATE NOT NULL
    )
  `,
    [Tables.PLANT]: `
    CREATE TABLE IF NOT EXISTS Plant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      frequency INTEGER NOT NULL,
      waterAmount INTEGER NOT NULL,
      image BLOB,
      collectionId INTEGER,
      FOREIGN KEY(collectionId) REFERENCES PlantCollection(id)
    )
  `,
}

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    const db = await openDatabaseAsync('plant-pal.sqlite');
    if (!db) throw new Error(Errors.connectionError);
    initializeDatabase(db);
    return db;
};

const initializeDatabase = async (db: SQLiteDatabase) => {
    // TODO: Make this happen only on app startup
    try {
        const tableNames = Object.keys(tableCreationMap);

        for await (let name of tableNames) {
            let checkQuery =
                `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}';`;
            let results = await db.getAllAsync(checkQuery);

            if (results.length == 0) {
                let query = tableCreationMap[name];
                await db.execAsync(query);
            }
        }
    } catch (err) {
        console.log(Errors.initializeDatabaseError, err);
    }
};

export const checkHasCollection = async () => {
    const db = await openDatabaseAsync('plant-pal.sqlite');
    let checkQuery =
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${Tables.PLANT_COLLECTION}';`;
    let results = await db.getAllAsync(checkQuery);
    return results.length > 0;
}

const updateLastActive = async (collectionId: number) => {
    const db = await getDBConnection();
    const query = `UPDATE ${Tables.PLANT_COLLECTION} SET lastActive = ? WHERE id = ?;`;
    const now = Date.now();
    return db.runAsync(query, [now, collectionId]);
}

export const getLastActiveCollection = async () => {
    const db = await getDBConnection();
    const query = `SELECT id FROM ${Tables.PLANT_COLLECTION} ORDER BY lastActive DESC LIMIT 1;`;
    const collection = db.getAllAsync<PlantCollection>(query);
    return collection;
}

export const fetchAllCollectionsWithPlantCount = async () => {
  const db = await getDBConnection();

  const query = `
    SELECT PlantCollection.*, (SELECT COUNT(*) FROM ${Tables.PLANT} WHERE ${Tables.PLANT}.collectionId = PlantCollection.id) AS count
    FROM ${Tables.PLANT_COLLECTION}
    `;
  
  return await db.getAllAsync(query);
}


export const insertData =
    async (tableName: string, data: Plant | PlantCollection) => {
        const db = await getDBConnection();

        try {
            const columns = Object.keys(data).join(", ");
            const values = Object.values(data).map(x => `'${x}'`).join(", ");

            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
            return db.runAsync(query);
        } catch (err) {
            console.log(Errors.createDataError, err);
        }
    };

export const insertMany = async (tableName: string, dataList: Plant[] | PlantCollection[]) => {
    const db = await getDBConnection();

    try {
        let query = '';

        for (let data of dataList) {
            const columns = Object.keys(data).join(", ");
            const values = Object.values(data).map(x => `'${x}'`).join(", ");
            query += `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
        }

        return db.execAsync(query);
    } catch (err) {
        console.log(Errors.createDataError, err);
    }
};

export const getIdOfLastInsert = async (collection: PlantCollection) => {
    try {
        const db = await getDBConnection();
        return await db.runAsync('SELECT last_insert_rowid()');
    } catch (err) {
        console.log(Errors.createDataError, err);
    }
}

export const getAll = async (tableName: string) => {
    const db = await getDBConnection();

    try {
        const query = `SELECT * FROM ${tableName};`;
        const result = await db.getAllAsync(query);
        return result;
    } catch (err) {
        console.log(Errors.fetchAllError, err);
    }
};

export const getById = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    try {
        const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
        return await db.runAsync(query, [id]);
    } catch (err) {
        console.log(Errors.fetchByIdError, err);
    }
};

export const getPlantsByCollectionId =
    async (collectionId: number) => {
        const db = await getDBConnection();

        try {
            const query = `SELECT * FROM ${Tables.PLANT} WHERE collectionId = ?;`;
            return await db.getAllAsync(query, [collectionId]);
        } catch (err) {
            console.log(Errors.fetchByIdError, err);
        }
    };

export const getNumberOfPlantsByCollectionId = async (collectionId: number) => {
    const plants = await getPlantsByCollectionId(collectionId);
    return plants ? plants.length : 0;
}



export const updateData = async (tableName: string, id: number, data: Plant | PlantCollection) => {
    const db = await getDBConnection();

    try {
        const keyValue = Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(", ");
        const query = `UPDATE ${tableName} SET ${keyValue} WHERE id = ?;`;
        return db.runAsync(query, [id]);
    } catch (err) {
        console.log(Errors.updateError, err);
    }
};

export const deleteData = async (tableName: string, id: number) => {
    const db = await getDBConnection();

    try {
        const query = `DELETE FROM ${tableName} WHERE id = ?;`;
        return db.runAsync(query, [id]);
    } catch (err) {
        console.log(Errors.deleteError, err);
    }
};
