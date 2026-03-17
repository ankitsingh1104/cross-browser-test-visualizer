import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import BrowserChart from "./BrowserChart";
import ResultsTable from "./ResultsTable";
import Failures from "./Failures";
import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import TrendChart from "./TrendChart";

function App() {
  const [results, setResults] = useState([]);
  const [browserFilter, setBrowserFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const socket = io("https://cross-browser-test-visualizer.onrender.com");

    socket.on("resultsUpdate", (data) => {
      const rows = [];

      const resultsData = Array.isArray(data)
        ? data[data.length - 1]?.data
        : data;

      if (!resultsData || !resultsData.suites) return;

      resultsData.suites.forEach((suite) => {
        suite.specs.forEach((spec) => {
          spec.tests.forEach((test) => {
            const run = test.results?.[0];

            if (!run) return;

            rows.push({
              test: spec.title,
              browser: test.projectName,
              status: run.status,
              duration: run.duration,

              // eslint-disable-next-line no-control-regex
              error: (run.errors?.[0]?.message || "").replace(/\u001b\[[0-9;]*m/g, ""),

              attachments: run.attachments || [],
            });
          });
        });
      });

      setResults(rows);
    });

    return () => socket.disconnect();
  }, []);

  const filteredResults = results.filter((r) => {
    const browserOk =
      browserFilter === "All" || r.browser === browserFilter;

    const statusOk =
      statusFilter === "All" || r.status === statusFilter;

    return browserOk && statusOk;
  });

  const runTests = async () => {

  try {
    await axios.post("http://localhost:5000/run-tests");

    alert("Playwright tests started");

  } catch (err) {

    console.error(err);
    alert("Failed to start tests");

  }

};

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard */}
      <div
        style={{
          marginLeft: "240px",
          padding: "40px",
          background: "#0f172a",
          minHeight: "100vh",
          width: "100%",
          color: "white",
          fontFamily: "Segoe UI",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>
          Cross-Browser Test Result Visualizer
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={runTests}
            style={{
              padding: "10px 20px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Run Playwright Tests
          </button>
        </div>
        {/* Summary Cards */}
        <SummaryCards results={results} />

        {/* Filters */}
        <div style={{ marginBottom: "25px" }}>
          <label>
            Browser:&nbsp;
            <select
              value={browserFilter}
              onChange={(e) => setBrowserFilter(e.target.value)}
            >
              <option>All</option>
              <option>Chromium</option>
              <option>Firefox</option>
              <option>WebKit</option>
            </select>
          </label>

          &nbsp;&nbsp;&nbsp;

          <label>
            Status:&nbsp;
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>passed</option>
              <option>failed</option>
            </select>
          </label>
        </div>

        {/* Browser Result Chart */}
        <BrowserChart results={filteredResults} />

        {/* Execution Trend Chart */}
        <TrendChart results={results} />

        {/* Test Results Table */}
        <ResultsTable results={filteredResults} />

        {/* Failures + Screenshot Preview */}
        <Failures results={filteredResults} />
      </div>
    </div>
  );
}

export default App;