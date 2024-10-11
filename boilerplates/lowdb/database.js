// Import lowdb modules
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Set up lowdb

// Here we're using users as an example, but you can store any type of data
// Let's say our user's data structure looks like this:
// { id: 1, name: 'John Doe', email: 'john@example.com' }
const defaultData = { users: [] }; 
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// Function to initialize the database (i.e. loading data from db.json)
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

// CREATE: Add a new user
function addUser(user) {
  return db.read()
    .then(() => {
      db.data.users.push(user)
      return db.write()
    })
    .then(() => {
      console.log('User added successfully')
      return user
    })
    .catch((error) => {
      console.error('Error adding user:', error)
    })
}

// READ: Get all users
function getAllUsers() {
  return db.read()
    .then(() => {
      return db.data.users
    })
    .catch((error) => {
      console.error('Error retrieving users:', error)
    })
}

// UPDATE: Update a user by ID
function updateUser(id, updatedInfo) {
  return db.read()
    .then(() => {
      // Find the user with the matching id
      let userFound = false;
      for (let i = 0; i < db.data.users.length; i++) {
        if (db.data.users[i].id === id) {
          // User found, update their information
          userFound = true;
          
          // Create a new object with updated information
          let updatedUser = {
            id: db.data.users[i].id,
            name: updatedInfo.name || db.data.users[i].name,
            email: updatedInfo.email || db.data.users[i].email
            // Add other fields as necessary
          };
          
          // Replace the old user object with the updated one
          db.data.users[i] = updatedUser;
          
          // Save the changes
          return db.write()
            .then(() => {
              console.log('User updated successfully');
              return updatedUser;
            });
        }
      }
      
      // If we've gone through the whole array and haven't found the user
      if (!userFound) {
        throw new Error('User not found');
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
}

// DELETE: Delete a user by ID
function deleteUser(id) {
  return db.read()
    .then(() => {
      let userFound = false;
      let newUsersList = [];

      // Go through all users
      for (let i = 0; i < db.data.users.length; i++) {
        // If this is not the user we want to delete, add them to the new list
        if (db.data.users[i].id !== id) {
          newUsersList.push(db.data.users[i]);
        } else {
          // If we find the user to delete, mark that we found them
          userFound = true;
        }
      }

      // If we found and removed the user, update the database
      if (userFound) {
        db.data.users = newUsersList;
        return db.write()
          .then(() => {
            console.log('User deleted successfully');
          });
      } else {
        // If we didn't find the user, throw an error
        throw new Error('User not found');
      }
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}

// Example usage
initializeDb()
  .then(() => addUser({ id: 1, name: 'YG', email: 'yg@lowres.com' }))
  .then(() => addUser({ id: 2, name: 'Ruta', email: 'ruta@lowres.com' }))
  .then(() => getAllUsers())
  .then(users => console.log('All users:', users))
  .then(() => updateUser(2, { name: 'Craig', email: 'craig@lowres.com' }))
  .then(() => deleteUser(1))
  .catch(error => console.error('Error in operations:', error))

// You should see this output after running the script for the first time:
// {
//   "users": [
//     {
//       "id": 2,
//       "name": "Craig",
//       "email": "craig@lowres.com"
//     }
//   ]
// }