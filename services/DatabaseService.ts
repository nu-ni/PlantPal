import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { Dict, Plant, PlantCollection } from "../data/models";
import { Errors } from "@/Errors/error-messages";

export enum Tables {
  PLANT = "Plant",
  PLANT_COLLECTION = "PlantCollection",
}

const tableCreationMap: Dict = {
  [Tables.PLANT_COLLECTION]: `
    CREATE TABLE IF NOT EXISTS PlantCollection (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lastActive INTEGER NOT NULL
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
};

const getDBConnection = async (): Promise<SQLiteDatabase> => {
  const db = await openDatabaseAsync("plant-pal.sqlite");
  if (!db) alert(Errors.connectionError);
  return db;
};

export const performDatabaseOperation = async (
  operation: (arg0: SQLiteDatabase) => any
) => {
  const db = await getDBConnection();

  try {
    const result = await operation(db);
    return result;
  } catch (err) {
    console.log(Errors.databaseError, err);
    alert(err);
  } finally {
    db.closeAsync();
  }
};

export const initializeDatabase = async () => {
  return await performDatabaseOperation(async (db) => {
    const tableNames = Object.keys(tableCreationMap);

    for await (let name of tableNames) {
      let checkQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}';`;
      let results = await db.getAllAsync(checkQuery);

      if (results.length == 0) {
        let query = tableCreationMap[name];
        await db.execAsync(query);
      }
    }
  });
};
export const checkHasCollection = async () => {
  return await performDatabaseOperation(async (db) => {
    let checkQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${Tables.PLANT_COLLECTION}';`;
    let results = await db.getAllAsync(checkQuery);
    return results.length > 0;
  });
};

export const updateLastActive = async (collectionId: number) => {
  return await performDatabaseOperation(async (db) => {
    const query = `UPDATE ${Tables.PLANT_COLLECTION} SET lastActive = ? WHERE id = ?;`;
    const now = Date.now();
    return db.runAsync(query, [now, collectionId]);
  });
};

export const getLastActiveCollection = async () => {
  return await performDatabaseOperation(async (db) => {
    const query = `SELECT id FROM ${Tables.PLANT_COLLECTION} ORDER BY lastActive DESC LIMIT 1;`;
    const collection = db.getAllAsync<PlantCollection>(query);
    return collection;
  });
};

export const fetchAllCollectionsWithPlantCount = async () => {
  return await performDatabaseOperation(async (db) => {
    const query = `
    SELECT PlantCollection.*, (SELECT COUNT(*) FROM ${Tables.PLANT} WHERE ${Tables.PLANT}.collectionId = PlantCollection.id) AS count
    FROM ${Tables.PLANT_COLLECTION}
    `;

    return await db.getAllAsync(query);
  });
};

export const insertData = async (
  tableName: string,
  data: Plant | PlantCollection
) => {
  return await performDatabaseOperation(async (db) => {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((x) => `'${x}'`)
      .join(", ");

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    return db.runAsync(query);
  });
};

export const insertMany = async (
  tableName: string,
  dataList: Plant[] | PlantCollection[]
) => {
  return await performDatabaseOperation(async (db) => {
    let query = "";

    for (let data of dataList) {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data)
        .map((x) => `'${x}'`)
        .join(", ");
      query += `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    }

    return db.execAsync(query);
  });
};

export const getIdOfLastInsert = async (collection: PlantCollection) => {
  return await performDatabaseOperation(async (db) => {
    return await db.runAsync("SELECT last_insert_rowid()");
  });
};

export const getAll = async (tableName: string) => {
  return await performDatabaseOperation(async (db) => {
    const query = `SELECT * FROM ${tableName};`;
    const result = await db.getAllAsync(query);
    return result;
  });
};

export const getById = async (tableName: string, id: number) => {
  return await performDatabaseOperation(async (db) => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
    return await db.runAsync(query, [id]);
  });
};

export const getPlantsByCollectionId = async (collectionId: number) => {
  return await performDatabaseOperation(async (db) => {
    const query = `SELECT * FROM ${Tables.PLANT} WHERE collectionId = ?;`;
    return await db.getAllAsync(query, [collectionId]);
  });
};

export const getNumberOfPlantsByCollectionId = async (collectionId: number) => {
  return await performDatabaseOperation(async (db) => {
    const plants = await getPlantsByCollectionId(collectionId);
    return plants ? plants.length : 0;
  });
};

export const updateData = async (
  tableName: string,
  id: number,
  data: Plant | PlantCollection
) => {
  return await performDatabaseOperation(async (db) => {
    const keyValue = Object.entries(data)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE ${tableName} SET ${keyValue} WHERE id = ?;`;
    return db.runAsync(query, [id]);
  });
};

export const deleteData = async (tableName: string, id: number) => {
  return await performDatabaseOperation(async (db) => {
    const query = `DELETE FROM ${tableName} WHERE id = ?;`;
    return db.runAsync(query, [id]);
  });
};
