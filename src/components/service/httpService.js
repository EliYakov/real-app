import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  put: axios.put,
};

export default httpService;
