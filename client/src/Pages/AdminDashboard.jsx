import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RotaCard from "./RotaCard"
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
    useEffect(()=>{
        getAllRotas()
        getAllPontos()

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

    return <>
        <input type="text" placeholder="Nome da rota" onInput={handleSetName}/>
    <input type="number" placeholder="Numero da rota" onInput={handleSetNumero}/>
    <input type="time" placeholder="Horario de partida" onInput={handleSetHorarioPartida}/>
    <input type="number" placeholder="Maximo de passageiros" onInput={handleSetMaximoPassageiros}/>
    <button onClick={handleCreateRota}>Criar rota</button>
    <br />
    Busca: <input type="text" placeholder="Buscar por nome ou número" onInput={(e)=>setSearch(e.target.value)} />
    <hr />
    <h3>Criar Ponto</h3>
    <input type="text" placeholder="Localização do ponto" value={pontoLocalizacao} onInput={(e)=>setPontoLocalizacao(e.target.value)} />
    <button onClick={handleCreatePonto}>Criar ponto</button>
    <h3>Atribuir Ponto à Rota</h3>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select value={assignRotaId} onChange={(e)=>setAssignRotaId(e.target.value)}>
        <option value="">Selecione a rota</option>
        {allRotas.map(r=> (
          <option key={r.Id} value={r.Id}>{r.Numero} - {r.Name}</option>
        ))}
      </select>
      <select value={assignPontoId} onChange={(e)=>setAssignPontoId(e.target.value)}>
        <option value="">Selecione o ponto</option>
        {allPontos.map(p=> (
          <option key={p.Id} value={p.Id}>{p.Localizacao}</option>
        ))}
      </select>
      <input type="time" value={assignHorario} onInput={(e)=>setAssignHorario(e.target.value)} />
      <button onClick={handleAssignPontoRota}>Atribuir</button>
    </div>
    <div style={{ maxHeight: '60vh', overflowY: 'auto', border: '1px solid #e5e7eb', padding: '8px', borderRadius: '6px' }}>{
        allRotas
          .filter((rota)=>{
            const q = search.toLowerCase()
            const n = (rota?.Name || "").toLowerCase()
            const num = String(rota?.Numero ?? "").toLowerCase()
            return q === "" || n.includes(q) || num.includes(q)
          })
          .map((rota, index)=>{
            console.log(rota)
            return <RotaCard key={rota.Id} data={rota} onUpdated={getAllRotas} onDeleted={getAllRotas}/>
        })
    }
    </div>
    </>
}
export default AdminDashboard