import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class DecorationItemService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  createEntity(postData) {
    return this.http.post(this.common.decorationItems, postData);
  }
  getAllEntity() {
    return this.http.get(this.common.decorationItemsAll);
  }
  getEntity(id) {
    return this.http.get(`${this.common.decorationItems}/${id}`);
  }
  updateEntity(data, entity) {
    return this.http.put(`${this.common.decorationItems}/${entity.decorationItemsId}`, data);
  }
  deleteEntity(data, entity) {
    return this.http.delete(`${this.common.decorationItems}/${entity.decorationItemsId}`);
  }
}
