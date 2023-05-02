import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = () => axios.get(baseUrl).then(response => response.data);

export const createNew = (newObj) => axios.post(baseUrl, newObj).then(res => res.data);

export const update = (newObj) => axios.put(`${baseUrl}/${newObj.id}`, newObj).then(res => res.data);