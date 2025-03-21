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
        <section>
            <div>
            <label htmlFor="name" className="block text-xl mt-4 font-medium text-gray-700 dark:text-gray-200">
               Name
            </label>

            <input
                type="text"
                name="name"
                value={agentData.name}
                placeholder="John Doe"
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-md border-gray-200 shadow-xs sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-xl mt-4 font-medium text-gray-700 dark:text-gray-200">
                Email
            </label>

            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={agentData.email}
                placeholder="john@rhcp.com"
                className="mt-1 w-full px-4 py-2 rounded-md border-gray-200 shadow-xs sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            </div>
            <div className="text-center mt-5">
                <button onClick={handleSubmit} className="text-lg bg-black rounded-md text-white hover:bg-white px-4 py-2 hover:text-black">Create Agent</button>
            </div>            
        </section>
    )
}

export default NewAgent