import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ImageInterface } from 'src/app/main/interfaces/image.interface';
import { global } from '../../main/global/global';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getImages(page: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${global.url}/images/${page}`, {
      headers: headers,
    });
  }

  deleteImage(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${global.url}/image/${id}`, {
      headers: headers,
    });
  }
}
