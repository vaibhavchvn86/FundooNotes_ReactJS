import axios from 'axios'

let config = {
    headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}

export const addNote = async (obj) => {
    let response = await axios.post("https://localhost:44370/api/Note/addnote", obj, config)
    return response
}

export const getNote = async () => {
    let response = await axios.get(`https://localhost:44370/api/Note/getnotes?userId=${localStorage.getItem("UserID")}`, config)
    return response
}

export const editColor = async (obj) => {
    let response = await axios.put(`https://localhost:44370/api/Note/editcolor`, obj, config)
    return response
}

export const editArchive = async (obj) => {
    let response = await axios.put(`https://localhost:44370/api/Note/archiveunarchive?noteID=${obj}`,
        {}, config)
    return response
}

export const editTrash = async (obj) => {
    let response = await axios.put(`https://localhost:44370/api/Note/trash?noteID=${obj}`,
        {}, config)
    return response
}

export const updateNote = async (obj) => {
    let response = axios.put(`https://localhost:44370/api/Note/editnote`, obj, config)
    return response
}

export const getArchive = async () => {
    let response = await axios.get(`https://localhost:44370/api/Note/getarchive?userId=${localStorage.getItem("UserID")}`, config)
    return response
}

export const getTrash = async () => {
    let response = await axios.get(`https://localhost:44370/api/Note/gettrash?userId=${localStorage.getItem("UserID")}`, config)
    return response
}

