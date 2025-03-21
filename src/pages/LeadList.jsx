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
            <div className="grid grid-cols-3">
                <SideBar/>
                <div className="col-span-2 min-h-screen bg-gray-700 text-gray-200 p-10">
                   <p className="text-5xl">Lead List</p>
                   {filterData.length > 0 && <>
                   <section>
                   {filterData.map((lead) => (<div className="bg-green-700 my-3 p-3 flex flex-row">
                        <p> {lead.name}</p>
                        <p className="mx-6">{lead.status}</p>
                        <p>Agent Name: {lead.salesAgent.name}</p>
                    </div>))}
                   </section>
                   <section>
                    <p className="text-3xl mt-5 mb-3"> Filter/ Sort / Add Lead </p>
                        <section id="filter">
                        <div className="flex flex-row">
                            <div className="me-10">
                                <label>Filter By Status</label>
                                <select onChange={(e) => handleStatusChange(e)}  className="bg-gray-700 ms-4">
                                    <option value="all">All</option>
                                    {leadStatuses.map((status) => <option value={status}>{status}</option>)}
                                </select>
                            </div>
                            <div className="">
                                <label>Filter By Agents</label>
                                <select onChange={hanldeAgantChange} className="bg-gray-700 ms-4">
                                    <option value="all">All</option>
                                    {saleAgent && saleAgent.map((agent) => <option value={agent._id}>{agent.name}</option>)}
                                </select>
                            </div>
                        </div>
                        </section>  
                        <section id="sort" className="mt-5">
                        <div className="flex flex-row">
                            <div className="me-10">
                                <label>Sort By Priority</label>
                                <select onChange={(handlePriorityChange)}  className="bg-gray-700 ms-4">
                                    <option value="all">All</option>
                                    {priority.map((status) => <option value={status}>{status}</option>)}
                                </select>
                            </div>
                            <div >
                                <label>Sort By Time To Close</label>
                                <select onChange={handleDays}  className="bg-gray-700 ms-4">
                                    <option value="all">Default</option>
                                    <option value="0-3">0 - 3 days </option>
                                    <option value="4-7"> 4 days - 7 days </option>
                                    <option value="8+"> 8 days + </option>                    
                                </select>
                            </div>
                        </div>
                        </section> 
                        <section className="mt-4">
                            <div className="flex flex-row">
                            <button onClick={() => setAgentDis(!leadDis)} className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-700">Add New Lead</button>
                            <button onClick={() => setFilterData(leads)} className="bg-yellow-400 text-black px-4 ms-6 py-2 rounded-md hover:bg-yellow-700">Clear All FIlters</button>
                            </div>                           
                            {leadDis && <NewLead/>
                          }
                        </section>                
                   </section>
                   </>}
                </div>

            </div>
        </>
    )
}

export default LeadList