CHIRP APP DEVELOPMENT PLAN
--------------------------

##### “Need to create a POST in the server to get the data from the client side”

### CLIENT-SIDE CODE

STEP 1: Add an event listener for the chirp button

STEP 2: Get the input from the input boxes

STEP 3: Create a js object with the input data

STEP 4: Create JSON from the js object

STEP 5: Use `fetch()` to POST/SEND the data to the Server

### SERVER-SIDE CODE

STEP 6: Create a route on the server to listen for the POST request

STEP 6.5: Receive and parse the json into a js object, use body-parser package

STEP 7: Store the data - use nedb package and `db.insert()`

STEP 8: Send a response back to the client js

### CLIENT-SIDE CODE

STEP 9: Log out a response

STEP 10: Add data to the page (not completed)