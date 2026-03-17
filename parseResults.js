const fs = require('fs');

const data = JSON.parse(fs.readFileSync('results.json', 'utf8'));

const results = [];

data.suites.forEach(suite => {
  suite.specs.forEach(spec => {
    spec.tests.forEach(test => {
      const run = test.results[0]; // actual execution result

      results.push({
        testName: spec.title,
        browser: test.projectName,
        status: run.status,
        duration: run.duration,
        startTime: run.startTime
      });
    });
  });
});

console.table(results);
