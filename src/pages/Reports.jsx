import SideBar from '../components/Sidebar'
import { getAllLeads } from '../features/leadSlice'
import { getSaleAgents } from '../features/saleagentSlice'
import { leadStatuses } from '../App'
import { Chart as ChartJs, BarElement,ArcElement,CategoryScale,LinearScale,Tooltip,Legend } from 'chart.js'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Bar,Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'


ChartJs.register(BarElement,ArcElement,CategoryScale,LinearScale,Tooltip,Legend,ChartDataLabels)

function Report() {
  const dispatch = useDispatch()
  const [statusCount,setCount] = useState({})
  const [total,setTotal] = useState({})
  const [agentData,setData] = useState({})
  const {leads} = useSelector(state => state.leads)
  const {saleAgent} = useSelector(state => state.saleAgent)
    useEffect(() =>{
      dispatch(getAllLeads())
    },[dispatch])
  
    useEffect(() =>{
      dispatch(getSaleAgents())
    },[dispatch])

    useEffect(() =>{
      const calcs = leads.reduce((acc,curr)=>{
        if(curr.status == "Closed")
        {
          acc.closed +=1
        }
        else
        {
          acc.inPipe +=1
        }
        return acc
      },{closed:0,inPipe:0})
      setTotal(calcs)
    },[leads])

    // console.log(total)

    useEffect(() =>{
      const counts = leadStatuses.reduce((acc,curr) =>{
        acc[curr] = leads.filter((item) => item.status == curr).length
        return acc
      } ,{})
      // console.log(counts)
      setCount(counts)
    },[leads])
    // console.log(leads)

    useEffect(() =>{
      const values = saleAgent.reduce((acc,curr) =>{
        acc[curr.name] = leads.filter((item) => item.salesAgent.name == curr.name ).length
        return acc
      },{})
      setData(values)
    },[leads,saleAgent])
    // console.log(agentData)

    const statusLabels = Object.keys(statusCount)
    const statusValues = Object.values(statusCount)
    // console.log(statusLabels,statusValues)
    const statusChartData = {
      labels:statusLabels,
      datasets: [{
        label:"Status Content",
        data: statusValues,
        backgroundColor: ["red","blue","green","#118AB2","orange"],
        borderColor: "#4ECDC4"
      }]
    }
    const totalLabel = Object.keys(total)
    const totalValues  = Object.values(total)
    const totalPieData  = {
      labels:totalLabel,
      datasets:[{
        label:"total data",
        data:totalValues,
        backgroundColor:["#FF5733","#1E3A8A"],
        borderColor:"#3A86FF "
      }]
    }

    const agentLabel = Object.keys(agentData)
    const agentValues = Object.values(agentData)
    console.log(agentValues,agentLabel)
    const agentBarData = {
      labels:agentLabel,
      datasets:[{
        label:"Agent Data",
        data:agentValues,
        backgroundColor:["#1E3A8A", "#3A86FF", "#118AB2", "#4ECDC4", "#5E60CE"],
        borderColor:"black"
      }]
    }

    const pieOptions = {
      plugins:{
        legend:{
          display: true,
          position: 'left'   
        },
        datalabels:{
          color: "white",
          font:{
            size: 18,
            weight: "bold"
          }
        },
        formaatter : (value,context) => {
          let total = context.dataset.data.reduce((a,b) => a+b,0)
          let percentage = ((value/total)*100).toFixed(1)
          return `${value} (${percentage})`
        }
      }
    }

  return (
    <>
      <div className='bg-red-500 min-h-screen grid grid-cols-3'>
        <SideBar/>
        <div className='col-span-2 bg-gray-400 p-10'>
            <p className='text-5xl text-blue-400'>Reports</p>
            <p className='text-2xl text-white'>Total Leads Closed and in Pipeline</p>
            <section>
             <Pie style={{height:"700px"}} data={totalPieData} options={pieOptions} />
            </section>
            <section>
              <p>Total Leads Closed By Agents</p>
              <div>
                <Bar data={agentBarData} />
              </div>
            </section>
            <section>
               <p>Lead Status Distribution
                <div>
                  {/* <Bar data={statusChartData}/> */}
                  <Pie style={{height:"700px"}} data ={statusChartData} options={pieOptions}/>
                </div>
               </p>
            </section>
        </div>
      </div>
    </>
  )
}

export default Report
