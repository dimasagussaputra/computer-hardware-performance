import { useState, useEffect } from "react";
import { ArrowLeft, Plus, X, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { gpuService } from "../services/gpuService";

export default function BestGPUPage({ onNavigate }) {
  const [gpus, setGpus] = useState([]);
  const [filteredGpus, setFilteredGpus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filterBrand, setFilterBrand] = useState("all");
  const [filterMode, setFilterMode] = useState("all");

  const [form, setForm] = useState({
    brand: "",
    model: "",
    img: "",
    url: "",
    detail: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchGPUs();
  }, []);

  useEffect(() => {
    filterGPUs();
    setCurrentPage(1);
  }, [searchQuery, gpus, filterBrand, filterMode]);

  const triggerNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2000);
  };

  const fetchGPUs = async () => {
    try {
      setLoading(true);
      const data = await gpuService.getAll();

      const withRank = data.map((gpu, idx) => {
        const rawRank = gpu.rank ? gpu.rank : `#${idx + 1}`;
        return { ...gpu, rank: rawRank };
      });

      const sorted = withRank
        .sort((a, b) => {
          const ra = parseInt(String(a.rank || "").replace("#", "")) || 999999;
          const rb = parseInt(String(b.rank || "").replace("#", "")) || 999999;
          return ra - rb;
        })
        .map((gpu, idx) => ({ ...gpu, rank: `#${idx + 1}` }));

      setGpus(sorted);
      setFilteredGpus(sorted);
    } catch (err) {
      console.error("Error fetching GPUs:", err);
      triggerNotif("Failed to load GPU data");
    } finally {
      setLoading(false);
    }
  };

  const filterGPUs = () => {
    const query = (searchQuery || "").trim().toLowerCase();

    let result = [...gpus];
    if (query) {
      result = result.filter(gpu =>
        (gpu.brand || "").toLowerCase().includes(query) ||
        (gpu.model || "").toLowerCase().includes(query) ||
        (String(gpu.rank || "") || "").toLowerCase().includes(query) ||
        ((gpu.detail || "").toLowerCase().includes(query))
      );
    }

    if (filterBrand && filterBrand !== "all") {
      result = result.filter(gpu => String(gpu.brand).toLowerCase() === filterBrand.toLowerCase());
    }

    if (filterMode === "best") {
      result = result
        .sort((a, b) => (parseInt(String(a.rank).replace("#", "")) || 999999) - (parseInt(String(b.rank).replace("#", "")) || 999999))
        .slice(0, 3);
    } else if (filterMode === "rank-asc") {
      result = result.sort((a, b) => (parseInt(String(a.rank).replace("#", "")) || 999999) - (parseInt(String(b.rank).replace("#", "")) || 999999));
    } else if (filterMode === "rank-desc") {
      result = result.sort((a, b) => (parseInt(String(b.rank).replace("#", "")) || 999999) - (parseInt(String(a.rank).replace("#", "")) || 999999));
    } else {
    }

    setFilteredGpus(result);
  };

  const totalPages = Math.max(1, Math.ceil(filteredGpus.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGpus = filteredGpus.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({
      brand: "",
      model: "",
      img: "",
      url: "",
      detail: ""
    });
  };

  const addOrUpdateGPU = async () => {
    if (!form.brand || !form.model) {
      return alert("Brand & Model must be filled in!");
    }

    try {
      if (editingId) {
        await gpuService.update(editingId, form);
        triggerNotif("The GPU has been successfully updated!");
      } else {
        const nextRank = gpus.length + 1;
        await gpuService.create({ ...form, rank: `#${nextRank}` });
        triggerNotif("The GPU has been successfully added!");
      }

      resetForm();
      setEditingId(null);
      setShowForm(false);
      await fetchGPUs();
    } catch (err) {
      console.error("Error saving GPU:", err);
      triggerNotif("Failed to save GPU data");
    }
  };

  const startEdit = (gpu) => {
    setForm({
      brand: gpu.brand || "",
      model: gpu.model || "",
      img: gpu.img || "",
      url: gpu.url || "",
      detail: gpu.detail || ""
    });
    setEditingId(gpu.id);
    setShowForm(true);
  };

  const deleteGPU = async (id) => {
    if (!window.confirm("Are you sure you want to delete this GPU?")) return;

    try {
      await gpuService.delete(id);
      triggerNotif("The GPU has been successfully deleted!");
      await reorderRanks();
    } catch (err) {
      console.error("Error deleting GPU:", err);
      triggerNotif("Failed to delete GPU");
    }
  };

  const reorderRanks = async () => {
    try {
      const data = await gpuService.getAll();
      const sorted = data.sort((a, b) => (parseInt(String(a.rank).replace("#", "")) || 999999) - (parseInt(String(b.rank).replace("#", "")) || 999999));

      for (let i = 0; i < sorted.length; i++) {
        const newRank = `#${i + 1}`;
        if (sorted[i].rank !== newRank) {
          await gpuService.update(sorted[i].id, { rank: newRank });
        }
      }

      fetchGPUs();
    } catch (err) {
      console.error("Error reordering ranks:", err);
      triggerNotif("Failed to sort GPU rank");
    }
  };

  const availableBrands = Array.from(new Set(gpus.map(g => (g.brand || "").trim()).filter(Boolean)));

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1.5rem"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      {notification && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#3b82f6",
          color: "white",
          padding: "1rem 2rem",
          borderRadius: "0 0 1rem 1rem",
          fontWeight: 700,
          zIndex: 9999,
          animation: "slideDown 0.4s ease"
        }}>
          {notification}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); }
          to { transform: translate(-50%, 0); }
        }

        @media (max-width: 768px) {
          .header-container {
            flex-direction: column !important;
            gap: 1rem !important;
            padding: 2rem 1.5rem !important;
          }

          .header-title {
            position: static !important;
            transform: none !important;
            font-size: 2.5rem !important;
            margin: 1rem 0 !important;
          }

          .search-row {
            flex-direction: column !important;
            gap: 0.75rem !important;
            align-items: stretch !important;
          }

          .search-input {
            width: 100% !important;
            padding-left: 3.5rem !important;
          }

          .filter-controls {
            width: 100% !important;
            display: flex;
            gap: 0.5rem !important;
          }

          .form-container {
            margin: 2rem 1rem !important;
            padding: 1.5rem !important;
          }

          .form-grid {
            grid-template-columns: 1fr !important;
          }

          .gpu-grid {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
          }

          .pagination-container {
            padding: 0 1rem !important;
          }
        }
        
        select {
          background-color: rgba(255,255,255,0.08) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          padding: 0.8rem 1rem !important;
          border-radius: 1rem !important;
          outline: none !important;
        }

        select:focus {
          border-color: #7c3aed !important;
          background-color: rgba(255,255,255,0.15) !important;
        }

        select option {
          background-color: #0f172a !important;  /* dark background */
          color: white !important;               /* white text */
          padding: 0.5rem !important;
        }

        select option:hover {
          background-color: rgba(124,58,237,0.4) !important; /* purple hover */
        }
      `}</style>

      {/* HEADER */}
      <div className="header-container" style={{
        padding: "2.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <button
          onClick={() => onNavigate('parts')}
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

        <h1 className="header-title" style={{
          fontSize: "3.8rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #a78bfa, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}>
          BEST GPU
        </h1>

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
              setEditingId(null);
            }
            setShowForm(!showForm);
          }}
          style={{
            background: showForm ? "#dc2626" : "#7c3aed",
            color: "white",
            padding: "1rem 2.2rem",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            boxShadow: showForm ? "0 10px 30px rgba(220,38,38,0.4)" : "0 10px 30px rgba(124,58,237,0.4)",
            cursor: "pointer",
            border: "none"
          }}
        >
          {showForm ? <X size={26} /> : <Plus size={26} />}
          {showForm ? "Close Form" : "Add New GPU"}
        </button>
      </div>

      {/* SEARCH + FILTER ROW */}
      <div className="search-container" style={{
        maxWidth: "1200px",
        margin: "2rem auto 0",
        padding: "0 3rem"
      }}>
        <div className="search-row" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}>
          {/* Search box */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flex: 1,
            maxWidth: "900px"
          }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "1rem",
                color: "#9ca3af",
                pointerEvents: "none"
              }}
            />
            <input
              className="search-input"
              type="text"
              placeholder="Search by brand, model, rank, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "1.15rem 1.5rem 1.15rem 3.2rem",
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "2px solid rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.02rem",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => {
                e.target.style.background = "rgba(255,255,255,0.12)";
                e.target.style.borderColor = "#7c3aed";
              }}
              onBlur={(e) => {
                e.target.style.background = "rgba(255,255,255,0.08)";
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "0.6rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  color: "white",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filters: Brand + Mode */}
          <div className="filter-controls" style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center"
          }}>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "0.65rem 0.9rem",
                borderRadius: "0.9rem",
                cursor: "pointer",
                outline: "none",
                minWidth: "140px",
                fontSize: "0.95rem",
                backdropFilter: "blur(4px)"
              }}
            >
              <option value="all">All Brands</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                color: "white",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "0.65rem 0.9rem",
                borderRadius: "0.9rem",
                cursor: "pointer",
                outline: "none",
                minWidth: "160px",
                fontSize: "0.95rem",
                backdropFilter: "blur(4px)"
              }}
            >
              <option value="all">All / Default Order</option>
              <option value="best">Top 3 (Best)</option>
              <option value="rank-asc">Rank: Low → High</option>
              <option value="rank-desc">Rank: High → Low</option>
            </select>
          </div>
        </div>

        {/* Search Results Info */}
        <div style={{ marginTop: "0.9rem", display: "flex", justifyContent: "center" }}>
          <p style={{
            fontSize: "0.95rem",
            opacity: 0.75,
            textAlign: "center"
          }}>
            Showing {filteredGpus.length} GPUs{filterBrand !== "all" ? ` • Brand: ${filterBrand}` : ""}{filterMode !== "all" ? ` • Mode: ${filterMode}` : ""}
          </p>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-container" style={{
          margin: "3rem auto",
          maxWidth: "1200px",
          padding: "2.5rem",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6rem", fontWeight: 700 }}>
            {editingId ? "Edit GPU" : "Add New GPU"}
          </h3>

          <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            <input placeholder="Brand" value={form.brand}
              onChange={e => setForm({ ...form, brand: e.target.value })}
              style={{ padding: "1rem", borderRadius: "1rem", background: "#1f2937", border: "none", color: "white" }} />
            <input placeholder="Model" value={form.model}
              onChange={e => setForm({ ...form, model: e.target.value })}
              style={{ padding: "1rem", borderRadius: "1rem", background: "#1f2937", border: "none", color: "white" }} />
          </div>

          <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            <input placeholder="Image URL" value={form.img}
              onChange={e => setForm({ ...form, img: e.target.value })}
              style={{ padding: "1rem", borderRadius: "1rem", background: "#1f2937", border: "none", color: "white" }} />
            <input placeholder="Reference URL" value={form.url}
              onChange={e => setForm({ ...form, url: e.target.value })}
              style={{ padding: "1rem", borderRadius: "1rem", background: "#1f2937", border: "none", color: "white" }} />
          </div>

          <textarea
            placeholder="GPU Details (cores, clock speed, generation, dll)"
            value={form.detail}
            onChange={e => setForm({ ...form, detail: e.target.value })}
            rows={4}
            style={{
              width: "100%",
              padding: "1.2rem",
              borderRadius: "1.2rem",
              background: "#1f2937",
              border: "none",
              color: "white",
              marginBottom: "1.5rem",
              resize: "none"
            }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button onClick={() => { setShowForm(false); resetForm(); setEditingId(null); }}
              style={{ background: "#374151", color: "white", padding: "0.8rem 2rem", borderRadius: "1rem", border: "none", cursor: "pointer" }}>
              Cancel
            </button>

            <button onClick={addOrUpdateGPU}
              style={{ background: "#3b82f6", color: "white", padding: "0.8rem 2.5rem", borderRadius: "1rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* LIST GPU */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 3rem 3rem" }}>
        {filteredGpus.length === 0 && !loading && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "1.4rem", opacity: 0.7 }}>
              {searchQuery
                ? `There is no GPU compatible with "${searchQuery}"`
                : "There is no GPU data. Click 'Add New GPU' to add."
              }
            </p>
            {(searchQuery || filterBrand !== "all" || filterMode !== "all") && (
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                <button
                  onClick={() => { setSearchQuery(""); setFilterBrand("all"); setFilterMode("all"); }}
                  style={{
                    background: "#7c3aed",
                    color: "white",
                    padding: "0.8rem 2rem",
                    borderRadius: "1rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 600
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        <div className="gpu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
          {currentGpus.map((gpu) => (
            <div key={gpu.id} style={{
              background: "#1f2937",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transition: "all 0.3s",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                  src={gpu.img || "https://via.placeholder.com/80x80/0066ff/ffffff?text=GPU"}
                  alt={gpu.model}
                  style={{ width: "80px", height: "80px", borderRadius: "1rem", objectFit: "cover" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80x80/0066ff/ffffff?text=GPU"; }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>{gpu.model}</h3>
                  <p style={{ opacity: 0.8, margin: "0 0 0.5rem", fontSize: "1rem" }}>{gpu.brand}</p>
                  <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "#60a5fa" }}>{gpu.rank}</p>
                </div>
              </div>

              <div style={{ padding: "0 1.5rem", flex: 1 }}>
                <p style={{ fontSize: "0.92rem", opacity: 0.75, lineHeight: "1.6", marginBottom: "1rem" }}>
                  {gpu.detail || "No detail available"}
                </p>
              </div>

              <div style={{
                padding: "1rem 1.5rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.2)"
              }}>
                <button
                  onClick={() => onNavigate('detail-gpu', gpu)}
                  style={{
                    background: "#10b981",
                    color: "white",
                    padding: "0.65rem 1.1rem",
                    borderRadius: "0.9rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  View
                </button>

                <button
                  onClick={() => startEdit(gpu)}
                  style={{
                    background: "#f59e0b",
                    color: "white",
                    padding: "0.65rem 1.1rem",
                    borderRadius: "0.9rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <Edit2 size={17} /> Edit
                </button>

                <button
                  onClick={() => deleteGPU(gpu.id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    padding: "0.65rem 1.1rem",
                    borderRadius: "0.9rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <Trash2 size={17} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      {filteredGpus.length > 0 && (
        <div className="pagination-container" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}>
          {/* Pagination Info */}
          <p className="pagination-info" style={{
            fontSize: "1rem",
            opacity: 0.7,
            textAlign: "center"
          }}>
            Showing {Math.min(startIndex + 1, filteredGpus.length)} - {Math.min(endIndex, filteredGpus.length)} of {filteredGpus.length} GPUs
          </p>

          {/* Pagination Buttons */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-button"
              style={{
                background: currentPage === 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
                color: currentPage === 1 ? "#6b7280" : "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.7rem 1rem",
                borderRadius: "0.75rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
                minWidth: "44px",
                height: "44px",
                justifyContent: "center"
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

              if (!showPage && !showEllipsisBefore && !showEllipsisAfter) return null;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={`ellipsis-${page}`} style={{
                    padding: "0.7rem 0.5rem",
                    color: "#9ca3af",
                    fontSize: "1.1rem",
                    fontWeight: 700
                  }}>
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className="page-button"
                  style={{
                    background: currentPage === page
                      ? "linear-gradient(135deg, #7c3aed, #ec4899)"
                      : "rgba(255,255,255,0.12)",
                    color: "white",
                    border: currentPage === page
                      ? "1px solid rgba(236,72,153,0.5)"
                      : "1px solid rgba(255,255,255,0.2)",
                    padding: "0.7rem",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontWeight: currentPage === page ? 700 : 600,
                    minWidth: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "all 0.2s",
                    boxShadow: currentPage === page ? "0 4px 12px rgba(124,58,237,0.4)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.background = "rgba(255,255,255,0.18)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) {
                      e.target.style.background = "rgba(255,255,255,0.12)";
                    }
                  }}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-button"
              style={{
                background: currentPage === totalPages ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
                color: currentPage === totalPages ? "#6b7280" : "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.7rem 1rem",
                borderRadius: "0.75rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
                minWidth: "44px",
                height: "44px",
                justifyContent: "center"
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
