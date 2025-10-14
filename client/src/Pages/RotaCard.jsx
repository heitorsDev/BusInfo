import { useState } from "react";

const RotaCard = ({ data, onUpdated, onDeleted }) => {
  if (!data) return null;

  const [id] = useState(data.Id);
  const [name, setName] = useState(data.Name || "");
  const [numero, setNumero] = useState(data.Numero || "");
  const [horarioPartida, setHorarioPartida] = useState(data.Horario_partida || "");
  const [maximoPassageiros, setMaximoPassageiros] = useState(
    data.Maximo_passageiros ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError("");
      const url = `http://localhost:4000/admin/rota/${id}`;
      const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          Name: name,
          Numero: numero,
          Horario_partida: horarioPartida,
          Maximo_passageiros: Number(maximoPassageiros),
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao atualizar rota");
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
      const url = `http://localhost:4000/admin/rota/${id}`;
      const resp = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao deletar rota");
      onDeleted && onDeleted();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <div>
        Id:{id}
      </div>
      <div>
        Nome: <input type="text" value={name} onInput={(e) => setName(e.target.value)} />
      </div>
      <div>
        Número: <input type="text" value={numero} onInput={(e) => setNumero(e.target.value)} />
      </div>
      <div>
        Horário de partida: <input type="text" value={horarioPartida} onInput={(e) => setHorarioPartida(e.target.value)} />
      </div>
      <div>
        Máximo de passageiros: <input type="number" value={maximoPassageiros} onInput={(e) => setMaximoPassageiros(e.target.value)} />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleUpdate} disabled={saving}>Atualizar</button>
      <button onClick={handleDelete} disabled={saving} style={{ marginLeft: 8 }}>Deletar</button>
    </div>
  );
};

export default RotaCard;