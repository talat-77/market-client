  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Inject, inject, Injectable } from '@angular/core';
import { request } from 'http';
import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class HttpClientService {
  
    constructor(private readonly httpclient : HttpClient , @Inject("baseUrl") private baseUrl:string) { }
    private url(requestParameters: RequestParameters): string {
      const controller = requestParameters.controller?.trim().replace(/\s+/g, '');
      const action = requestParameters.action?.trim().replace(/\s+/g, '');
      return `${requestParameters.baseurl ? requestParameters.baseurl : this.baseUrl}/${controller}${action ? `/${action}` : ''}`;
    }

    get<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
      let url: string = "";
    
      if (requestParameters.fullendpoint) {
        url = requestParameters.fullendpoint;
      } else {
        url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.querystring ? `?${requestParameters.querystring}` : ""}`;
      }
    
      return this.httpclient.get<T>(url, {
        headers: requestParameters.headers,
        responseType: requestParameters.responseType as 'json'
      });
    }
  post<T>(requestParameters : Partial<RequestParameters> , body:Partial<T> ) : Observable<T> {
let url : string = "";
if(requestParameters.fullendpoint)
url=requestParameters.fullendpoint
else
url = `${this.url(requestParameters)}${requestParameters.querystring ? `/${requestParameters.querystring}`:""}`
return this.httpclient.post<T>(url,body, {headers:requestParameters.headers,responseType:requestParameters.responseType as 'json'});
  }
  
//   put<T>(requestParameters : Partial<RequestParameters>,body:any):Observable<T> {
// let url : string = "";
// if(requestParameters.fullendpoint)
// url=requestParameters.fullendpoint
// else
// url=`${this.url(requestParameters)}${requestParameters.querystring ? `/${requestParameters.querystring}`:""}`
// return this.httpclient.put<T>(url,body,{headers:requestParameters.headers,responseType:requestParameters.responseType as 'json'})
//   }
put<T>(requestParameters: Partial<RequestParameters>, body: any, id?: string): Observable<T> {
  let url: string = "";
  if (requestParameters.fullendpoint) {
    url = requestParameters.fullendpoint;
  } else {
    url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`; // ✅ ID'yi path'e ekliyoruz
  }
  console.log("API'ye gönderilen URL:", url);
  return this.httpclient.put<T>(url, body, {
    headers: requestParameters.headers,
    responseType: requestParameters.responseType as 'json'
  });
}






  
  delete<T>(
    requestParameters: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameters.fullendpoint) url = requestParameters.fullendpoint;
    else
      url = `${this.url(requestParameters)}/${id}${
        requestParameters.querystring ? `?${requestParameters.querystring}` : ''
      }`;
    return this.httpclient.delete<T>(url, {
      headers: requestParameters.headers,
    });
  }
  
  }
  
  export class RequestParameters{
  
    baseurl?:string ;
    controller ? : string ;
    action? : string ;
    fullendpoint?:string ; 
    headers? : HttpHeaders;
    querystring?:string; 
    responseType?:string='json';
  }