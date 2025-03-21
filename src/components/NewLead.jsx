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
        <section>
            <div className='mt-4'>
                        <p className='text-center text-2xl'>Add New Lead</p>
                        <form onSubmit={(e) => handleForm(e)}>
                            <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Lead Name:</label>
                            <input
                            className="w-full rounded-lg max-w-2xl ms-5 border-gray-200 p-3 text-sm"
                            placeholder="Lead Name"
                            type="name"
                            onChange={handleChange}
                            value={formData.name}
                            name='name'
                            id="name"
                            />
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Lead Source:</label>
                            <select value={formData.source} name="source" onChange={handleChange} className='bg-black text-amber-100 ms-5'>
                            <option value=""></option>
                            {leadSource.map((source) => <option value={source}>{source}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Sale Agent:</label>
                            <select value={formData.salesAgent} name='salesAgent' onChange={ handleChange} className='bg-black text-amber-100 ms-5'>
                                <option value=""></option>
                                {saleAgent.map((source) => <option value={source._id}>{source.name}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Lead Status:</label>
                            <select value={formData.status} name='status' onChange={handleChange} className='bg-black text-amber-100 ms-5'>
                                <option value=""></option>
                                {leadStatuses.map((source) => <option value={source}>{source}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Priority:</label>
                            <select value={formData.priority} name='priority' onChange={handleChange} className='bg-black text-amber-100 ms-5'>
                                <option value=""></option>
                                {priority.map((source) => <option value={source}>{source}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Time to Close:</label>
                            <input
                            className="w-full rounded-lg max-w-2xl ms-5 border-gray-200 p-3 text-sm"
                            placeholder="Number Of Days"
                            type="number"
                            id="time"
                            name="timeToClose"
                            value={formData.timeToClose}
                            onChange={ handleChange}
                            />
                        </div>
                        <div className='flex flex-row mt-4'>
                            <label className='text-xl mt-2'>Tags</label>
                            <select name='tags' value={formData.tags} onChange={ handleChange} className='bg-black text-amber-100 ms-5'>
                                <option value=""></option>
                                {tags.map((source) => <option value={source.name}>{source.name}</option>)}
                            </select>
                        </div>
                        <button className='bg-red-400 py-2 px-4 rounded-sm mt-5' type='submit'>Create Lead</button>
                        </form>                               
            </div>
        </section>
    )
}