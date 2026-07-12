export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "#2563EB",
        color: "white",
        padding: "30px",
        borderRadius: "18px",
        marginBottom: "30px",
        boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        👋 Welcome Admin
      </h1>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.95,
        }}
      >
        Student Wellbeing Monitoring System
      </p>

      <p
        style={{
          marginTop: "15px",
          fontSize: "15px",
        }}
      >
        {today}
      </p>
    </div>
  );
}