import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class UserService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  register(postData) {
    return this.http.post(this.common.register, postData);
  }
  login(postData) {
    return this.http.post(this.common.login, postData);
  }
  getAllUser() {
    return this.http.get(this.common.getAllUser);
  }
  logout() {
    localStorage.removeItem('token');
    return this.http.get(this.common.logout);
  }
  getUser(userId) {
    return this.http.get(`${this.common.users}/${userId}`);
  }
  updateUser(data, user) {
    return this.http.put(`${this.common.users}/${user.userId}`, data);
  }
}
