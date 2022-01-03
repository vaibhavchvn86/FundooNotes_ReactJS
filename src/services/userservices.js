import axios from 'axios'

export const login = async (obj) => {
    console.log("userservices " + obj)
    let response = await axios.post("https://localhost:44370/api/User/login", obj)
    return response
}

export const register = async (obj) => {
    let response = await axios.post("https://localhost:44370/api/User/register", obj)
    return response
}