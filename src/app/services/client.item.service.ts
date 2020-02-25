import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class ClientItemPriceService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  createEntity(postData) {
    return this.http.post(this.common.clientitemprice, postData);
  }
  getAllEntity() {
    return this.http.get(this.common.clientitempriceAll);
  }
  getAllEntityByClient(id) {
    return this.http.get(`${this.common.clientitempricebyid}/${id}`);
  }
  getEntity(id) {
    return this.http.get(`${this.common.clientitemprice}/${id}`);
  }
  updateEntity(data, entity) {
    return this.http.put(`${this.common.clientitemprice}/${entity.id}`, data);
  }
  deleteEntity(data, entity) {
    return this.http.delete(`${this.common.clientitemprice}/${entity.id}`);
  }
}
