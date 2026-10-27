import express from "express";
import {Server} from "socket.io";
import {createServer} from "node:http";

//ensuring that our server supports express and sockets
const app = express();
const server = createServer(app); // http server which now supports express
const io = new Server(server); // make the http server support sockets

const PORT = 3000; // useful to add when you deploy

//serves the public folder - SAME
app.use("/", express.static("public"));

//SOCKETS!!
io.on("connect", (socket)=> {
  console.log("new connection ID: ", socket.id);

  //listen for messages from the client
  //2. listen for "mouseData". .on receiving "mouseData"....
  socket.on("mouseData", (data)=> {
    console.log(data);
    //3. .emit() "mouseData" to all the clients
    io.emit("mouseData",data);
  })

  //server side code for chat app
  //2. listen for a new message
  socket.on("newMessage", async (data)=> {
    try {
      //MODERATION NOTE : YOU CAN CHANGE WHICH WAY YOU WANT IT MODERATED HERE
      const result = await moderateWithLeo(data.msg);
    // const result = await moderateWithOpenAI(data.msg);

      if (!result.ok) {
          socket.emit('rejected', result.reason); // only the sender hears about it
          return;
      }
      //3. share the new message
      io.emit("newMessage",data);           // everyone sees clean messages
    } catch (error) {
      console.error(error);
      socket.emit('rejected', 'Moderation is unavailable, try again');
    }
  })
  
  
  //listens for client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
  

})


server.listen(PORT, ()=> {
  console.log("Running at localhost:", PORT);
})


// MODERATION NOTE - OPTION 1
import filter from 'leo-profanity';

export async function moderateWithLeo(text) {
    if (filter.check(text)) {
      console.log("Leo says this is not ok");
      return { ok: false, reason: 'Please keep it friendly' };
    }
    console.log("Leo says this is ok");
    return { ok: true };
}

// MODERATION NOTE - OPTION 2
import 'dotenv/config';

export async function moderateWithOpenAI(text) {
    const res = await fetch('https://api.openai.com/v1/moderations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({ model: 'omni-moderation-latest', input: text })
    });
    if (!res.ok) throw new Error(`moderation API error: ${res.status}`);

    const result = (await res.json()).results[0];
    if (result.flagged) {
        const reasons = Object.keys(result.categories).filter(c => result.categories[c]);
        return { ok: false, reason: `Message blocked (${reasons.join(', ')})` };
    }
    return { ok: true };
}