import SideBar from './components/Sidebar'
import { useSelector,useDispatch } from 'react-redux'
import { getAllLeads,getLeadById} from './features/leadSlice'
import { getSaleAgents } from './features/saleagentSlice'
import { getTags } from './features/tagSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NewLead } from './components/NewLead'


export  const leadSource = ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other']
export  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed']
export  const priority = ['High', 'Medium', 'Low']




function App() {
  const dispatch = useDispatch()
  const {leads} = useSelector(state => state.leads)
  const [filterData,setFilter] = useState([])
  const [addLeadDIs,setAddLead] = useState(false)

  // console.log(tags)
  useEffect(() =>{
    dispatch(getAllLeads())
  },[])

  useEffect(() =>{
    dispatch(getSaleAgents())
  },[])

  useEffect(() =>{
    dispatch(getTags())
  },[])

  // console.log(saleAgent)

  const leadStatus = leads.reduce((acc,curr) =>{
    const status = curr.status
    acc[status] = (acc[status] || 0 )+1
    return acc
  } ,{New:0, Contacted:0 , Qualified:0})
  // console.log(leads)

  const handleFilter = (val) =>{
    const data = leads.filter((lead) => lead.status == val)

    setFilter(data)
  }

  return (
    <>
      <div className='bg-black min-h-screen grid grid-cols-3 text-white'>
        <SideBar/>
        <div className='col-span-2 p-10'>
          <p className='text-3xl'>All Leads</p>
          <div className='grid grid-cols-4 gap-4 mt-5'>
            {leads.map((lead) => (
              <div className='col-span-1'>
                <Link onClick={() => dispatch(getLeadById(lead._id))} to={`/leadManagement/${lead._id}`}>{lead.name}</Link>
              </div>
              ))}
          </div>
          <section>
            <p className='text-2xl mt-9'>Lead Status</p>
            <ul className='mt-5 '>
              <li><p className='text-xl'>New: {leadStatus.New}</p></li>
              <li><p className='text-xl'>Conacted: {leadStatus.Contacted}</p></li>
              <li><p className='text-xl'>Qualified: {leadStatus.Qualified}</p></li>
            </ul>
          </section>
          <section className="mt-5 flex flex-col">
              <p className="text-2xl font-semibold mb-3">Quick Filters</p>
              <div className="flex gap-3">
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
                  onClick={() => handleFilter("New")}
                >
                  New
                </button>
                <button 
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white transition"
                  onClick={() => handleFilter("Contacted")}
                >
                  Contacted
                </button>
                <button onClick={() => setFilter([])} className='bg-red-500 px-4 py-2 rounded-md hover:bg-red-700'>Reset</button>
              </div>
            {filterData.length > 0 &&  <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                {filterData.length > 0 ? (
                  filterData.map((lead) => (
                    <div key={lead.id} className="p-2 border-b border-gray-600">
                      {lead.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No leads found</p>
                )}
              </div>}
            </section>

          <button className='bg-gray-700 px-4 py-3 mt-3 rounded hover:bg-gray-500 ' onClick={() => setAddLead(!addLeadDIs)}>Add New Lead</button>
          {addLeadDIs && 
            
            <NewLead/>
          }
        </div>
      </div>
    </>
  )
}

export default App
