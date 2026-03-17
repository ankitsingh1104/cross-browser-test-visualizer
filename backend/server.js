const express = require("express");
const fs = require("fs");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { exec } = require("child_process");
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/results", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("../results.json", "utf8"));
    res.json(data);
  } catch {
    res.json({ suites: [] });
  }
});

app.post("/run-tests", (req, res) => {

  console.log("Running Playwright tests...");

  exec("npx playwright test", { cwd: "../" }, (error, stdout, stderr) => {

    if (error) {
      console.error(error);
      return res.status(500).send("Test execution failed");
    }

    console.log(stdout);
    res.send("Tests started");

  });

});

io.on("connection", (socket) => {
  console.log("Client connected");
});

setInterval(() => {
  try {
    const data = JSON.parse(fs.readFileSync("../results.json", "utf8"));
    io.emit("resultsUpdate", data);
  } catch {}
}, 2000);

server.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});