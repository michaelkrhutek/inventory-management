import express from "express";
import * as socketio from "socket.io";

const app = express();
app.set("port", 8080);

let http = require("http").Server(app);
let io: SocketIO.Server = require("socket.io")(http);


let data = ['', '', '', ''];


app.get("/", (_req: express.Request, res: express.Response) => {
  res.send('<p>Express works</p>');
});

io.on("connection", function(socket: socketio.Socket) {
  console.log("a user connected");
  socket.emit('initial-data', data);
  socket.on('message-from-client', (message: any) => {
      console.log(message);
      if (message) {
          console.log(data);
          const newData = [...data];
          newData[message.key] = message.value;
          data = newData;
          console.log(data);
          socket.broadcast.emit('message-from-server', message);
      }
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});