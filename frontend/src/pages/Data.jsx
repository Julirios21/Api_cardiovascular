import React, { useState, useRef } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import NavbarTop from "../components/Dashboard/NavbarTop";
import { Container, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import BarraFiltros from "../components/Datos/BarraFiltros";
import TablaDatos from "../components/Datos/TablaDatos";
import EditarDatoModal from "../components/Datos/EditarDatoModal";
import NuevoRegistroModal from "../components/Datos/NuevoRegistroModal";
import useDatos from "../Hooks/UseData";
import { FaPlusCircle, FaUpload } from "react-icons/fa";

export default function Datos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

// Simple parser CSV (sin comillas, sin escapes, sin validaciones)
 // --- Importar CSV/JSON ---
  const fileRef = useRef(null);
const [importInfo, setImportInfo] = useState({ ok: 0, fail: 0, errors: [] });
const [showToast, setShowToast] = useState(false);


  function splitCSVLine(line) {
    const out = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i], nx = line[i + 1];
      if (ch === '"') {
        if (inQ && nx === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        out.push(cur); cur = "";
      } else cur += ch;
    }
    out.push(cur);
    return out;
  }
  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) return [];
    const headers = splitCSVLine(lines[0]).map(h => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1).map(l => {
      const cells = splitCSVLine(l).map(v => v.trim().replace(/^"|"$/g, ""));
      const row = {};
      headers.forEach((h, i) => row[h] = cells[i] ?? "");
      return row;
    });
  }
  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      let rows;
      if (file.name.toLowerCase().endsWith(".json")) {
        rows = JSON.parse(text);
        if (!Array.isArray(rows)) throw new Error("El JSON debe ser un array de objetos");
      } else {
        rows = parseCSV(text);
      }

      const needed = ["fecha","tipo","valor","estandar","estado","paciente","notas"];
      const normalized = [];
      const errors = [];

      rows.forEach((raw, idx) => {
        const r = {};
        needed.forEach(k => r[k] = (raw[k] ?? "").toString().trim());
        const missing = ["fecha","tipo","valor","estado","paciente"].filter(k => !r[k]);
        if (missing.length) { errors.push(`L${idx + 2}: faltan ${missing.join(", ")}`); return; }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(r.fecha)) { errors.push(`L${idx + 2}: fecha debe ser YYYY-MM-DD`); return; }
        normalized.push(r);
      });

      let ok = 0;
      for (const r of normalized) {
        try { await createRow(r); ok++; }
        catch { errors.push("Error creando un registro"); }
      }

      setImportInfo({ ok, fail: errors.length, errors: errors.slice(0, 5) });
      setShowToast(true);
    } catch (err) {
      setImportInfo({ ok: 0, fail: 1, errors: [err?.message || "Error al leer el archivo"] });
      setShowToast(true);
    } finally {
      e.target.value = ""; // permite reimportar el mismo archivo
    }
  }

  const {
    rows, total, loading, error,
    page, setPage, pageSize,
    filters, setFilter, clearFilters,
    columns, visibleColumns, toggleColumn,
    exportCSV, createRow, updateRow,
  } = useDatos({ pageSize: 10 });

  const openEdit = (row) => { setEditing(row); setShowEdit(true); };
  const closeEdit = () => { setShowEdit(false); setEditing(null); };

  const saveEdit = async (payload) => {
    await updateRow(payload);
    closeEdit();
  };

  const saveCreate = async (payload) => {
    await createRow(payload);
    setShowCreate(false);
  };
  

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-grow-1 d-flex flex-column">
        <NavbarTop onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <Container fluid className="flex-grow-1 py-4">
          {/* Header */}
            <Row className="align-items-center mb-3">
            <Col>
                <h1 className="h4 mb-0">Datos</h1>
                {error && <div className="text-warning small mt-1">{error}</div>}
            </Col>
            <Col xs="auto" className="d-flex gap-2">
                {/* input oculto para importar */}
                <input
                ref={fileRef}
                type="file"
                accept=".csv,.json"
                className="d-none"
                onChange={handleImport}
                />
                <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
                onClick={() => fileRef.current?.click()}
                >
                <FaUpload /> Importar datos
                </Button>
                <Button variant="danger" className="d-flex align-items-center gap-2" onClick={() => setShowCreate(true)}>
                <FaPlusCircle /> Nuevo registro
                </Button>
            </Col>
            </Row>

            {/* Toast importación */}   

          {/* Filtros + Columnas */}
          <BarraFiltros
            filters={filters}
            setFilter={setFilter}
            clearFilters={clearFilters}
            onExport={() => exportCSV([...rows], "datos_filtrados.csv")}
            columns={columns}
            toggleColumn={toggleColumn}
          />

          {/* Tabla */}
          <TablaDatos
            rows={rows}
            total={total}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            columns={visibleColumns}
            loading={loading}
            onEdit={openEdit}
          />
        </Container>
      </div>

      {/* Modales */}
      <EditarDatoModal show={showEdit} data={editing} onClose={closeEdit} onSave={saveEdit} />
      <NuevoRegistroModal show={showCreate} onClose={() => setShowCreate(false)} onCreate={saveCreate} />
    </div>
  );
}
