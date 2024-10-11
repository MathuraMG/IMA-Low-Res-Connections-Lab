// Import lowdb modules
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Set up lowdb
const defaultData = { users: [] }; 
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// Function to initialize the database
function initializeDb() {
  return db.read()
    .then(() => {
      // If db.data is null, set it to defaultData
      if (db.data === null) {
        db.data = defaultData;
      }
      return db.write()
    })
    .then(() => {
      console.log('Database initialized')
    })
    .catch((error) => {
      console.error('Error initializing database:', error)
    })
}

// ADD: Add new data to the database
function addData(key, value) {
  return db.read()
    .then(() => {
      // Add or replace data at the specified key
      db.data[key] = value
      return db.write()
    })
    .then(() => {
      console.log('Data added successfully')
      return db.data[key]
    })
    .catch((error) => {
      console.error('Error adding data:', error)
    })
}

// READ: Get all data from the database
function readAllData() {
  return db.read()
    .then(() => {
      return db.data
    })
    .catch((error) => {
      console.error('Error reading data:', error)
    })
}

// UPDATE: Update data in the database
function updateData(key, updateFunction) {
  return db.read()
    .then(() => {
      if (key in db.data) {
        // Apply the update function to the existing data
        db.data[key] = updateFunction(db.data[key])
        return db.write()
      } else {
        throw new Error('Key not found in database')
      }
    })
    .then(() => {
      console.log('Data updated successfully')
      return db.data[key]
    })
    .catch((error) => {
      console.error('Error updating data:', error)
    })
}

// Example usage
initializeDb()
  .then(() => addData('users', [{ id: 1, name: 'YG' }]))
  .then(() => readAllData())
  .then(data => console.log('All data:', data))
  .then(() => updateData('users', users => [...users, { id: 2, name: 'Ruta' }]))
  .then(() => readAllData())
  .then(data => console.log('Updated data:', data))
  .catch(error => console.error('Error in operations:', error))
