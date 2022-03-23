import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
//route
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("connected to browser");
  socket.send("connected!!!");

  socket.on("close", () => console.log("Disconnected from the browser"));

  socket.on("message", (message, isBinary) => {
    sockets.forEach((aSocket) =>
      aSocket.send(isBinary ? message : message.toString())
    );
  });
});
server.listen(3000, () => console.log("server listen 3000"));
