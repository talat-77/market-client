import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service'; // kendi yoluna göre düzenle
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) {}

  uploadFile(file: File): Observable<{ fileName: string; fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClientService.post<any>({
      controller: "file",
      action: "upload",
      headers: new HttpHeaders() ,
      responseType: "json"
    }, formData);
  }
}
