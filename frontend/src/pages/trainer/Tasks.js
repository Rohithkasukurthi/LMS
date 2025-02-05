import { useState, useContext } from "react";
import Sidebar from "../../components/sidebar";
import { SidebarContext } from "../../sidebarcontext";
import "../../styles/pages/tasks.css";

const Tasks = () => {
  const { isOpen } = useContext(SidebarContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    dueDate: "",
    task: "",
    topic: "",
  });

  // Function to toggle the popup
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Data:", formData);
    // Add logic to save task data
    setFormData({ dueDate: "", task: "", topic: "" }); // Reset form
    togglePopup(); // Close popup
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className={`container ${isOpen ? "closed" : ""}`}>
        <h1>Batch-wise Assignment Analysis</h1>
        <div className="task-heading">
          <h2 className="task-text">Batch-1 (MERN Full Stack)</h2>
          <button onClick={togglePopup}>ADD TASK</button>
        </div>
        <div className={`task-card ${isOpen ? "closed" : ""}`}>
          <h3 className="task-date">1/12/24</h3>
          <h3 className="task-title">Task-1</h3>
          <button className="view-button">View</button>
        </div>

        {isPopupVisible && (
          <div className="popup">
            <div className={`popup-content ${isOpen ? "closed" : ""}`}>
              <h2>Add New Task</h2>
              <form onSubmit={handleSubmit}>
                <label>
                Topic:
                  <input
                    type="text"
                    name="topic"
                    placeholder="Enter topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Task:
                  <textarea
                    type="text"
                    name="task"
                    id="task"
                    placeholder="Enter task"
                    value={formData.task}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Due Date:
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="popup-actions">
                  <button type="submit">Save</button>
                  <button type="button" onClick={togglePopup}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
