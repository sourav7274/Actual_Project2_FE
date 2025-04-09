import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { leadStatuses,priority } from "../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeadById,getLeadCommentById } from "../features/leadSlice";

const SalesAgent = () => {
    const {id} = useParams()
    const {leads} = useSelector(state => state.leads)
    const {saleAgent} = useSelector(state => state.saleAgent)
    const [agentLeads,setLeadData] = useState([])
    console.log(agentLeads)
    const currentAgent = saleAgent.find((agent) => agent._id == id)
    console.log(currentAgent)
    useEffect(() =>{
        if(leads)
            {
                const data = leads.filter((lead) => lead.salesAgent._id == id)
                setLeadData(data)
            }
    },[leads,id])
    const handleDays = (e) =>{
        let value = e.target.value
        if(value == "all")
        {
            setLeadData(leads)
        }
        else
        {
            if(value == "0-3")
            {
                const data = leads.filter((lead) => lead.timeToClose <= 3)
                setLeadData(data)
            }
            else if(value == "4-7" ){
                const data = leads.filter((lead) => lead.timeToClose >= 4 &&  lead.timeToClose <= 7)
                setLeadData(data)
            }
            else{
                const data = leads.filter((lead) => lead.timeToClose >= 8)
                setLeadData(data)
            }
        }
        
    }
    const handlePriorityChange = (e) =>{
        if(e.target.value == "all")
        {
            setLeadData(leads)
        }
        else
        {
            const data = leads.filter((lead) => lead.priority == e.target.value)
            if(data.length>1)
            {            
             setLeadData(data)            
            }
            else
            {          
             alert("No Data with current filters")
            }
        }
    }
    const handleStatusChange = (e) =>{
        if(e.target.value == "all")
        {
            setLeadData(leads)
        }
        else
        {   
            const data = leads.filter((lead) => lead.status == e.target.value)
            if(data.length>1)
            {            
             setLeadData(data)            
            }
            else
            {          
             alert("No Data with current filters")
            }
        }
      
    }
   
    return(
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
        <SideBar />
      
        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          
          {/* Agent Name */}
          <p className="text-5xl font-bold text-blue-400">Agent Name: {currentAgent.name}</p>
          <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <label className="text-lg font-semibold">Filters:</label>
                <select onChange={handleStatusChange} className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <option value="all">All Statuses</option>
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
      
                <select onChange={handlePriorityChange} className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <option value="all">All Priorities</option>
                  {priority.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
      
              {/* Sort By Time to Close */}
              <div className="flex items-center space-x-4">
                <label className="text-lg font-semibold">Sort By Time To Close:</label>
                <select onChange={handleDays} className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <option value="all">Default</option>
                  <option value="0-3">0 - 3 days</option>
                  <option value="4-7">4 - 7 days</option>
                  <option value="8+">8+ days</option>
                </select>
              </div>
      
            </div>
          </section>
          {/* Leads Section */}
          <section className="mt-7 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <p className="text-3xl font-semibold">Leads:</p>
            <div className="mt-4 space-y-3">
              {agentLeads.map((lead) => (
                <Link
                className="flex justify-between bg-gray-900 p-4 rounded-lg shadow-md" onClick={
                  () => {
                    getLeadById(lead._id)
                    getLeadCommentById(lead._id)
                  }
                } to={`/leadManagement/${lead._id}`
                }>
                   <div key={lead.name} >
                  <p className="text-lg font-semibold">{lead.name}</p>
                  <p className="text-gray-400">{lead.status}</p>
                </div>
                </Link>
               
              ))}
            </div>
          </section>
      
          {/* Filters & Sorting */}
   
      
        </div>
      </div>
      
    )
}

export default SalesAgent