import axios from 'axios'

const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (personObj) => {
    const request = axios.post(baseUrl, personObj);
    return request.then(response => response.data);
}

const update = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj);
    return request.then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, remove };