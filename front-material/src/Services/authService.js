import http from "./httpService";
import { APIEndpoint } from "./config.json";

const API_URL = APIEndpoint + "/user";

export async function login(email, password) {
  const url = API_URL + "/login";
  const { data } = await http.post(url, { email, password });
  return data;
}

export async function register(user) {
  const url = API_URL + "/register";
  const { data } = await http.post(url, user);
  return data;
}
