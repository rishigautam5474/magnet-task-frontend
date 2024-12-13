import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import taskModel from "../models/task.model";
import {
  showConfirmDialog,
  showSuccessAlert,
} from "../lib/helper";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [isData, setIsData] = useState(false);

  const getTaskList = async () => {
    try {
      await taskModel
        .getTaskByUser()
        .then((result) => {
          if (result) {
            setTasks(result?.tasks);
            setIsData(result?.tasks);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await showConfirmDialog(
        "info",
        "Are you sure you want to delete this task?"
      ).then((result) => {
        if (result) {
          taskModel.deleteTask(id).then((result) => {
            showSuccessAlert(result?.message);
            getTaskList();
          });
        }
      });
    } catch (error) {
      console.error("An error occurred while deleting the task:", error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center d-flex justify-content-between">
              <h3>Task List</h3>
              <Link to="/create-task">
                <button className="btn btn-success">Create Task</button>
              </Link>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {isData.length === 0 ? (
                  <p className="text-center">No data found</p>
                ) : (
                  tasks?.map((task) => (
                    <div key={task._id}>
                      <li
                        className="list-group-item d-flex flex-column"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>
                            {task.title}{" "}
                            <span className="badge bg-secondary">
                              {task.priority}
                            </span>
                          </h5>
                          <div>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                navigate(`/update-task/${task._id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(task._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p>{task.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              Status: {task?.status}
                            </small>
                            <small className="bg-secondary px-2 py-1 border rounded text-light fw-bold">
                              {new Date(task?.dueDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </small>
                          </div>
                        </div>
                      </li>
                      <hr />
                    </div>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
