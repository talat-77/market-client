import { Injectable, OnInit } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService  {

  constructor() { }

  message(message:string,messagetype:MessageType, position: Position , delay:number=2){
    alertify.set('notifier','delay', delay);
    alertify.set('notifier','position', position);
    alertify[messagetype](message)  
  }
  
}
export enum MessageType{
  Success = "success" ,
  Notify = "notify" , 
  Warning = "warning", 
  Message = "message" , 
  Error = "error"
}
export enum Position {
  Bottom_right = "bottom-right",
  Top_right = "top-riight" , 
  Top_center = "top-center" , 
  Top_left = "top-left" , 
  Bottom_center  = "bottom-center" , 
  Bottom_left = "bottom-left"
}
