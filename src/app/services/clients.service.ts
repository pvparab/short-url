import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class ClientsService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  create(postData) {
    return this.http.post(this.common.clients, postData);
  }
  getAll() {
    return this.http.get(this.common.clientsAll);
  }
  getOne(id) {
    return this.http.get(`${this.common.clients}/${id}`);
  }
  update(data, entity) {
    return this.http.put(`${this.common.clients}/${entity.clientsId}`, data);
  }
  distroy(entity) {
    return this.http.delete(`${this.common.clients}/${entity.clientsId}`);
  }
}
