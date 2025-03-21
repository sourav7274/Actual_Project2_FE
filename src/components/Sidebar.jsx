import {Link } from 'react-router-dom'


const SideBar = () =>{
    return(
      <>
      <div className="bg-gray-950 p-5 w-[150px] min-h-screen shadow-xl">
        <div className="flex flex-col gap-4">
          <Link 
            className="block w-full rounded bg-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition text-center hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-400"
            to="/"
          >
            Dashboard
          </Link>
          <Link 
            className="block w-full rounded bg-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition text-center hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-400"
            to="/leadList"
          >
            Lead
          </Link>  
          <Link 
            className="block w-full rounded bg-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition text-center hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-400"
            to="/saleAgentManagement"
          >
            Sales Agent
          </Link>
          <Link 
            className="block w-full rounded bg-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition text-center hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-400"
            to="/reports"
          >
            Reports
          </Link>
          <Link 
            className="block w-full rounded bg-gray-700 px-6 py-3 text-sm font-medium text-gray-200 transition text-center hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-400"
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