export default function Message({ text }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <span style={{
        background: "#c89cc8ff",
        padding: "6px 10px",
        borderRadius: "5px"
      }}>
        {text}
      </span>
    </div>
  );
}