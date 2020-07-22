import http from "./httpService";
import { APIEndpoint } from "./config.json";

const url = APIEndpoint + "/word";

export async function saveWord(word) {
  const res = await http.post(url, word);
  return res.data;
}

export async function getWords() {
  const res = await http.get(url);
  return res;
}

export async function getPracticeWords(userId) {
  const urlGet = `${url}/practice/${userId}`;
  const { data } = await http.get(urlGet);
  return data;
}

export async function deleteWord(id) {
  const urlDelete = `${url}/${id}`;
  const res = await http.delete(urlDelete);
  return res;
}
