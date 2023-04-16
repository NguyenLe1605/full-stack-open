import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObj => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObj, config)
  return request.then(res => res.data)
}

const update = (id, newObj) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url, newObj)
  return request.then(res => res.data)
}

const remove = (id) => {
  const url = `${baseUrl}/${id}`
  return axios.delete(url)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove }