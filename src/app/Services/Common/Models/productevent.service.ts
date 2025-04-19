import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEventService {
  private productCreatedSource = new Subject<void>();
  productCreated$ = this.productCreatedSource.asObservable();

  notifyProductCreated() {
    this.productCreatedSource.next();
  }
}
