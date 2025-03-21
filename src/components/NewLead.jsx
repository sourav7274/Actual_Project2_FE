import { addLead } from "../features/leadSlice"
import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { leadSource,leadStatuses,priority } from "../App"
import { useEffect } from "react"
import { getTags } from "../features/tagSlice"
import { getSaleAgents } from "../features/saleagentSlice"

export const NewLead = () =>{
    const dispatch = useDispatch()
    const {saleAgent} = useSelector(state => state.saleAgent)
    const{ tags }= useSelector(state => state.tags)
     const [formData,setData] = useState({
       name:"",
       source:"",
       salesAgent:"",
       status:"",
       tags:"",
       timeToClose:"",
       priority:"",
     })
    const handleChange = (e) =>{
        const {name,value} = e.target
       setData((pval) => ({
        ...pval, [name]: value
       }))
    
      }
      const handleForm = (e) =>{
        e.preventDefault()
        dispatch(addLead(formData)).then((result) =>{
          if(result.meta.requestStatus === "fulfilled")
          {
            setData({
              name: "",
              source: "",
              salesAgent: "",
              status: "",
              tags: "",
              timeToClose: "",
              priority: "",
            });
          }
        })
      } 
      
        useEffect(() =>{
          dispatch(getSaleAgents())
        },[])
        useEffect(() =>{
            dispatch(getTags())
          },[])

    return(
    <>
    <section className="my-6 p-6 bg-gray-800 rounded-lg shadow-lg text-white max-w-3xl mx-auto">
  <p className="text-center text-3xl font-bold mb-6">Add New Lead</p>
  <form onSubmit={handleForm} className="space-y-5">
    {/* Lead Name */}
    <div>
      <label className="block text-lg mb-1">Lead Name:</label>
      <input
        className="w-full rounded-lg border-gray-300 p-3 text-sm focus:ring-2 focus:ring-red-400"
        placeholder="Enter lead name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    </div>

    {/* Lead Source */}
    <div>
      <label className="block text-lg mb-1">Lead Source:</label>
      <select className="w-full bg-black text-amber-100 p-3 rounded-lg focus:ring-2 focus:ring-red-400" name="source" value={formData.source} onChange={handleChange}>
        <option value="">Select Source</option>
        {leadSource.map((source) => (
          <option key={source} value={source}>{source}</option>
        ))}
      </select>
    </div>

    {/* Sales Agent */}
    <div>
      <label className="block text-lg mb-1">Sales Agent:</label>
      <select className="w-full bg-black text-amber-100 p-3 rounded-lg focus:ring-2 focus:ring-red-400" name="salesAgent" value={formData.salesAgent} onChange={handleChange}>
        <option value="">Select Agent</option>
        {saleAgent.map((agent) => (
          <option key={agent._id} value={agent._id}>{agent.name}</option>
        ))}
      </select>
    </div>

    {/* Lead Status */}
    <div>
      <label className="block text-lg mb-1">Lead Status:</label>
      <select className="w-full bg-black text-amber-100 p-3 rounded-lg focus:ring-2 focus:ring-red-400" name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select Status</option>
        {leadStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>

    {/* Priority */}
    <div>
      <label className="block text-lg mb-1">Priority:</label>
      <select className="w-full bg-black text-amber-100 p-3 rounded-lg focus:ring-2 focus:ring-red-400" name="priority" value={formData.priority} onChange={handleChange}>
        <option value="">Select Priority</option>
        {priority.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>

    {/* Time to Close */}
    <div>
      <label className="block text-lg mb-1">Time to Close:</label>
      <input
        className="w-full rounded-lg border-gray-300 p-3 text-sm focus:ring-2 focus:ring-red-400"
        placeholder="Enter number of days"
        type="number"
        name="timeToClose"
        value={formData.timeToClose}
        onChange={handleChange}
      />
    </div>

    {/* Tags */}
    <div>
      <label className="block text-lg mb-1">Tags:</label>
      <select className="w-full bg-black text-amber-100 p-3 rounded-lg focus:ring-2 focus:ring-red-400" name="tags" value={formData.tags} onChange={handleChange}>
        <option value="">Select Tag</option>
        {tags.map((tag) => (
          <option key={tag.name} value={tag.name}>{tag.name}</option>
        ))}
      </select>
    </div>

    {/* Submit Button */}
    <button className="bg-red-500 py-3 px-6 rounded-lg mt-5 w-full hover:bg-red-600 transition font-semibold text-lg" type="submit">
      Create Lead
    </button>
  </form>
</section>
    </>
    )
}