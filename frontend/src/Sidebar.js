function Sidebar() {

  const style = {
    width: "200px",
    height: "100vh",
    background: "linear-gradient(180deg,#020617,#0f172a)",
    color: "white",
    padding: "30px",
    position: "fixed",
    left: 0,
    top: 0,
    borderRight: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)"
  };

  const item = {
    marginBottom: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: 0.8
  };

  return (
    <div style={style}>
      <h2 style={{marginBottom:"40px"}}>QA Dashboard</h2>

      <div style={item}>Overview</div>
      <div style={item}>Analytics</div>
      <div style={item}>Failures</div>

    </div>
  );
}

export default Sidebar;