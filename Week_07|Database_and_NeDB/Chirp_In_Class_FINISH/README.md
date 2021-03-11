"Chirp" App Development Flow
----------------------------

### Goals:
1) Allow a user to submit a chirp
2) Save the chirp in a DB
3) Display all chirps on the page

### Development Steps 
(starting with the [boilerplate code](https://github.com/MathuraMG/IMA-Low-Res-Connections-Lab/tree/master/Week_7/Chirp_InClass_Example_START))

##### Guiding thought - "Follow the data"

### CLIENT-SIDE CODE

#### Step 1:
- In the client js, create an event listener on the button
- Grab the input values when the button is clicked

#### Step 2:
- Create an object with the data we care about
- This includes name, chirp, and possibly date

#### Step 3:
- Make sure our data is in JSON form
- Need to use JSON.stringify()

#### Step 4: 
- Send the data to the server using fetch()
- Need to configure fetch() to be a POST request using an object as the second fetch parameter

### SERVER-SIDE CODE

#### Step 5:
- Setup a route for the data to arrive on the server
- This will an app.post() route that can parse the JSON data

#### Step 6:
- Save the data to a database
- Use the .insert() method

#### Step 7 -
- Send a json response to the client js
- Need to create an object that communicates "success"

### CLIENT-SIDE CODE

#### Step 8
- On the client js, receive the response from the server js
- Add the user's message to the top of the page using insertBefore() method

#### Step 9 -
- Display all chirps on the page in the Feed
- Need to add a fetch() request on page load
- This should be a GET request to the server js

### SERVER-SIDE CODE

#### Step 10:
- Create a route on the server js to receive a GET request for all of the data
- This will be an app.get() route
- Use the .find({}) method to query all the objects in the database

#### Step 11:
- Send a json repsonse to the client
- The json will include all of the stored objects

### CLIENT-SIDE CODE

#### Step 12:
- Receive the response from the server js
- Save the data, sort/filter as necessary, loop through it and add it to the page

#### Additional Steps
- Client: Make sure the chirps appear in on the page starting with the most recent chirp at the top
- Server: Create a route that returns chirps by a specific user name