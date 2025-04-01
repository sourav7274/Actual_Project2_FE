import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { getAllLeads } from "../features/leadSlice";
import { useSelector,useDispatch } from "react-redux";
import { leadStatuses,priority } from "../App";
import { getSaleAgents } from "../features/saleagentSlice";

const LeadStatus = () =>{
    const dispatch = useDispatch()
    const {leads} = useSelector(state => state.leads)
    const {saleAgent} = useSelector(state => state.saleAgent)
    const [filterData,setFilterData] = useState(leads)
    useEffect(() =>{
        dispatch(getAllLeads())
    },[])
    useEffect(() =>{
        dispatch(getSaleAgents())
    },[])
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

    return(
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
        <SideBar />
      
        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
      
          {/* Filters & Sorting */}
          <section className="mt-5 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <label className="text-lg font-semibold">Filters:</label>
                <select onChange={hanldeAgantChange} className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <option value="all">All Agents</option>
                  {saleAgent && saleAgent.map((agent) => <option key={agent._id} value={agent._id}>{agent.name}</option>)}
                </select>
      
                <select onChange={handlePriorityChange} className="bg-gray-900 p-2 rounded-lg border border-gray-700">
                  <option value="all">All Priorities</option>
                  {priority.map((status) => <option key={status} value={status}>{status}</option>)}
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
      
          {/* Lead Status Sections */}
          <section className="mt-5 space-y-8">
            {leadStatuses.map((status) => (
              <section key={status} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <p className="text-3xl font-bold text-blue-400">{status}</p>
                <div className="mt-3 space-y-3">
                  {filterData.map(
                    (lead) =>
                      lead.status === status && (
                        <div key={lead.name} className="bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center">
                          <p className="text-lg font-semibold">{lead.name}</p>
                          <p className="text-gray-400">{lead.salesAgent.name}</p>
                        </div>
                      )
                  )}
                </div>
              </section>
            ))}
          </section>
      
        </div>
      </div>
      
      
    )
}

export default LeadStatus