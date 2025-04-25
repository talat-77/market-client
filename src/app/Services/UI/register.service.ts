import { Injectable } from '@angular/core';
import { HttpClientService } from '../Common/http-client.service';
import { Register } from '../../Contract/UI/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClientService) { }
  registerUser(
    data:Register,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): void {
     this.httpClient.post({
      controller:"customer",
      action:"createUser"
    },data).subscribe({
      next:()=>{
        if(successCallBack){successCallBack();}
      },
      error: (error) => {
        if (errorCallBack) errorCallBack(error?.message || "Bilinmeyen bir hata oluştu.");
      }
    })
  }
}
