import { useEffect, useState } from 'react'
import SideBar from '../components/Sidebar'
import { useSelector,useDispatch } from 'react-redux'
import { getSaleAgents } from '../features/saleagentSlice'
import { addComment } from '../features/leadSlice'


function LeadManagement() {

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getSaleAgents())
  },[])
  const {currentLead,status }= useSelector((state) => state.leads)
  // console.log(currentLead)
  const {saleAgent} = useSelector(state => state.saleAgent)

  const [commentData,setCommentData] = useState({
    lead:currentLead._id,
    author:"",
    commentText:""
  })

  const handleChange = (e) =>{
    const {name,value} = e.target
    setCommentData((pval) =>({
     ...pval,[name] : value
    }))
  }

  const handleCommentSubmit = () =>{
    console.log(commentData)
    dispatch(addComment({id:currentLead._id,data:commentData}))
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen grid grid-cols-3">
  <SideBar />
  {status == "loading" ? <p>Loading</p> : <><div className="col-span-2 bg-white shadow-lg p-10 rounded-lg m-5">
    <h1 className="text-3xl font-bold text-gray-800 mb-5">Lead Management</h1>
    <section className="bg-blue-100 p-6 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-700">Lead Name: <span className="text-blue-700">{currentLead.name}</span></p>
      <p className="text-lg font-semibold text-gray-700">Sales Agent: <span className="text-blue-700">{currentLead.salesAgent.name}</span></p>
      <p className="text-lg font-semibold text-gray-700">Lead Status: <span className="text-blue-700">{currentLead.status}</span></p>
      <p className="text-lg font-semibold text-gray-700">Priority: <span className="text-blue-700">{currentLead.priority}</span></p>
      <p className="text-lg font-semibold text-gray-700">Time to Close: <span className="text-blue-700">{currentLead.timeToClose} days</span></p>
      <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition">
        Edit & Save Lead
      </button>
    </section>

    <section className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Comment Section</h2>
      <div className="bg-gray-200 p-4 mt-3 rounded-lg">
        <p className="text-gray-700">"Author: - [Date and Time]"</p>
        <p className="text-gray-700">"Author: - [Date and Time]"</p>
      </div>
    </section>

    <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Add Comment</h2>
      <select 
        name="author" 
        value={commentData.value} 
        onChange={handleChange} 
        className="border border-gray-300 rounded-lg p-2 w-full mb-3"
      >
        <option value="">Select Sales Agent</option>
        {saleAgent.map((agent) => (
          <option key={agent._id} value={agent._id}>{agent.name}</option>
        ))}
      </select>
      <input 
        placeholder="Enter Comment Text" 
        name="commentText" 
        onChange={handleChange} 
        value={commentData.commentText} 
        className="border border-gray-300 rounded-lg p-2 w-full mb-3"
      />
      <button 
        onClick={handleCommentSubmit} 
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Submit
      </button>
    </section>
  </div></>}
</div>

    </>
  )
}

export default LeadManagement
