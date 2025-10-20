import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";

// MOCK + almacenamiento local adicional para funcionar sin API
const MOCK = [
  { id: "m1", fecha: "2023-05-15", tipo: "Presión Arterial", valor: "135/85 mmHg", estandar: "120/80 mmHg", estado: "Elevada", paciente: "Juan Pérez", notas: "Medición después de ejercicio" },
  { id: "m2", fecha: "2023-05-02", tipo: "Colesterol Total", valor: "195 mg/dL", estandar: "< 200 mg/dL", estado: "Normal", paciente: "María Gómez", notas: "Análisis trimestral" },
  { id: "m3", fecha: "2023-04-28", tipo: "Frecuencia Cardíaca", valor: "78 lpm", estandar: "60-100 lpm", estado: "Normal", paciente: "Juan Pérez", notas: "Medición en reposo" },
  { id: "m4", fecha: "2023-04-15", tipo: "Presión Arterial", valor: "142/88 mmHg", estandar: "120/80 mmHg", estado: "Alta", paciente: "Ana Ruiz", notas: "Después de reunión estresante" },
  { id: "m5", fecha: "2023-04-01", tipo: "Triglicéridos", valor: "165 mg/dL", estandar: "< 150 mg/dL", estado: "Elevado", paciente: "María Gómez", notas: "Análisis trimestral" },
];
// elementos añadidos localmente cuando no hay API
let LOCAL_ADDED = [];

const DEFAULT_COLUMNS = [
  { key: "fecha", label: "Fecha", visible: true, render: (r) => new Date(r.fecha).toLocaleDateString() },
  { key: "tipo", label: "Tipo", visible: true },
  { key: "valor", label: "Valor", visible: true },
  { key: "estandar", label: "Estándar", visible: true },
  { key: "estado", label: "Estado", visible: true },
  { key: "paciente", label: "Paciente", visible: true },
  { key: "notas", label: "Notas", visible: true, className: "text-muted" },
];

const COLUMNS_STORAGE_KEY = "datos.columnVisibility.v1";

function loadColumnVisibility() {
  try {
    const raw = localStorage.getItem(COLUMNS_STORAGE_KEY);
    if (!raw) return DEFAULT_COLUMNS;
    const vis = JSON.parse(raw);
    return DEFAULT_COLUMNS.map((c) => ({ ...c, visible: vis[c.key] ?? c.visible }));
  } catch {
    return DEFAULT_COLUMNS;
  }
}
function saveColumnVisibility(cols) {
  const map = {};
  cols.forEach((c) => (map[c.key] = !!c.visible));
  localStorage.setItem(COLUMNS_STORAGE_KEY, JSON.stringify(map));
}
const genId = () => "m" + Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function useDatos({ pageSize = 10 } = {}) {
  const [filters, setFilters] = useState({ q: "", tipo: "", estado: "", desde: "", hasta: "" });
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(loadColumnVisibility());

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef(null);
  const debounced = (fn, delay = 400) => (...args) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fn(...args), delay);
  };

  const visibleColumns = useMemo(() => columns.filter((c) => c.visible), [columns]);
  const toggleColumn = (key, visible) => {
    setColumns((prev) => {
      const updated = prev.map((c) => (c.key === key ? { ...c, visible } : c));
      saveColumnVisibility(updated);
      return updated;
    });
  };

  const fetchData = useCallback(
    async ({ signal } = {}) => {
      setLoading(true);
      setError("");
      try {
        const { q, tipo, estado, desde, hasta } = filters;
        const params = { q, tipo, estado, desde, hasta, page, pageSize };
        const res = await api.get("/api/datos", { params, signal });
        const { items, total } = res.data || {};
        if (!Array.isArray(items)) throw new Error("Respuesta inválida");
        setRows(items);
        setTotal(Number.isFinite(total) ? total : items.length);
      } catch (e) {
        const term = filters.q.trim().toLowerCase();
        const f = (s) => (s ? new Date(s) : null);
        const dR = f(filters.desde);
        const hR = f(filters.hasta);
        const BASE = [...LOCAL_ADDED, ...MOCK]; // incluir añadidos locales
        const filtered = BASE.filter((r) => {
          const byQuery =
            !term ||
            r.fecha.toLowerCase().includes(term) ||
            r.tipo.toLowerCase().includes(term) ||
            r.valor.toLowerCase().includes(term) ||
            r.estado.toLowerCase().includes(term) ||
            r.paciente.toLowerCase().includes(term) ||
            r.notas.toLowerCase().includes(term);
          const byTipo = !filters.tipo || r.tipo === filters.tipo;
          const byEstado = !filters.estado || r.estado.toLowerCase() === filters.estado.toLowerCase();
          const dRow = f(r.fecha);
          const byDate = (!dR || dRow >= dR) && (!hR || dRow <= hR);
          return byQuery && byTipo && byEstado && byDate;
        });
        const start = (page - 1) * pageSize;
        setRows(filtered.slice(start, start + pageSize));
        setTotal(filtered.length);
        setError(e?.message || "No se pudo conectar al API, usando datos de ejemplo.");
      } finally {
        setLoading(false);
      }
    },
    [filters, page, pageSize]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData({ signal: controller.signal });
    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    const controller = new AbortController();
    const run = debounced(() => fetchData({ signal: controller.signal }), 400);
    run();
    return () => {
      controller.abort();
      clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const setFilter = (patch) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const exportCSV = (data, filename = "datos_filtrados.csv") => {
    if (!data?.length) return;
    const headers = Object.keys(data[0]);
    const esc = (v) => `"${String(v ?? "").replaceAll('"', '""').replaceAll("\n", " ")}"`;
    const csv = headers.join(",") + "\n" + data.map((r) => headers.map((h) => esc(r[h])).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // === CREATE SIMPLE ===
  const createRow = async (payload) => {
    try {
      await api.post("/api/datos", payload);
      await fetchData();
    } catch {
      const newItem = { id: genId(), ...payload };
      LOCAL_ADDED = [newItem, ...LOCAL_ADDED];
      setRows((prev) => [newItem, ...prev]);
      setTotal((t) => t + 1);
    }
  };

  // === UPDATE SIMPLE ===
  const updateRow = async (next) => {
    try {
      if (!next.id) throw new Error("Falta id");
      await api.put(`/api/datos/${encodeURIComponent(next.id)}`, next);
      await fetchData();
    } catch {
      LOCAL_ADDED = LOCAL_ADDED.map((r) => (r.id === next.id ? next : r));
      setRows((prev) => prev.map((r) => (r.id === next.id ? next : r)));
    }
  };

  return {
    rows, total, loading, error,
    page, setPage, pageSize,
    filters, setFilter, clearFilters: () => setFilter({ q: "", tipo: "", estado: "", desde: "", hasta: "" }),
    columns, visibleColumns, toggleColumn,
    exportCSV, refresh: fetchData,
    createRow, updateRow,
  };
}
