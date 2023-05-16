import axios from "axios";
import storageService from "./storage";
const baseUrl = "/api/blogs";

const headers = {
  "Authorization": storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
};


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObj => {
  const request = axios.post(baseUrl, newObj, { headers });
  return request.then(res => res.data);
};

const update = (id, newObj) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, newObj);
  return request.then(res => res.data);
};

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url, { headers });
};

export default { getAll, create, update, remove };