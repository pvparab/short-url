import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  create(postData) {
    return this.http.post(this.common.employee, postData);
  }
  getAll() {
    return this.http.get(this.common.employeeAll);
  }
  getOne(id) {
    return this.http.get(`${this.common.employee}/${id}`);
  }
  update(data, entity) {
    return this.http.put(`${this.common.employee}/${entity.employeeId}`, data);
  }
  distroy(entity) {
    return this.http.delete(`${this.common.employee}/${entity.employeeId}`);
  }
}
