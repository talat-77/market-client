import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../Services/admin/alertify.service';
import { ProductService } from '../../../../Services/Common/Models/product.service';
import { CreateProduct } from '../../../../Contract/Product/create_product';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
constructor(alertify:AlertifyService,private productService:ProductService){
 
}
  ngOnInit(): void {
    
  }
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){

const createProduct:CreateProduct = new CreateProduct()
createProduct.name=name.value;
createProduct.price= parseFloat(price.value);;
createProduct.stock=parseInt(stock.value);
this.productService.Create(createProduct)
  }
}
