export default function ResultsTable({ results }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
      <thead>
        <tr>
          <th style={th}>Test Name</th>
          <th style={th}>Browser</th>
          <th style={th}>Status</th>
          <th style={th}>Duration (ms)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, i) => (
          <tr key={i}>
            <td style={td}>{r.test}</td>
            <td style={td}>{r.browser}</td>
            <td style={{
              ...td,
              color: r.status === 'passed' ? 'green' : 'red',
              fontWeight: 'bold'
            }}>
              {r.status}
            </td>
            <td style={td}>{r.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  border: '1px solid #ccc',
  padding: 8,
  background: '#f4f4f4'
};

const td = {
  border: '1px solid #ccc',
  padding: 8,
  textAlign: 'center'
};
