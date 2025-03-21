import {Link } from 'react-router-dom'


const SideBar = () =>{
    return(
        <>
        <div className="bg-red-800 p-5 w-1/4 md:w-1/5 lg:w-1/6 min-h-screen">
  <div className="flex flex-col space-y-2 gap-5">
  <Link 
      className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
      to="/"
    >
      Dashboard
    </Link>  
    <Link 
      className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
      to="/leadList"
    >
      Lead
    </Link>  
    <Link 
      className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
      to="/saleAgentManagement"
    >
    Sales Agent
    </Link>

    <Link 
      className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
     to="/reports"
    >
     Reports
    </Link>
    <Link 
      className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
     to="/leadStatus"
    >
     Lead Status
    </Link>
   
  </div>
         </div>
        </>
    )
}

export default SideBar