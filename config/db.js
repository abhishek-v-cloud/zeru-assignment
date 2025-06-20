import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { createTables } from '../utils/createTables.js'
import { fetchAndStoreData } from '../scripts/fetchData.js'

let db = null

export const initializeDb = async (
  app,
  port = process.env.PORT || 3000,
  dbPath = process.env.DB_PATH || './eigenlayer.db'
) => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await createTables(db)
  await fetchAndStoreData(db)

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
  })
}

export const getDb = () => db
