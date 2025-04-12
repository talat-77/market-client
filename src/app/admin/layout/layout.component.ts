import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../Services/admin/alertify.service';
import { delay } from 'rxjs';





@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  
  
  constructor(private alertify:AlertifyService) {}
  
  ngOnInit(): void {

    // this.alertify.message("deneme", MessageType.Error,Position.Bottom_left , 3)
  }
 
}
