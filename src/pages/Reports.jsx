import SideBar from "../components/Sidebar";
import { getAllLeads } from "../features/leadSlice";
import { getSaleAgents } from "../features/saleagentSlice";
import { leadStatuses } from "../App";
import {
  Chart as ChartJs,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ImTextColor } from "react-icons/im";
import { color } from "chart.js/helpers";

ChartJs.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

function Report() {
  const dispatch = useDispatch();
  const [statusCount, setCount] = useState({});
  const [total, setTotal] = useState({});
  const [agentData, setData] = useState({});
  const { leads } = useSelector((state) => state.leads);
  const { saleAgent } = useSelector((state) => state.saleAgent);
  useEffect(() => {
    dispatch(getAllLeads());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSaleAgents());
  }, [dispatch]);

  useEffect(() => {
    const calcs = leads.reduce(
      (acc, curr) => {
        if (curr.status == "Closed") {
          acc.closed += 1;
        } else {
          acc.inPipe += 1;
        }
        return acc;
      },
      { closed: 0, inPipe: 0 }
    );
    setTotal(calcs);
  }, [leads]);

  // console.log(total)

  useEffect(() => {
    const counts = leadStatuses.reduce((acc, curr) => {
      acc[curr] = leads.filter((item) => item.status == curr).length;
      return acc;
    }, {});
    // console.log(counts)
    setCount(counts);
  }, [leads]);
  // console.log(leads)

  useEffect(() => {
    const values = saleAgent.reduce((acc, curr) => {
      acc[curr.name] = leads.filter(
        (item) => item.salesAgent.name == curr.name
      ).length;
      return acc;
    }, {});
    setData(values);
  }, [leads, saleAgent]);
  // console.log(agentData)

  const statusLabels = Object.keys(statusCount);
  const statusValues = Object.values(statusCount);
  // console.log(statusLabels,statusValues)
  const statusChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Status Content",
        data: statusValues,
        backgroundColor: [
          "#FF5733", // Vibrant Red
          "#3357FF", // Vibrant Blue
          "#FF8C00", // Dark Orange (replacing Gold)
          "#8A2BE2", // Blue Violet
          "#40E0D0", // Turquoise
        ],
        borderColor: "#4ECDC4",
      },
    ],
  };
  const totalLabel = Object.keys(total);
  const totalValues = Object.values(total);
  const totalPieData = {
    labels: totalLabel,
    datasets: [
      {
        label: "Total Data",
        data: totalValues,
        backgroundColor: ["#3A86FF", "#FF6B35", "#9B5DE5"], // Blue, Orange, Purple
        borderColor: "#FFFFFF", // White borders for contrast
      },
    ],
  };

  const agentLabel = Object.keys(agentData);
  const agentValues = Object.values(agentData);
  console.log(agentValues, agentLabel);
  const agentBarData = {
    labels: agentLabel,
    datasets: [
      {
        label: "Closed Leads by Agent",
        data: agentValues,
        backgroundColor: [
          "#06D6A0",
          "#118AB2",
          "#9B5DE5",
          "#FF6B35",
          "#FFC300",
        ], // Teal, Blue, Purple, Orange, Gold
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "white", // Changed legend text color to white
        },
      },
      datalabels: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      formaatter: (value, context) => {
        let total = context.dataset.data.reduce((a, b) => a + b, 0);
        let percentage = ((value / total) * 100).toFixed(1);
        return `${value} (${percentage})`;
      },
    },
  };
  const BarOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white", // Ensure legend text color is white
          font: {
            size: 14,
          },
          generateLabels: (chart) => {
            return chart.data.labels.map((label, index) => ({
              text: label, // Display sales agent names in the legend
              fillStyle: chart.data.datasets[0].backgroundColor[index],
              hidden: chart.getDatasetMeta(0).data[index].hidden,
              index: index,
              fontColor: "white", // Explicitly set font color to white
            }));
          },
        },
        onClick: (e, legendItem, chart) => {
          const index = legendItem.index;
          const meta = chart.getDatasetMeta(0);

          // Toggle dataset visibility
          meta.data[index].hidden = !meta.data[index].hidden;

          // Update chart
          chart.update();
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index", // Ensures proper legend filtering
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Set x-axis labels (sales agent names) to white
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Set y-axis labels to white
        },
      },
    },
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          <p className="text-5xl font-bold text-blue-400">Reports</p>

          <section className="grid grid-cols-2 ">
            <div className="p-6 col-span=1 me-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <p className="text-xl font-semibold text-gray-300">
                Total Leads Closed and in Pipeline
              </p>
              <div className="flex justify-center h-[500px] w-[500px]">
                <Pie data={totalPieData} options={pieOptions} />
              </div>
            </div>
            <div className="p-6 col-span=1  bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <p className="text-xl font-semibold text-gray-300">
                Total Leads Closed By Agents
              </p>
              <div className="flex justify-center">
                <Bar
                  className="h-[400px]"
                  data={agentBarData}
                  options={BarOptions}
                />
              </div>
            </div>
          </section>

          <section className="p-6 bg-gray-800 rounded-lg shadow-md border max-w-max border-gray-700">
            <p className="text-xl font-semibold text-gray-300">
              Lead Status Distribution
            </p>
            <div className="flex justify-center h-[600px] w-[600px]">
              <Pie data={statusChartData} options={pieOptions} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Report;
