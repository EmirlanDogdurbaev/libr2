import axios from "axios";
import { makeAutoObservable } from "mobx";
import { api } from "./api";

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }
  checkAuth() {
    return localStorage.getItem("token");
  }
  category = ''

  setCategory(category) {
    this.category = category
  }
  async login(email, password) {
    try {
      const response = await axios.post(`${api}/login/`, { email, password });
      localStorage.setItem("token", response.data.access_token);
      console.log(response.data.access_token);
    } catch (e) {
      console.error(e);
    }
  }
  async register(email, password, first_name, last_name, phone) {
    try {
      const response = await axios.post(`${api}/register/`, {
        email,
        password,
        first_name,
        last_name,
        phone,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        email,
        first_name,
        last_name,
        phone,
      }))

    } catch (e) {
      console.error(e.message);
    }
  }
}
