import SideBar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLeads,
  getLeadById,
  getLeadCommentById,
} from "./features/leadSlice";
import { getSaleAgents } from "./features/saleagentSlice";
import { getTags } from "./features/tagSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewLead } from "./components/NewLead";
import { motion } from "framer-motion";

export const leadSource = [
  "Website",
  "Referral",
  "Cold Call",
  "Advertisement",
  "Email",
  "Other",
];
export const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Closed",
];
export const priority = ["High", "Medium", "Low"];

const mainVariant = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const newLeadVariant = {
  initial: {
    opacity: 0,
    x: "100vh",
  },
  final: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 85,
    },
  },
};

const buttonVariant = {
  initial: {
    scale: 1,
  },
  final: {
    transition: {
      duration: 1,
    },
  },
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 1,
  },
};

function App() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const [filterData, setFilter] = useState([]);
  const [addLeadDIs, setAddLead] = useState(false);

  // console.log(tags)
  useEffect(() => {
    dispatch(getAllLeads());
  }, []);

  useEffect(() => {
    dispatch(getSaleAgents());
  }, []);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  // console.log(saleAgent)

  const leadStatus = leads.reduce(
    (acc, curr) => {
      const status = curr.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { New: 0, Contacted: 0, Qualified: 0 }
  );
  // console.log(leads)

  const handleFilter = (val) => {
    const data = leads.filter((lead) => lead.status == val);

    setFilter(data);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen w-[100%] flex text-white overflow-hidden">
        <SideBar />
        <motion.div
          variants={mainVariant}
          initial="initial"
          animate="final"
          className="flex-1 p-6 bg-gray-800 rounded-lg shadow-md"
        >
          <p className="text-3xl font-semibold text-gray-100">All Leads</p>
          <div className="grid grid-cols-4 gap-4 mt-5">
            {leads.map((lead) => (
              <div key={lead._id} className="col-span-1">
                <div>
                  <Link
                    onClick={() => {
                      dispatch(getLeadById(lead._id)),
                        dispatch(getLeadCommentById(lead._id));
                    }}
                    to={`/leadManagement/${lead._id}`}
                    className="block px-4 py-3 bg-gray-700 text-white text-center rounded-lg shadow-md transition hover:bg-indigo-500 hover:scale-105"
                  >
                    {lead.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full mt-9">
            <div className="grid grid-cols-3">
              {/* Lead Status Section */}
              <section className="p-5 rounded-lg col-span-1  text-white">
                <p className="text-xl font-semibold pb-2">Lead Status</p>
                <ul className="mt-3 space-y-2 max-w-[60%]">
                  {["New", "Contacted", "Qualified"].map((status) => (
                    <li
                      key={status}
                      className="flex justify-between px-4 py-2 bg-gray-700 rounded-md"
                    >
                      <p className="text-sm">{status}</p>
                      <span className="text-sm font-semibold bg-gray-600 px-3 py-1 rounded">
                        {leadStatus[status]}
                      </span>
                    </li>
                  ))}
                </ul>
                <section className="p-5 bg-gray-800 rounded-lg shadow-md text-white mt-6">
                  <p className="text-2xl font-semibold mb-3">Quick Filters</p>
                  <div className="flex gap-3">
                    {["New", "Contacted"].map((status) => (
                      <button
                        key={status}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
                        onClick={() => handleFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                    <button
                      onClick={() => setFilter([])}
                      className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 text-white transition"
                    >
                      Reset
                    </button>
                  </div>

                  {filterData.length > 0 && (
                    <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                      {filterData.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-2 bg-gray-600 rounded-md mb-2 last:mb-0"
                        >
                          {lead.name}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </section>

              {/* Right Side: Add New Lead + Quick Filters */}
              <div className="col-span-2 ">
                {/* Add/Close New Lead Button */}
                <motion.button
                  variants={buttonVariant}
                  initial="initial"
                  animate="final"
                  whileHover="hover"
                  whileTap="tap"
                  className={`${
                    addLeadDIs
                      ? "bg-gray-200 hover:bg-gray-500"
                      : "bg-gray-600 hover:bg-gray-300 hover:text-gray-800"
                  } text-white font-semibold rounded-lg px-4 py-2 max-w-40`}
                  onClick={() => setAddLead(!addLeadDIs)}
                >
                  {addLeadDIs ? (
                    <img
                      className="h-[20px] me-2"
                      src="https://www.svgrepo.com/show/453311/cancel.svg"
                      alt="cancel-icon"
                    />
                  ) : (
                    <div className="flex align-middle ">
                      <img
                        className="h-[20px] me-2"
                        src="https://www.svgrepo.com/show/378677/person-add.svg"
                        alt="create-icon"
                      />{" "}
                      Create Lead
                    </div>
                  )}
                </motion.button>

                {/* New Lead Form */}
                {addLeadDIs && (
                  <motion.div
                    variants={newLeadVariant}
                    initial="initial"
                    animate="final"
                    className="mt-4 py-6 bg-transparent"
                  >
                    <NewLead />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default App;
