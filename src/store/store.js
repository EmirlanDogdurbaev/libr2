import axios from "axios";
import { makeAutoObservable } from "mobx";
import { api } from "./api";

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  category = "";
  filter = "";
  search = "";
  type = "";

  setType(type) {
    this.type = type;
  }
  setSearch(search) {
    this.search = search;
  }
  setFilter(filter) {
    this.filter = filter;
  }
  setCategory(category) {
    this.category = category;
  }
  checkAuth() {
    return localStorage.getItem("token");
  }
  async login(email, password) {
    try {
      const response = await axios.post(`${api}/login`, { email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: response.data.user.email,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          phone: response.data.user.phone,
          role: response.data.user.role,
          group: response.data.user.group,
        })
      );
    } catch (e) {
      console.error(e);
    }
  }
  async register(email, password, firstname, lastname, phone, group) {
    try {
      const response = await axios.post(`${api}/register`, {
        email,
        password,
        firstname,
        lastname,
        phone,
        group,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          firstname,
          lastname,
          phone,
          role: response.data.user.role,
          group: response.data.user.group,
        })
      );
    } catch (e) {
      console.error(e.message);
    }
  }
}
