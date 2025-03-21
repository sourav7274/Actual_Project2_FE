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
      <div className='bg-red-500 min-h-screen grid grid-cols-3'>
        <SideBar/>
        <div className='col-span-2 bg-yellow-700 p-10'>
            <p className='text-4xl'>Sale Agent Management</p>
            {
              saleAgent && <section>
                {saleAgent.map((agent) => (<Link to={`/salesAgent/${agent._id}`} className='flex mt-6 p-2 rounded flex-row bg-green-600 '>
                  <p>Name : {agent.name}</p>
                  <p className='ms-5'>Email: {agent.email}</p>
                </Link>))}
              </section>
            }
            <button onClick={() => handleDis(!agentDis)} className='mt-5 bg-red-700 hover:cursor-pointer rounded px-4 py-2 text-blue-500'>Add New Agent</button>
            {agentDis && <NewAgent/>}
        </div>
      </div>
    </>
  )
}

export default SaleAgentManagement
