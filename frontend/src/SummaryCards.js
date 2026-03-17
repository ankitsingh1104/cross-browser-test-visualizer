import { motion } from "framer-motion";

function SummaryCards({ results }) {

  const total = results.length;
  const passed = results.filter(r => r.status === "passed").length;
  const failed = results.filter(r => r.status === "failed").length;

  const card = {
    flex: 1,
    padding: "25px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#1e3a8a,#0f172a)",
    backdropFilter: "blur(15px)",
    color: "white",
    marginRight: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
  };

  const number = {
    fontSize: "40px",
    fontWeight: "bold"
  };

  return (
    <div style={{display:"flex",marginBottom:"40px"}}>

      <motion.div style={card} whileHover={{scale:1.05}}>
        <h3>Total Tests</h3>
        <div style={number}>{total}</div>
      </motion.div>

      <motion.div style={{...card,background:"linear-gradient(135deg,#16a34a,#064e3b)"}} whileHover={{scale:1.05}}>
        <h3>Passed</h3>
        <div style={number}>{passed}</div>
      </motion.div>

      <motion.div style={{...card,background:"linear-gradient(135deg,#dc2626,#450a0a)"}} whileHover={{scale:1.05}}>
        <h3>Failed</h3>
        <div style={number}>{failed}</div>
      </motion.div>

    </div>
  );
}

export default SummaryCards;