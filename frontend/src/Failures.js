export default function Failures({ results }) {
  const failed = results.filter(r => r.status === 'failed');

  if (failed.length === 0) {
    return <p>No failures 🎉</p>;
  }

  return (
    <div>
      <h2>Failed Tests</h2>
      {failed.map((f, i) => (
        <div key={i} style={{ border: '1px solid red', padding: 10, marginBottom: 10 }}>
          <p><b>Test:</b> {f.test}</p>
          <p><b>Browser:</b> {f.browser}</p>
          <p style={{ color: 'red' }}>{f.error}</p>
        </div>
      ))}
    </div>
  );
}