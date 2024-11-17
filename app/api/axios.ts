import axios from "axios";

export const myAxios = axios.create({
  timeout: 10000,
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token") as string;
  myAxios.defaults.headers.Authorization = `Bearer ${token}`;
}
