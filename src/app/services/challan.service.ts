import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class ChallanService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  create(postData) {
    return this.http.post(this.common.challan, postData);
  }
  getAll() {
    return this.http.get(this.common.challanAll);
  }
  getOne(challanId) {
    return this.http.get(`${this.common.challan}/${challanId}`);
  }
  getChallanItem(challanId) {
    return this.http.get(`${this.common.challanItem}/${challanId}`);
  }
  getAllFromChallanIDS(postData){
    return this.http.post(this.common.challanIDS, postData);
  }
  update(data, entity) {
    return this.http.put(`${this.common.challan}/${entity.challanId}`, data);
  }
  distroy(entity) {
    return this.http.delete(`${this.common.challan}/${entity.challanId}`);
  }
}
