import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RotaCard from "./RotaCard"
import PontoCard from "./PontoCard"
import "../style/Button.css"
import "../style/Rectangle.css"
import "../style/Subtitle.css"
const AdminDashboard = ()=>{
    const [allRotas, setAllRotas] = useState([])
    const [search, setSearch] = useState("")
    const [name, setName] = useState("")
    const [numero, setNumero] = useState("")
    const [horarioPartida, setHorarioPartida] = useState("")
    const [maximoPassageiros, setMaximoPassageiros] = useState("")
    // Pontos
    const [allPontos, setAllPontos] = useState([])
    const [pontoLocalizacao, setPontoLocalizacao] = useState("")
    // Atribuição ponto->rota
    const [assignRotaId, setAssignRotaId] = useState("")
    const [assignPontoId, setAssignPontoId] = useState("")
    const [assignHorario, setAssignHorario] = useState("")

    // Motoristas
    const [allMotoristas, setAllMotoristas] = useState([])
    // Atribuição motorista->rota
    const [assignMotoristaRotaId, setAssignMotoristaRotaId] = useState("")
    const [assignMotoristaId, setAssignMotoristaId] = useState("")

    const handleSetName = (e)=>{
        setName(e.target.value)
    }
    const handleSetNumero = (e)=>{
        setNumero(e.target.value)
    }
    const handleSetHorarioPartida = (e)=>{
        setHorarioPartida(e.target.value)
    }
    const handleSetMaximoPassageiros = (e)=>{
        setMaximoPassageiros(e.target.value)
    }
    const getAllRotas = async ()=>{
        const url = 'http://localhost:4000/getallrotas'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
          });
          const data = await response.json()
          console.log(data)
          setAllRotas(data.message)
    }
    const getAllPontos = async ()=>{
        const url = 'http://localhost:4000/getallpontos'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
          });
          const data = await response.json()
          console.log(data)
          setAllPontos(data.message)
    }
    const getAllMotoristas = async ()=>{
        const url = 'http://localhost:4000/getallmotoristas'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
          });
          const data = await response.json()
          console.log(data)
          setAllMotoristas(data.message || [])
    }
    useEffect(()=>{
        getAllRotas()
        getAllPontos()
        getAllMotoristas()

    }, [])

    const handleCreateRota = async (e)=>{
        const url = 'http://localhost:4000/rotacreate'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
            body: JSON.stringify({
                Name: name,
                Numero: numero,
                HorarioPartida: horarioPartida,
                MaximoPassageiros: maximoPassageiros
            }),
          });
          const data = await response.json()
          console.log(data)
          await getAllRotas()
    }

    const handleCreatePonto = async ()=>{
        const url = 'http://localhost:4000/pontocreate'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
            body: JSON.stringify({
                Localizacao: pontoLocalizacao
            }),
          });
          const data = await response.json()
          console.log(data)
          setPontoLocalizacao("")
          await getAllPontos()
    }

    const handleAssignPontoRota = async ()=>{
        if (!assignRotaId || !assignPontoId || !assignHorario) return;
        const url = 'http://localhost:4000/pontorotacreate'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
            body: JSON.stringify({
                IdPonto: Number(assignPontoId),
                IdRota: Number(assignRotaId),
                Horario: assignHorario
            }),
          });
          const data = await response.json()
          console.log(data)
          // Optionally refresh rotas if your UI depends on it
          // await getAllRotas()
          setAssignHorario("")
    }

    const handleAssignMotoristaRota = async ()=>{
        if (!assignMotoristaRotaId || !assignMotoristaId) return;
        const url = 'http://localhost:4000/motoristaRotaRegister'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
            body: JSON.stringify({
                IdMotorista: Number(assignMotoristaId),
                IdRota: Number(assignMotoristaRotaId)
            }),
          });
          const data = await response.json()
          console.log(data)
    }

    return <>
        <input className="rectangle"type="text" placeholder="Nome da rota" onInput={handleSetName}/>
    <input className="rectangle" type="number" placeholder="Numero da rota" onInput={handleSetNumero}/>
    <input className="rectangle" type="time" placeholder="Horario de partida" onInput={handleSetHorarioPartida}/>
    <input className="rectangle" type="number" placeholder="Maximo de passageiros" onInput={handleSetMaximoPassageiros}/>
    <button className="button" onClick={handleCreateRota}>Criar rota</button>
    <br  />
    Busca: < input className = "rectangle" type="text" placeholder="Buscar por nome ou número" onInput={(e)=>setSearch(e.target.value)} />
    <hr />
    <h3 className="subtitle">Criar Ponto</h3>
    <input type="text" placeholder="Localização do ponto" className = "rectangle" value={pontoLocalizacao} onInput={(e)=>setPontoLocalizacao(e.target.value)} />
    <button className="button" onClick={handleCreatePonto}>Criar ponto</button>
    <h3 className="subtitle">Atribuir Ponto à Rota</h3>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select className = "rectangle" value={assignRotaId} onChange={(e)=>setAssignRotaId(e.target.value)}>
        <option value="">Selecione a rota</option>
        {allRotas.map(r=> (
          <option key={r.Id} value={r.Id}>{r.Numero} - {r.Name}</option>
        ))}
      </select>
      <select className = "rectangle" value={assignPontoId} onChange={(e)=>setAssignPontoId(e.target.value)}>
        <option value="" className="button">Selecione o ponto</option>
        {allPontos.map(p=> (
          <option key={p.Id} value={p.Id}>{p.Localizacao}</option>
        ))}
      </select>
      <input className = "rectangle" type="time" value={assignHorario} onInput={(e)=>setAssignHorario(e.target.value)} />
      <button className="button" onClick={handleAssignPontoRota}>Atribuir</button>
    </div>

    <h3 className = "subtitle" style={{ marginTop: 12 }}>Atribuir Motorista à Rota</h3>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select className = "rectangle" value={assignMotoristaRotaId} onChange={(e)=>setAssignMotoristaRotaId(e.target.value)}>
        <option value="">Selecione a rota</option>
        {allRotas.map(r=> (
          <option key={r.Id} value={r.Id}>{r.Numero} - {r.Name}</option>
        ))}
      </select>
      <select className = "rectangle" value={assignMotoristaId} onChange={(e)=>setAssignMotoristaId(e.target.value)}>
        <option value="">Selecione o motorista</option>
        {allMotoristas.map(m=> (
          <option key={m.Id} value={m.Id}>{m.Name} ({m.CPF})</option>
        ))}
      </select>
      <button className="button" onClick={handleAssignMotoristaRota}>Atribuir</button>
    </div>
    <div style={{ maxHeight: '60vh', overflowY: 'auto', border: '1px solid #e5e7eb', padding: '8px', borderRadius: '6px' }}>
      {
        allRotas
          .filter((rota) => {
            const q = search.toLowerCase()
            const n = (rota?.Name || "").toLowerCase()
            const num = String(rota?.Numero ?? "").toLowerCase()
            return q === "" || n.includes(q) || num.includes(q)
          })
          .map((rota) => (
            <RotaCard
              key={rota.Id}
              data={rota}
              allPontos={allPontos}
              allMotoristas={allMotoristas}
              onUpdated={getAllRotas}
              onDeleted={getAllRotas}
            />
          ))
      }
    </div>
    <h3 className = "subtitle">Pontos</h3>
    <div style={{ maxHeight: '60vh', overflowY: 'auto', border: '1px solid #e5e7eb', padding: '8px', borderRadius: '6px', marginTop: '8px' }}>
      {allPontos.map((ponto) => (
        <PontoCard key={ponto.Id} data={ponto} onUpdated={getAllPontos} onDeleted={getAllPontos} />
      ))}
    </div>
    </>
}
export default AdminDashboard