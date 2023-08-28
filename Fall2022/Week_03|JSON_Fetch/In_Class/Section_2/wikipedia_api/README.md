## Astronaut JSON + Wikipedia API Request

We see the CORS (Cross-Origin Resource Sharing) error because when we try to request data from the Wikipedia API, certain settings on the server of this API don't allow requests from outside clients (us). Once we incorporate our own server into our applications which we'll do in Module 2, we won't be seeing this error. As a general rule, servers are happy talking to other servers (or their own client), but servers don't always play nice with other clients, which is what we are considered.

A temporary fix for this issue is to use a "CORS Anywhere" service that will act as a proxy to facilitate the request for you. A request is made to the "Cors Anywhere" server via the appropriate url (i.e. https://cors-anywhere.herokuapp.com/) - see the url appended in the fetch function. Their server will then  make the request to Wikipedia on our behalf, they will receive the data and then send it to us. It's kind of like a placing a food delivery order via a delivery service - they communicate your order to the restaurant, pick up your food and delivers it to you!

To run this example, you do need to go to the [Cors Anywhere Demo Page]( https://cors-anywhere.herokuapp.com/corsdemo) and request click the button requesting temporary access - https://cors-anywhere.herokuapp.com/corsdemo.

If you're still running into the same error on your Chrome browser, try Firefox.
