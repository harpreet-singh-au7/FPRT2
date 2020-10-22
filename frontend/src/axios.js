import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  //  "https://a-clone.herokuapp.com/",
  // 
});

export default instance;
