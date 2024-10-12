import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const port = process.env.PORT || 3000;

// Set up lowdb
const adapter = new JSONFile('db.json');
const defaultData = { items: [] };
const db = new Low(adapter, defaultData);

// JSON and static files serving
app.use(express.json());
app.use(express.static('public'));

// Add your GET and POST routes here
// app.get('/getItems', (req, res) => {
//     db.read()
//     .then(() => {
//         res.json(db.data.items);
//     })
//     .catch(error => {
//         console.error('Error reading from database:', error);
//     });
// });

// app.post('/addItem', (req, res) => {
//     console.log(req.body);
//     let newItem = req.body;
//     // Add value to the DB
//     db.data.items.push(newItem);
//     db.write()
//     .then(() => {
//         res.json({ status: "success", item: newItem });
//     })
//     .catch(error => {
//         console.error('Error writing to database:', error);
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});