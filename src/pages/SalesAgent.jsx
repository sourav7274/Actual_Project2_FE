import SideBar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { leadStatuses,priority } from "../App";
import { useEffect, useState } from "react";

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
        <div className="grid grid-cols-3">
            <SideBar/>
            <div className="col-span-2 p-10 min-h-screen text-white bg-gray-700">
             <p className="text-5xl">Agent Name: {currentAgent.name}</p>
             <p className="text-3xl mt-7">Leads :-</p>
             <section className="mt-4">
                {agentLeads.map((lead) => (<div className="flex flex-row">
                    <p>{lead.name}</p>
                    <p className="ms-5">{lead.status}</p>
                </div>))}
             </section >
             <section>
                <div className="flex flex-row">
                    <label>Filters: </label>
                    <select onChange={(e) => handleStatusChange(e)}  className="bg-gray-700 ms-4">
                        <option value="all">All</option>
                        {leadStatuses.map((status) => <option value={status}>{status}</option>)}
                    </select>
                    <select onChange={(handlePriorityChange)}  className="bg-gray-700 ms-4">
                        <option value="all">All</option>
                        {priority.map((status) => <option value={status}>{status}</option>)}
                    </select>
                </div>
                <div className="flex flex-row">
                     <label>Sort By Time To Close</label>
                        <select onChange={handleDays}  className="bg-gray-700 ms-4">
                            <option value="all">Default</option>
                            <option value="0-3">0 - 3 days </option>
                            <option value="4-7"> 4 days - 7 days </option>
                            <option value="8+"> 8 days + </option>                    
                        </select>
                    </div>
             </section>
            </div>
        </div>
    )
}

export default SalesAgent