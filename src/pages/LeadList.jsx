import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { getAllLeads } from "../features/leadSlice";
import { getSaleAgents } from "../features/saleagentSlice";
import { useSelector, useDispatch } from "react-redux";
import { leadStatuses, priority } from "../App";
import { NewLead } from "../components/NewLead";
import { motion } from "framer-motion";

const LeadList = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const { saleAgent } = useSelector((state) => state.saleAgent);
  const [filterData, setFilterData] = useState(leads);
  const [leadDis, setAgentDis] = useState(false);
  const [filters, setFilter] = useState({
    status: "all",
    agents: "all",
    priority: "all",
    time: "all",
  });
  console.log(leads);

  useEffect(() => {
    dispatch(getAllLeads());
  }, []);
  useEffect(() => {
    dispatch(getSaleAgents());
  }, []);

  useEffect(() => {
    let tempLeads = leads;

    if (filters.status !== "all") {
      tempLeads = tempLeads.filter((lead) => lead.status === filters.status);
    }
    if (filters.agents !== "all") {
      tempLeads = tempLeads.filter(
        (lead) => lead.salesAgent._id === filters.agents
      );
    }
    if (filters.priority !== "all") {
      tempLeads = tempLeads.filter(
        (lead) => lead.priority === filters.priority
      );
    }
    if (filters.time !== "all") {
      if (filters.time === "0-3") {
        tempLeads = tempLeads.filter((lead) => lead.timeToClose <= 3);
      } else if (filters.time === "4-7") {
        tempLeads = tempLeads.filter(
          (lead) => lead.timeToClose >= 4 && lead.timeToClose <= 7
        );
      } else {
        tempLeads = tempLeads.filter((lead) => lead.timeToClose >= 8);
      }
    }
    setFilterData(tempLeads);
  }, [filters, leads]);

  const handleStatusChange = (e) => {
    setFilter((pval) => ({ ...pval, status: e.target.value }));
  };
  const hanldeAgantChange = (e) => {
    setFilter((pval) => ({ ...pval, agents: e.target.value }));
  };
  const handlePriorityChange = (e) => {
    setFilter((pval) => ({ ...pval, priority: e.target.value }));
  };
  const handleDays = (e) => {
    setFilter((pval) => ({ ...pval, time: e.target.value }));
  };
  const handleClearFilters = () => {
    setFilterData(leads);
    setFilter({
      status: "all",
      agents: "all",
      priority: "all",
      time: "all",
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <p className="text-5xl font-bold mb-6">Lead List</p>

          {filterData.length > 0 ? (
            <>
              {/* Filter / Sort / Add Lead Section */}
              <section className="mt-10">
                <p className="text-3xl font-semibold mb-6 text-white">
                  Filter / Sort / Add Lead
                </p>

                {/* Filters */}
                <section
                  id="filter"
                  className="bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">
                    Filter Leads
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">
                        Filter By Status
                      </label>
                      <select
                        onChange={handleStatusChange}
                        className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                      >
                        <option value="all">All</option>
                        {leadStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">
                        Filter By Agents
                      </label>
                      <select
                        onChange={hanldeAgantChange}
                        className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                      >
                        <option value="all">All</option>
                        {saleAgent?.map((agent) => (
                          <option key={agent._id} value={agent._id}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* Sorting */}
                <section
                  id="sort"
                  className="bg-gray-800 p-6 mt-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">
                    Sort Leads
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">
                        Sort By Priority
                      </label>
                      <select
                        onChange={handlePriorityChange}
                        className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                      >
                        <option value="all">All</option>
                        {priority.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-400">
                        Sort By Time To Close
                      </label>
                      <select
                        onChange={handleDays}
                        className="bg-gray-700 text-white w-full p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                      >
                        <option value="all">Default</option>
                        <option value="0-3">0 - 3 days</option>
                        <option value="4-7">4 - 7 days</option>
                        <option value="8+">8+ days</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <section className="my-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => setAgentDis(!leadDis)}
                    className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Add New Lead
                  </button>

                  <button
                    onClick={handleClearFilters}
                    className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </section>

                {leadDis && <NewLead />}
              </section>

              {/* Lead List Section */}
              <section className="space-y-6">
                <motion.div
                  key={filterData}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filterData.map((lead) => (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-2 border border-gray-700 hover:border-gray-500 transition duration-300">
                      <h3 className="text-xl font-semibold text-white">
                        {lead.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-gray-300">
                          Status:
                        </span>{" "}
                        {lead.status}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-gray-300">
                          Agent:
                        </span>{" "}
                        {lead.salesAgent.name}
                      </p>
                      <p>{lead.status}</p>
                      <p>{lead.salesAgent.name}</p>
                      <p>{lead.priority}</p>
                      <p>{lead.timeToClose}</p>
                    </div>
                  ))}
                </motion.div>
              </section>
            </>
          ) : (
            <>
              <p>No Date With Current Filters</p>
              <button
                onClick={handleClearFilters}
                className="bg-yellow-400 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LeadList;
