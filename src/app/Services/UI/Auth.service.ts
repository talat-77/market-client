import { Injectable } from '@angular/core';
import { HttpClientService } from '../Common/http-client.service';
import { Register } from '../../Contract/UI/register';
import { Observable } from 'rxjs';
import { Login } from '../../Contract/UI/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClientService) { }
  registerUser(
    data:Register,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): void {
     this.httpClient.post({
      controller:"account",
      action:"register"
    },data).subscribe({
      next:()=>{
        if(successCallBack){successCallBack();}
      },
      error: (error) => {
        if (errorCallBack) errorCallBack(error?.message || "Bilinmeyen bir hata oluştu.");
      }
    })
  }
  login(data:Login): Observable<any> {
    return this.httpClient.post<any>({
    controller:"account",
    action:"login"
   },data)


  }
}
