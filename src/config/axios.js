import axios from "axios"


const url = "http://localhost:8000/api/"
const clienteAxios = axios.create({
    baseURL: url,
    headers: {
        'Accept' : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    },

    withCredentials: true
})


clienteAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`

    return config
})

clienteAxios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if(response.status === 401)
    {
        localStorage.removeItem('ACCESS_TOKEN')
    }
    throw error;
})

export default clienteAxios