import { useEffect, useState } from 'react'
import SideBar from '../components/Sidebar'
import { useSelector,useDispatch } from 'react-redux'
import { getSaleAgents } from '../features/saleagentSlice'
import { addComment,getLeadCommentById } from '../features/leadSlice'
import { FaSpinner } from 'react-icons/fa6'

function LeadManagement() {


  const dispatch = useDispatch()
  
  const {currentLead,status }= useSelector((state) => state.leads)
  // console.log(currentLead)
  const {saleAgent} = useSelector(state => state.saleAgent)
  const comments = useSelector(state => state.leads.comments)
  const [commentData,setCommentData] = useState({
    lead:currentLead._id,
    author:"",
    commentText:""
  })

  useEffect(() =>{
    if(currentLead._id)
    {
      setCommentData((pval) =>({
        ...pval,lead:currentLead._id
      }))
    }
  },[currentLead])

  const handleChange = (e) =>{
    const {name,value} = e.target
    setCommentData((pval) =>({
     ...pval,[name] : value
    }))
  }

  const handleCommentSubmit = async () =>{
    // console.log(commentData)
   await  dispatch(addComment({id:currentLead._id,data:commentData})).unwrap()
    setCommentData({
      lead: currentLead._id,
      author: "",
      commentText: ""
    });
    dispatch(getLeadCommentById(currentLead._id))
   
  }
  // console.log(comments)
  
  useEffect(() =>{
    dispatch(getSaleAgents())
  },[dispatch])
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
    <SideBar />
   {status == "loading" ?<>
  <div className="flex justify-center items-center min-h-screen w-full">
    <FaSpinner className="animate-spin text-white text-6xl" />
  </div>
  </> : <><div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-md"> 
    <h1 className="text-3xl font-bold mb-5">Lead Management</h1>
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
      <h2 className="text-2xl font-bold ">Comment Section</h2>
     {comments &&<>
      <div className="bg-gray-200 p-4 mt-3 rounded-lg">
        {comments.map((comment) => <div>
          <p className="text-gray-700">
          <span className="font-semibold">{comment.author.name}</span>
          <span className="mx-2"> - </span> 
          <span>"{comment.commentText}"</span>
          <span className="ml-4 text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
          </p>
        </div>)}
       
      </div>
     </> }
    </section>

    <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Add Comment</h2>
      <select 
        name="author" 
        value={commentData.value} 
        onChange={handleChange} 
        className="border bg-gray-400 border-gray-300 rounded-lg p-2 w-full mb-3"
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
        className="border  bg-gray-400 border-gray-300 rounded-lg p-2 w-full mb-3"
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
