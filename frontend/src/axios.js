import axios from "axios";

const instance = axios.create({
  baseURL: "https://todos-ba.herokuapp.com/",
  //  "https://todos-ba.herokuapp.com/",
  // http://localhost:8000/
});

export default instance;
