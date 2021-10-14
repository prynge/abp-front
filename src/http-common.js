import axios from "axios";

export default axios.create({
  apiBaseURL: "https://pacific-beach-26992.herokuapp.com/api",
  baseURL: "https://pacific-beach-26992.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});