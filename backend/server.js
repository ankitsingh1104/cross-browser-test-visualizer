const express = require("express");
const fs = require("fs");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Path to results.json (works locally + on Render)
const RESULTS_PATH = path.join(__dirname, "..", "results.json");


// Get test results
app.get("/results", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(RESULTS_PATH, "utf8"));
    res.json(data);
  } catch (err) {
    console.log("No results found");
    res.json({ suites: [] });
  }
});


// Run Playwright tests from dashboard
app.post("/run-tests", (req, res) => {

  console.log("Running Playwright tests...");

  exec("npx playwright test", { cwd: path.join(__dirname, "..") }, (error, stdout, stderr) => {

    if (error) {
      console.error("Test execution failed:", error);
      return res.status(500).send("Test execution failed");
    }

    console.log(stdout);
    res.send("Tests started");

  });

});


// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected");
});


// Send updates every 2 seconds
setInterval(() => {
  try {
    const data = JSON.parse(fs.readFileSync(RESULTS_PATH, "utf8"));
    io.emit("resultsUpdate", data);
  } catch (err) {}
}, 2000);


// Render requires dynamic port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});