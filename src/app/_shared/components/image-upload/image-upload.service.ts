
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CommonURL } from '../../../services';
@Injectable()
export class ImageUploadService {

  constructor(private http: HttpClient) { }


  public uploadImage(image: File): Observable<string | any> {
    const cmURL = new CommonURL();
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(cmURL.apiURL + 'v1/upload', formData).pipe(map(((json: any) => json.imageUrl)));
  }
}
