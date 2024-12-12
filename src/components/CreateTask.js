import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import taskModel from "../models/task.model";
import { showToast } from "../lib/helper";
import { useNavigate } from "react-router-dom";

const TaskManager = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.title !== "" ||
        formData.description !== "" ||
        formData.dueDate !== "" ||
        formData.status !== "" ||
        formData.priority !== ""
      ) {
        await taskModel.createTask(formData).then((result) => {
          if (result) {
            // console.log(result);
            showToast("success", result?.message);
            navigate("/")
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Task Manager</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddTask} className="mb-4">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
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
                    value={formData.description}
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
                    value={formData.dueDate}
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
                    value={formData.status}
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
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Task
                  </button>
                </div>
              </form>
              <ul className="list-group">
                {/* {tasks.map((task) => (
                  <li key={task.id} className="list-group-item">
                    <h5>{task.title} <span className="badge bg-secondary">{task.priority}</span></h5>
                    <p>{task.description}</p>
                    <small>Due: {task.dueDate} | Status: {task.status}</small>
                    <div className="mt-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
