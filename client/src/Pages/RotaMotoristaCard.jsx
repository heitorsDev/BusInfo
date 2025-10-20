import React, { useState } from 'react';

function RotaMotoristaCard({ rota, motoristaId }) {
  if (!rota) return null;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ativa, setAtiva] = useState(!!rota.Ativa);
  const [numPassageiros, setNumPassageiros] = useState(Number(rota.Numero_passageiros || 0));
  const maxPass = Number(rota.Maximo_passageiros || 0);

  const updateRota = async (nextNum, nextAtiva) => {
    try {
      setSaving(true);
      setError("");
      const url = 'http://localhost:4000/rotaupdate';
      const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        credentials: 'include',
        body: JSON.stringify({
          IdRota: rota.Id,
          Numeropassageiros: Number(nextNum),
          Ativa: !!nextAtiva,
          IdMotorista: Number(motoristaId),
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.message || 'Falha ao atualizar rota');
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAtiva = async () => {
    const nextAtiva = !ativa;
    try {
      await updateRota(numPassageiros, nextAtiva);
      setAtiva(nextAtiva);
    } catch {}
  };

  const handleChangePassengers = async (delta) => {
    const next = Math.min(maxPass, Math.max(0, numPassageiros + delta));
    if (next === numPassageiros) return;
    try {
      await updateRota(next, ativa);
      setNumPassageiros(next);
    } catch {}
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', padding: 8, marginBottom: 8, borderRadius: 6 }}>
      <div><strong>Nome:</strong> {rota.Name}</div>
      <div><strong>Número:</strong> {rota.Numero}</div>
      <div><strong>Máximo passageiros:</strong> {maxPass}</div>

      <div style={{ marginTop: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="checkbox" checked={ativa} onChange={handleToggleAtiva} disabled={saving} />
          <span>{ativa ? 'Ativa' : 'Inativa'}</span>
        </label>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <strong>Nº passageiros:</strong>
          <button onClick={() => handleChangePassengers(-1)} disabled={saving || numPassageiros <= 0}>-</button>
          <span>{numPassageiros}</span>
          <button onClick={() => handleChangePassengers(1)} disabled={saving || numPassageiros >= maxPass}>+</button>
        </div>
      </div>

      {error && <div style={{ color: '#b91c1c', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
export default RotaMotoristaCard