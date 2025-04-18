import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../Services/admin/alertify.service';
import { ProductService } from '../../../../Services/Common/Models/product.service';
import { CreateProduct } from '../../../../Contract/Product/create_product';
import { FileService } from '../../../../Services/Common/Models/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
constructor(alertify:AlertifyService,private productService:ProductService,private fileService:FileService){}
  ngOnInit(): void { }
  imageUrl:string="";
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileService.uploadFile(file).subscribe({
        next: (res) => {
          this.imageUrl = res.fileUrl;  // Görsel URL'si başarılı şekilde alındı.
        },
        error: (err) => {
          console.error("Dosya yüklenemedi", err);
          alert("Görsel yüklenemedi. Lütfen tekrar deneyin.");
        }
      });
    }
  }
  
  
  create(name: string, stock: string, price: string) {
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name;
    createProduct.price = parseFloat(price);
    createProduct.stock = parseInt(stock);
    createProduct.imageurl = this.imageUrl;
  
    this.productService.Create(createProduct, 
      () => { 
        alert("Ürün başarıyla oluşturuldu!");
      },
      (errorMessage) => { 
        alert(`Hata: ${errorMessage}`);
      }
    );
  }
  
  

    
  
  
}
