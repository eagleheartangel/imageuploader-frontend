import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ImageInterface } from 'src/app/main/interfaces/image.interface';
import { global } from '../../main/global/global';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(img: File, description: string): Observable<ImageInterface> {
    const formData = new FormData();
    formData.append('image', img);
    formData.append('description', description);
    return this.http.post<ImageInterface>(`${global.url}/upload`, formData);
  }
}
