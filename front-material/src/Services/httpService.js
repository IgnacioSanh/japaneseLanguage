import axios from "axios";

function getToken() {
  let token = localStorage.getItem("tokens");
  token = JSON.parse(token);
  return token;
}

axios.defaults.headers.common["token"] = getToken();

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
