import { ArrowLeft, Cpu, ExternalLink, Award, Info } from "lucide-react";

export default function DetailGPUPage({ onNavigate, data }) {
  if (!data) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>GPU data not found</p>
          <button
            onClick={() => onNavigate('best-gpu')}
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "0.8rem 2rem",
              borderRadius: "1rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600"
            }}
          >
            Back to Best GPU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      {/* HEADER */}
      <div style={{
        padding: "2.5rem 3rem",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <button
          onClick={() => onNavigate('best-gpu')}
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            padding: "1rem 1.8rem",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            cursor: "pointer"
          }}
        >
          <ArrowLeft size={26} /> Back
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem" }}>
        {/* Hero Section */}
        <div style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))",
          borderRadius: "2rem",
          padding: "3rem",
          marginBottom: "3rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <img
              src={data.img || "https://via.placeholder.com/200x200/0066ff/ffffff?text=GPU"}
              alt={data.model}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "1.5rem",
                objectFit: "cover",
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
              }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/200x200/0066ff/ffffff?text=GPU"; }}
            />
            
            <div style={{ flex: 1, minWidth: "300px" }}>
              <div style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #a78bfa, #ec4899)",
                padding: "0.5rem 1.5rem",
                borderRadius: "2rem",
                marginBottom: "1rem",
                fontSize: "2rem",
                fontWeight: 900
              }}>
                {data.rank}
              </div>
              
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                marginBottom: "0.5rem",
                background: "linear-gradient(135deg, #a78bfa, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {data.model}
              </h1>
              
              <p style={{
                fontSize: "1.5rem",
                opacity: 0.8,
                marginBottom: "2rem"
              }}>
                {data.brand}
              </p>

              {data.url && (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    background: "#3b82f6",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "1.5rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(59,130,246,0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,246,0.4)";
                  }}
                >
                  <ExternalLink size={20} />
                  View Reference
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "2rem",
          padding: "3rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          marginBottom: "3rem"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            <Info size={32} style={{ color: "#a78bfa" }} />
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              margin: 0
            }}>
              Specification Details
            </h2>
          </div>

          <div style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "1.5rem",
            padding: "2rem",
            lineHeight: "1.8"
          }}>
            <p style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.9)",
              whiteSpace: "pre-wrap",
              margin: 0
            }}>
              {data.detail || "No specification details available for this GPU."}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.1))",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center"
          }}>
            <Cpu size={48} style={{ color: "#60a5fa", marginBottom: "1rem", margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Brand</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "#60a5fa", margin: 0 }}>{data.brand}</p>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center"
          }}>
            <Award size={48} style={{ color: "#a78bfa", marginBottom: "1rem", margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Ranking</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "#a78bfa", margin: 0 }}>{data.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}