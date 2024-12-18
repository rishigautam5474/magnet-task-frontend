import React, { useState, useEffect } from "react";
import taskModel from "../models/task.model";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../lib/helper";

const EditTask = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [accessTask, setAccessTask] = useState({});
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const getTaskList = async () => {
    try {
      const foundTask = await taskModel.specificTaskAccess(id);
      if (foundTask) {
        const formattedTask = {
          ...foundTask?.task,
          dueDate: new Date(foundTask?.task?.dueDate)
            .toISOString()
            .split("T")[0],
        };
        setAccessTask(formattedTask);
      } else {
        setAccessTask(null);
      }
      setIsLoading(false);
    } catch (error) {
      setAccessTask(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const handleChange = (e) => {
    setAccessTask({ ...accessTask, [e.target.name]: e.target.value });
    setTasks({ ...accessTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskModel.updateTask(tasks, id).then((result) => {
        if (result) {
          // console.log(result)
          showSuccessAlert("success", result.message);
          navigate("/index");
        }
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
      showErrorAlert("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-warning text-white text-center">
              <h3>Edit Task</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={accessTask?.title || ""}
                    onChange={handleChange}
                    placeholder="Enter task title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={accessTask?.description || ""}
                    onChange={handleChange}
                    placeholder="Enter task description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={accessTask?.dueDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={accessTask?.status || ""}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={accessTask?.priority || ""}
                    onChange={handleChange}
                    disabled
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
