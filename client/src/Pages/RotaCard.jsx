import { useEffect, useMemo, useState } from "react";

const RotaCard = ({ data, allPontos = [], allMotoristas = [], onUpdated, onDeleted }) => {
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
  const [loadingPontos, setLoadingPontos] = useState(false);
  const [rotaPontos, setRotaPontos] = useState([]); // [{Id, Localizacao, PontoRotaId, Horario}]
  const [loadingMotoristas, setLoadingMotoristas] = useState(false);
  const [rotaMotoristas, setRotaMotoristas] = useState([]); // [{Id, Name, CPF, MotoristaRotaId}]

  const pontosById = useMemo(() => Object.fromEntries(allPontos.map(p => [p.Id, p])), [allPontos]);
  const motoristasById = useMemo(() => Object.fromEntries(allMotoristas.map(m => [m.Id, m])), [allMotoristas]);

  const fetchRotaPontos = async () => {
    try {
      setLoadingPontos(true);
      const url = `http://localhost:4000/admin/rota/${id}/pontos`;
      const resp = await fetch(url, { credentials: "include" });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao obter pontos da rota");
      // Initialize local editable fields for each relation
      const list = Array.isArray(data?.message) ? data.message : [];
      setRotaPontos(list.map(pr => ({ ...pr, _Horario: pr.Horario || "", _PontoId: pr.Id })));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingPontos(false);
    }
  };

  const fetchRotaMotoristas = async () => {
    try {
      setLoadingMotoristas(true);
      const url = `http://localhost:4000/admin/rota/${id}/motoristas`;
      const resp = await fetch(url, { credentials: "include" });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao obter motoristas da rota");
      const list = Array.isArray(data?.message) ? data.message : [];
      setRotaMotoristas(list.map(mr => ({ ...mr, _MotoristaId: mr.Id })));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingMotoristas(false);
    }
  };

  useEffect(() => {
    fetchRotaPontos();
    fetchRotaMotoristas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const updatePontoRota = async (item) => {
    if (!item?.PontoRotaId) return;
    try {
      setError("");
      const url = `http://localhost:4000/admin/pontorota/${item.PontoRotaId}`;
      const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          Horario: item._Horario,
          Ponto_id: Number(item._PontoId),
          Rota_id: Number(id),
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao atualizar relação ponto-rota");
      await fetchRotaPontos();
    } catch (e) {
      setError(e.message);
    }
  };

  const deletePontoRota = async (pontoRotaId) => {
    try {
      setError("");
      const url = `http://localhost:4000/admin/pontorota/${pontoRotaId}`;
      const resp = await fetch(url, { method: "DELETE", credentials: "include" });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao deletar relação ponto-rota");
      await fetchRotaPontos();
    } catch (e) {
      setError(e.message);
    }
  };

  const updateMotoristaRota = async (item) => {
    if (!item?.MotoristaRotaId) return;
    try {
      setError("");
      const url = `http://localhost:4000/admin/motoristarota/${item.MotoristaRotaId}`;
      const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({
          Motorista_id: Number(item._MotoristaId),
          Rota_id: Number(id),
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao atualizar relação motorista-rota");
      await fetchRotaMotoristas();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteMotoristaRota = async (motoristaRotaId) => {
    try {
      setError("");
      const url = `http://localhost:4000/admin/motoristarota/${motoristaRotaId}`;
      const resp = await fetch(url, { method: "DELETE", credentials: "include" });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || "Falha ao deletar relação motorista-rota");
      await fetchRotaMotoristas();
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
      <div>Id:{id}</div>
      <div className="name" style={{fontFamily: "Arial", color: "black"}}>
        Nome: <input className="rectangle" style={{backgroundColor: "white"}} type="text" value={name} onInput={(e) => setName(e.target.value)} />
      </div>
      <div className="name" style={{fontFamily: "Arial", color: "black"}}>
        Número: <input className="rectangle" style={{backgroundColor: "white"}} type="text" value={numero} onInput={(e) => setNumero(e.target.value)} />
      </div>
      <div className="name" style={{fontFamily: "Arial", color: "black"}}>
        Horário de partida: <input className="rectangle" style={{backgroundColor: "white"}} type="text" value={horarioPartida} onInput={(e) => setHorarioPartida(e.target.value)} />
      </div>
      <div className="name" style={{fontFamily: "Arial", color: "black"}}>
        Máximo de passageiros: <input className="rectangle" style={{backgroundColor: "white"}} type="number" value={maximoPassageiros} onInput={(e) => setMaximoPassageiros(e.target.value)} />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button className="button" onClick={handleUpdate} disabled={saving}>Atualizar</button>
      <button className="button" onClick={handleDelete} disabled={saving} style={{ marginLeft: 8, color: "red"}}>Deletar</button>

      <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px dashed #ddd" }}>
        <div className="name" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily:"Arial" }}>
          <strong>Relações Ponto-Rota</strong>
          <button className="button" onClick={fetchRotaPontos} disabled={loadingPontos}>
            {loadingPontos ? "Atualizando..." : "Recarregar"}
          </button>
        </div>
        <div className="name" style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Edite o Horário ou reatribua o Ponto. Para remover a relação, use Deletar.
          </div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {rotaPontos.map((pr, idx) => (
            <div className="name" key={pr.PontoRotaId} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: 'wrap' }}>
              <span style={{fontFamily: "Arial", color: "black"}}><strong>ID:</strong> {pr.PontoRotaId}</span>
              <label style={{fontFamily: "Arial", color: "black"}}>
                <strong>Ponto:</strong>
                <select
                  value={pr._PontoId}
                  onChange={(e) => {
                    const v = e.target.value;
                    setRotaPontos((old) => old.map((x, i) => i === idx ? { ...x, _PontoId: v } : x));
                  }}
                >
                  {allPontos.map((p) => (
                    <option key={p.Id} value={p.Id}>{p.Localizacao}</option>
                  ))}
                </select>
              </label>
              <label style={{fontFamily: "Arial", color: "black"}}>
                <strong>Horário:</strong>
                <input className="rectangle" style={{backgroundColor: "white"}}
                  type="time" 
                  value={pr._Horario}
                  onInput={(e) => {
                    const v = e.target.value;
                    setRotaPontos((old) => old.map((x, i) => i === idx ? { ...x, _Horario: v } : x));
                  }}
                />
              </label>
              <button className="button" onClick={() => updatePontoRota(pr)}>Salvar</button>
              <button className="button" onClick={() => deletePontoRota(pr.PontoRotaId)} style={{ color: '#b91c1c' }}>Deletar</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12, paddingTop: 8, borderTop: "1px dashed #ddd" }}>
        <div className="name" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Arial" }}>
          <strong>Relações Motorista-Rota</strong>
          <button className="button" onClick={fetchRotaMotoristas} disabled={loadingMotoristas}>
            {loadingMotoristas ? "Atualizando..." : "Recarregar"}
          </button>
        </div>
        <div className="name" style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Edite o Horário ou reatribua o Motorista. Para remover a relação, use Deletar.
        </div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {rotaMotoristas.map((mr, idx) => (
            <div className="name" key={mr.MotoristaRotaId} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: 'wrap' }}>
              <span style={{fontFamily: "Arial", color: "black"}}><strong>ID:</strong> {mr.MotoristaRotaId}</span>
              <label style={{fontFamily: "Arial", color: "black"}}>
                <strong>Motorista:</strong>
                <select className="rectangle" style={{backgroundColor: "white"}}
                  value={mr._MotoristaId}
                  onChange={(e) => {
                    const v = e.target.value;
                    setRotaMotoristas((old) => old.map((x, i) => i === idx ? { ...x, _MotoristaId: v } : x));
                  }}
                >
                  {allMotoristas.map((m) => (
                    <option key={m.Id} value={m.Id}>{m.Name} ({m.CPF})</option>
                  ))}
                </select>
              </label>
              <button className="button" onClick={() => updateMotoristaRota(mr)}>Salvar</button>
              <button className="button" onClick={() => deleteMotoristaRota(mr.MotoristaRotaId)} style={{ color: '#b91c1c' }}>Deletar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotaCard;