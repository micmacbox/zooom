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

wss.on("connection", (socket) => {
  console.log("connected to browser");
  socket.send("hello!!!");

  socket.on("close", () => console.log("Disconnected from the browser"));
  socket.on("message", (message) => {
    console.log(`message from the browser: ${message}`);
  });
});
server.listen(3000, () => console.log("server listen 3000"));
