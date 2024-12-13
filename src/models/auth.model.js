import axiosInstance from "../lib/axiosInstance";
// const baseUrl = process.env.REACT_APP_API_URL;
// console.log(baseUrl);

class AuthModel {
  async register(data = []) {
    return await axiosInstance.post("/api/users/register", data);
  }

  async loginUser(data = []) {
    return await axiosInstance.post("/api/users/login", data);
  }

}

export default new AuthModel();
