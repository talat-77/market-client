import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../Contract/Product/create_product';
import { ListProduct } from '../../../Contract/Product/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'console';
import { UpdateProduct } from '../../../Contract/Product/update_product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpclient:HttpClientService ) { }

  Create(
    product: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): void {
    this.httpclient.post({
      controller: "products"
    }, product)
    .subscribe({
      next: () => {
        if (successCallBack) {
          successCallBack() ; 
        
        }
         
      },
      error: (error) => {
        if (errorCallBack) errorCallBack(error?.message || "Bilinmeyen bir hata oluştu.");
      }
    });
  }
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: ListProduct[] }> {
    try {
      // Observable'ı Promise'a dönüştürmek için firstValueFrom kullanılır
      const response = await firstValueFrom(this.httpclient.get<{ totalProductCount: number; products: ListProduct[] }>({
        controller: "products",
        querystring: `page=${page}&size=${size}`
      }));
  
      // Başarılı olursa successCallBack fonksiyonunu çağır
      if (successCallBack) {
        successCallBack();
      }
  
      return response;  // Response'ı döndür
    } catch (errorResponse) {
      // Hata durumunda errorCallBack fonksiyonu çağrılır
      if (errorCallBack && errorResponse instanceof HttpErrorResponse) {
        errorCallBack(errorResponse.message);
      }
  
      // Hata mesajını dışarıya fırlat
      throw errorResponse;
    }
  }
  Delete(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): void {
    this.httpclient.delete({
      controller: "products",
      querystring: `id=${id}`
    },id)
    .subscribe({
      next: () => {
        if (successCallBack) {
          successCallBack();
        }
      },
      error: (error) => {
        if (errorCallBack) {
          errorCallBack(error?.message || "Bilinmeyen bir hata oluştu.");
        }
      }
    });
  }
  Update(
    id: string,
    updatedProduct: UpdateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): void {
    console.log("API'ye gönderilen ürün id'si:", id);
    console.log("API'ye gönderilen güncellenmiş ürün:", updatedProduct);
  
    this.httpclient.put({
      controller: "products",
     
    }, updatedProduct,id)
      .subscribe({
        next: () => {
          if (successCallBack) successCallBack();
        },
        error: (error) => {
          if (errorCallBack) errorCallBack(error?.message || "Bilinmeyen hata");
        }
      });
  }
  
  }
  
  
  


