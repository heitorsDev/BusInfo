import { useState } from "react";

const PontoCard = ({ data, onUpdated, onDeleted }) => {
  if (!data) return null;

  const [id] = useState(data.Id);
  const [localizacao, setLocalizacao] = useState(data.Localizacao || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError("");
      const url = `http://localhost:4000/admin/ponto/${id}`;
      const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          Localizacao: localizacao,
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao atualizar ponto");
      onUpdated && onUpdated();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      setError("");
      const url = `http://localhost:4000/admin/ponto/${id}`;
      const resp = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao deletar ponto");
      onDeleted && onDeleted();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <div>Id: {id}</div>
      <div>
        Localização:{" "}
        <input
          type="text"
          value={localizacao}
          onInput={(e) => setLocalizacao(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button className="button" onClick={handleUpdate} disabled={saving}>
        Atualizar
      </button>
      <button className="button" onClick={handleDelete} disabled={saving} style={{ marginLeft: 8, color: "red"}}>
        Deletar
      </button>
    </div>
  );
};

export default PontoCard;
