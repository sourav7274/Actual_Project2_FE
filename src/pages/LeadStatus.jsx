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
        <div className="grid grid-cols-3">
            <SideBar/>
            <div className="col-span-2 min-h-screen bg-amber-600 p-10">
                <section className="mt-5">
                    {leadStatuses.map((status)=> (
                        <section>
                            <p className="text-5xl">{status}</p>
                            {filterData.map((lead) => lead.status == status && (
                                <div className="mt-3 flex flex-row">
                                    <p >{lead.name}</p>
                                    <p className="ms-5">{lead.salesAgent.name}</p>
                                </div>
                            ))}
                        </section>
                    ))}
                </section>
                <section className="mt-5">
                    <div className="flex flex-row">
                        <label>Filters: </label>
                        <select onChange={hanldeAgantChange} className=" ms-4">
                                    <option value="all">All Agents</option>
                                    {saleAgent && saleAgent.map((agent) => <option value={agent._id}>{agent.name}</option>)}
                        </select>
                        <select onChange={(handlePriorityChange)}  className=" ms-4">
                                    <option value="all">All</option>
                                    {priority.map((status) => <option value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div >
                        <label>Sort By Time To Close</label>
                        <select onChange={handleDays}  className=" ms-4">
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

export default LeadStatus