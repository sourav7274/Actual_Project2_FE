import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getLeadCommentById } from "../features/leadSlice";
import { FaSpinner } from "react-icons/fa6";
import { updateLead } from "../features/leadSlice";

function LeadManagement() {
  const dispatch = useDispatch();
  const { currentLead, status } = useSelector((state) => state.leads);
  const { saleAgent } = useSelector((state) => state.saleAgent);
  const comments = useSelector((state) => state.leads.comments);
  const [dis, setDis] = useState(false);
  const [commentData, setCommentData] = useState({
    lead: currentLead._id,
    author: "",
    commentText: "",
  });
  const leadStatus = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const priority = ["High", "Medium", "Low"];

  useEffect(() => {
    if (currentLead._id) {
      setCommentData((prevState) => ({
        ...prevState,
        lead: currentLead._id,
      }));
    }
  }, [currentLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async () => {
    await dispatch(
      addComment({ id: currentLead._id, data: commentData })
    ).unwrap();
    setCommentData({
      lead: currentLead._id,
      author: "",
      commentText: "",
    });
    dispatch(getLeadCommentById(currentLead._id));
  };

  const EditComp = () => {
    const [editData, setEditData] = useState({
      name: currentLead.name || "",
      salesAgent: {
        _id: currentLead.salesAgent?._id || "",
        name:currentLead.salesAgent?.name || "",
      },
      status: currentLead.status || "",
      priority: currentLead.priority || "",
      timeToClose: currentLead.timeToClose || "",
    });

    const handleLeadChange = (e) => {
      const { name, value } = e.target;

      if(name == "salesAgent"){
        setEditData((prevState) => ({
          ...prevState,
          salesAgent: value,
        }));
      }else{
        setEditData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
     
    };

    const handleSubmit = () => {
      console.log(editData);
      dispatch(updateLead({id:currentLead._id,data:editData})) // Replace with actual update logic
    };

    return (
      <div className="flex flex-col">
        <section className="bg-blue-100 p-6 rounded-lg shadow-md">
          <label className="text-lg font-semibold text-gray-700">
            Lead Name:{" "}
            <input
              type="text"
              onChange={handleLeadChange}
              className="text-blue-700 px-2 py-1"
              name="name"
              value={editData.name}
              placeholder="Enter lead name"
            />
          </label>
          <br />
          <label className="text-lg font-semibold text-gray-700">
            Sales Agent:{" "}
            <select
              name="salesAgent"
              onChange={handleLeadChange}
              value={editData.salesAgent._id}
            >
              <option value="">Select Agent</option>
              {saleAgent.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className="text-lg font-semibold text-gray-700">
            Lead Status:{" "}
            <select
              name="status"
              onChange={handleLeadChange}
              value={editData.status}
            >
              <option value="">Select Status</option>
              {leadStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className="text-lg font-semibold text-gray-700">
            Priority:{" "}
            <select
              name="priority"
              onChange={handleLeadChange}
              value={editData.priority}
            >
              <option value="">Select Priority</option>
              {priority.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label className="text-lg font-semibold text-gray-700">
            Time to Close:{" "}
            <input
              type="number"
              className="text-blue-700 px-2 py-1"
              name="timeToClose"
              onChange={handleLeadChange}
              value={editData.timeToClose}
              placeholder="Enter time to close (days)"
            />
          </label>
          <br />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => setDis(false)}
            className="bg-red-500 ms-8 text-white px-6 py-2 mt-4 rounded-lg hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </section>
      </div>
    );
  };

  const DetailsDisplay = () => {
    return (
      <section className="bg-blue-100 p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700">
          Lead Name: <span className="text-blue-700">{currentLead.name}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Sales Agent:{" "}
          <span className="text-blue-700">{currentLead.salesAgent.name}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Lead Status:{" "}
          <span className="text-blue-700">{currentLead.status}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Priority:{" "}
          <span className="text-blue-700">{currentLead.priority}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Time to Close:{" "}
          <span className="text-blue-700">{currentLead.timeToClose} days</span>
        </p>
        <button
          onClick={() => setDis(true)}
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
        >
          Edit & Save Lead
        </button>
      </section>
    );
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex text-white">
      <SideBar />
      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <FaSpinner className="animate-spin text-white text-6xl" />
        </div>
      ) : (
        <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-5">Lead Management</h1>
          {dis ? <EditComp /> : <DetailsDisplay />}
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Comment Section</h2>
            {comments && (
              <div className="bg-gray-200 p-4 mt-3 rounded-lg">
                {comments.map((comment) => (
                  <div key={comment._id}>
                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {comment.author.name}
                      </span>
                      <span className="mx-2"> - </span>
                      <span>"{comment.commentText}"</span>
                      <span className="ml-4 text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Add Comment
            </h2>
            <select
              name="author"
              value={commentData.author}
              onChange={handleChange}
              className="border bg-gray-400 border-gray-300 rounded-lg p-2 w-full mb-3"
            >
              <option value="">Select Sales Agent</option>
              {saleAgent.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Enter Comment Text"
              name="commentText"
              onChange={handleChange}
              value={commentData.commentText}
              className="border bg-gray-400 border-gray-300 rounded-lg p-2 w-full mb-3"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default LeadManagement;
