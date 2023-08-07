### The steps to make the messages project work

*Infrastructure*  

1. Set up a server
2. Serve public folder

*Fetch data from the server on window load*  

3. Server: a get route to serve all messages
4. Server: send data as an object
5. Client: fetch all the messages on window load
6. Client: add messages to html on window load

*Send new messages to the server & add to the page*  

7. Client: add event listener to the button & log input value
8. Client: on clicking, create a fetch POST request:  


	8.1. Create an object to send  


	8.2. Stringify the object  


	8.3. Pass it in the fetch POST request
9. Server: add a post route to listen for a new message
10. Server: parse the message data
11. Server: add message to the messages array
12. Server: send a response object back to the client
13. Client: update the feed with a new message

*Make the feed persistent*  

14. Server: install nedb & require it
15. Server: create a new database
16. Server: load the database
17. Server: insert new message to the database
18. Server: get the messages from the database, not the messages array
19. Client: on window load, load the messages from the database

*Deploy to Glitch*  

20. Add to Github
21. Deploy to Glitch

*What else can you do?*  

22. Change date formatting
23. Add user names
24. Write a helper function to add a new message to the feed (at the moment some code is repeating)
25. What else?
