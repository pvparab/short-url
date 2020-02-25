import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL } from './commonurl';
@Injectable()
export class GalleryService {
  constructor(private http: HttpClient, public common: CommonURL) { }
  create(postData) {
    return this.http.post(this.common.gallery, postData);
  }
  getAll() {
    return this.http.get(this.common.galleryAll);
  }
  getOne(galleryImagesId) {
    return this.http.get(`${this.common.gallery}/${galleryImagesId}`);
  }

  update(data, entity) {
    return this.http.put(`${this.common.gallery}/${entity.galleryImagesId}`, data);
  }
  distroy(entity) {
    return this.http.delete(`${this.common.gallery}/${entity.galleryImagesId}`);
  }
}
