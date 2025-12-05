import axios from 'axios'

const BACKEND_URL = axios.create({
    baseURL: "http://localhost:3000/api/notes/"
})

export default BACKEND_URL