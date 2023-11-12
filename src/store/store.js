import axios from "axios";
import { makeAutoObservable } from "mobx";
import { api } from "./api";

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  category = "";
  filter = '';
  type = '';

  setType(type){
    this.type = type
  }
  setFilter(filter){
    this.filter = filter
  }
  setCategory(category) {
    this.category = category;
  }
  checkAuth() {
    return localStorage.getItem("token");
  }
  async login(email, password) {
    try {
      const response = await axios.post(`${api}/login/`, { email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: response.data.user.email,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          phone: response.data.user.phone,
          status: response.data.user.status,
          group: response.data.user.group,
        })
      );
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
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          first_name,
          last_name,
          phone,
          status: response.data.user.status,
          group: response.data.user.group,
        })
      );
    } catch (e) {
      console.error(e.message);
    }
  }
}
