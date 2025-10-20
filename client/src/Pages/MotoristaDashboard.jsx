import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RotaMotoristaCard from "./RotaMotoristaCard"

const Dashboard = ()=>{
    const [res, setRes] = useState([])
    const { id } = useParams()
    const handleGetUserRotas = async (e)=>{
        const url = `http://localhost:4000/getmotoristarotas/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
          });
          const data = await response.json()
          console.log(data)
          // API returns an array directly (server/routes/GetRotasFromMotoristaRoute.js)
          // or could return { message: [...] } in other endpoints
          const list = Array.isArray(data) ? data : (Array.isArray(data?.message) ? data.message : [])
          setRes(list)
    }
    useEffect(()=>{
        handleGetUserRotas()
    }, [])

    return <>
    <div>
      {
        res.length === 0 ? (
          <div>Nenhuma rota atribuída.</div>
        ) : (
          res.map((item)=> (
            <RotaMotoristaCard key={item.Id} rota={item} motoristaId={id} />
          ))
        )
      }
    </div>
    </>
}
export default Dashboard