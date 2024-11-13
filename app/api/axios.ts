import axios from "axios";

let token = localStorage.getItem("token") as string

export const myAxios = axios.create({
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}`}
})

export default { myAxios }