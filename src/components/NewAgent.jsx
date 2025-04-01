import { useDispatch } from "react-redux";
import { addAgent } from "../features/saleagentSlice";
import { useState } from "react"



const NewAgent = () =>{
    const dispatch = useDispatch()
    const [agentData,setData] = useState({
        name:"",
        email:""
    })
    const handleChange =(e) =>{
        const {name,value} = e.target
        setData((pval) =>({
            ...pval,[name]: value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(agentData)
        dispatch(addAgent(agentData)).then((result) =>{
           if(result.meta.requestStatus == "fullfilled")
           {
            setData({
                name:"",
                email:""
            })
           }
        })
    }
    return(
        <section className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={agentData.name}
              placeholder="John Doe"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-600 shadow-sm bg-gray-900 text-white focus:ring-2 focus:ring-gray-500"
            />
          </div>
    
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={agentData.email}
              placeholder="john@rhcp.com"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-600 shadow-sm bg-gray-900 text-white focus:ring-2 focus:ring-gray-500"
            />
          </div>
    
          <div className="flex justify-center mt-5">
            <button 
              onClick={handleSubmit} 
              className="text-lg bg-black border border-gray-600 rounded-md text-white px-6 py-3 transition-all hover:bg-white hover:text-black hover:border-black"
            >
              Create Agent
            </button>
          </div>
        </div>
      </section>
    )
}

export default NewAgent