import SideBar from '../components/Sidebar'
import { getSaleAgents } from '../features/saleagentSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import NewAgent from '../components/NewAgent'
import { Link } from 'react-router-dom'

function SaleAgentManagement() {
  const dispatch = useDispatch()  
  const [agentDis,handleDis] = useState(false)
  const {saleAgent} = useSelector(state => state.saleAgent)
  useEffect(() =>{
    dispatch(getSaleAgents())
  },[])

  return (
    <>
     <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
  <SideBar />

  {/* Main Content */}
  <div className="flex-1 p-8">
    <p className="text-4xl font-bold mb-6">Sale Agent Management</p>
    
    {saleAgent && (
  <section className="flex flex-wrap gap-10 mt-6">
    {saleAgent.map((agent) => (
      <Link 
        to={`/salesAgent/${agent._id}`} 
        className="w-[280px] p-4 bg-gray-700 rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
      >
        <p className="text-lg font-semibold text-white">
          🧑‍💼 Name: <span className="text-gray-300">{agent.name}</span>
        </p>
        <p className="mt-2 text-gray-400">
          ✉️ Email: <span className="text-gray-300">{agent.email}</span>
        </p>
      </Link>
    ))}
  </section>
)}



<button 
  onClick={() => handleDis(!agentDis)} 
  className="mt-5 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all hover:bg-red-500 hover:scale-105"
>
  Add New Agent
</button>

    {agentDis && <NewAgent />}
  </div>
</div>

    </>
  )
}

export default SaleAgentManagement
