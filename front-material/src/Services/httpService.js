import axios from "axios";

/*
function setJwt(jwt) {
  // Common is for all methods (get, post, put, delete)
  axios.defaults.headers.common["token"] = jwt;
  // The following case is for sending the header only in post methods
  // axios.defaults.headers.post["x-auth-token"] = auth.getJwt();
}
*/

// function getToken() {
//     const token = localStorage.getItem("token");
//     return token;
//   }

//   axios.defaults.headers.common["token"] = getToken();

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
