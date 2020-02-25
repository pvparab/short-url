import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  create(postData) {
    return this.http.post(this.common.invoice, postData);
  }
  getAll() {
    return this.http.get(this.common.invoiceAll);
  }
  getOne(id) {
    return this.http.get(`${this.common.invoice}/${id}`);
  }
  getAllChallanInvoice(id) {
    return this.http.get(`${this.common.invoiceAll}/challan/${id}`);
  }
  update(data, entity) {
    return this.http.put(`${this.common.invoice}/${entity.id}`, data);
  }
  distroy(entity) {
    return this.http.delete(`${this.common.invoice}/${entity.id}`);
  }
}
