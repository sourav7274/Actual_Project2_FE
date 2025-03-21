import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { getAllLeads } from "../features/leadSlice";
import { getSaleAgents} from "../features/saleagentSlice";
import { useSelector,useDispatch } from "react-redux";
import {leadStatuses,priority } from "../App";
import { NewLead } from "../components/NewLead";

const LeadList = () =>{
    const dispatch = useDispatch()
    const {leads} = useSelector(state => state.leads)
    const {saleAgent} = useSelector(state => state.saleAgent)
    const [filterData,setFilterData] = useState(leads)
    const [leadDis,setAgentDis] = useState(false)
    // console.log(leads)

    useEffect(() =>{
        dispatch(getAllLeads())
    },[])
    useEffect(() =>{
        dispatch(getSaleAgents())
    },[])
    console.log(filterData)

    const handleStatusChange = (e) =>{
        if(e.target.value == "all")
        {
            setFilterData(leads)
        }
        else
        {   
            const data = leads.filter((lead) => lead.status == e.target.value)
            if(data.length>1)
            {            
             setFilterData(data)            
            }
            else
            {          
             alert("No Data with current filters")
            }
        }
      
    }
    const hanldeAgantChange = (e) =>{
        if(e.target.value == "all")
        {
            setFilterData(leads)
        }
        else
        {
            const data = leads.filter((lead) => lead.salesAgent._id == e.target.value)
            if(data.length>1)
            {            
             setFilterData(data)            
            }
            else
            {          
             alert("No Data with current filters")
            }
        }
    }
    const handlePriorityChange = (e) =>{
        if(e.target.value == "all")
        {
            setFilterData(leads)
        }
        else
        {
            const data = leads.filter((lead) => lead.priority == e.target.value)
            if(data.length>1)
            {            
             setFilterData(data)            
            }
            else
            {          
             alert("No Data with current filters")
            }
        }
    }
    const handleDays = (e) =>{
        let value = e.target.value
        if(value == "all")
        {
            setFilterData(leads)
        }
        else
        {
            if(value == "0-3")
            {
                const data = leads.filter((lead) => lead.timeToClose <= 3)
                setFilterData(data)
            }
            else if(value == "4-7" ){
                const data = leads.filter((lead) => lead.timeToClose >= 4 &&  lead.timeToClose <= 7)
                setFilterData(data)
            }
            else{
                const data = leads.filter((lead) => lead.timeToClose >= 8)
                setFilterData(data)
            }
        }
        
    }

    return(
        <>
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
          <SideBar />
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            <p className="text-5xl font-bold mb-6">Lead List</p>
      
            {filterData.length > 0 && (
              <>
              {/* Filter / Sort / Add Lead Section */}
              <section className="mt-10">
  <p className="text-3xl font-semibold mb-6 text-white">Filter / Sort / Add Lead</p>

  {/* Filters */}
  <section id="filter" className="bg-gray-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4 text-gray-300">Filter Leads</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">Filter By Status</label>
        <select
          onChange={handleStatusChange}
          className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All</option>
          {leadStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">Filter By Agents</label>
        <select
          onChange={hanldeAgantChange}
          className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All</option>
          {saleAgent?.map((agent) => (
            <option key={agent._id} value={agent._id}>{agent.name}</option>
          ))}
        </select>
      </div>
    </div>
  </section>

  {/* Sorting */}
  <section id="sort" className="bg-gray-800 p-6 mt-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4 text-gray-300">Sort Leads</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">Sort By Priority</label>
        <select
          onChange={handlePriorityChange}
          className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All</option>
          {priority.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-400">Sort By Time To Close</label>
        <select
          onChange={handleDays}
          className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">Default</option>
          <option value="0-3">0 - 3 days</option>
          <option value="4-7">4 - 7 days</option>
          <option value="8+">8+ days</option>
        </select>
      </div>
    </div>
  </section>

  {/* Action Buttons */}
  <section className="my-6 flex flex-wrap gap-4">
    <button
      onClick={() => setAgentDis(!leadDis)}
      className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
    >
      Add New Lead
    </button>

    <button
      onClick={() => setFilterData(leads)}
      className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
    >
      Clear All Filters
    </button>
  </section>

  {leadDis && <NewLead />}
</section>


                {/* Lead List Section */}
                <section className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {filterData.map((lead) => (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-2 border border-gray-700 hover:border-gray-500 transition duration-300">
        <h3 className="text-xl font-semibold text-white">{lead.name}</h3>
        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">Status:</span> {lead.status}
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">Agent:</span> {lead.salesAgent.name}
        </p>
      </div>
    ))}
  </div>
                </section>

      
                
              </>
            )}
          </div>
        </div>
      </>
      
    )
}

export default LeadList