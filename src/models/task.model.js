import axiosInstance from "../lib/axiosInstance";

class TaskModel {
  async getTaskByUser() {
    return await axiosInstance.get("/api/users/task-lists");
  }

  async createTask(data = []) {
    return await axiosInstance.post("/api/tasks/create", data);
  }

  async updateTask(data = [], id) {
    console.log(data,"data+++++++++")
    return await axiosInstance.put("/api/tasks/" + id, data);
  }

  async deleteTask(id) {
    return await axiosInstance.delete("/api/tasks/" + id);
  }
}

export default new TaskModel();
