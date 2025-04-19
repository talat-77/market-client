import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListProduct } from '../../../../Contract/Product/list_product';
import { ProductService } from '../../../../Services/Common/Models/product.service';
import { error } from 'console';
import { ProductEventService } from '../../../../Services/Common/Models/productevent.service';
import { UpdateProduct } from '../../../../Contract/Product/update_product';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'stock', 'price', 'updatedDate', 'createdDate','actions'];
  dataSource: MatTableDataSource<ListProduct> = new MatTableDataSource<ListProduct>();
  totalProductCount: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService,
    private productEventService: ProductEventService
  ) {}

  ngAfterViewInit() {
    this.loadProducts(); // ilk sayfa yüklenir
    this.dataSource.paginator = this.paginator;
    this.productEventService.productCreated$.subscribe(() => {
      this.loadProducts(); // ürün eklendiğinde tekrar yükle
    })
  }
  loadProducts(page: number = 0, size: number = 5): void {
    this.productService.read(page, size, 
      () => {
        // Başarı durumunda yapılacak işlemler
        console.log('Ürünler başarıyla yüklendi');
      }, 
      (errorMessage: string) => {
        // Hata durumunda yapılacak işlemler
        console.error('Ürünler yüklenirken hata oluştu:', errorMessage);
      }
    ).then(response => {
      // Gelen ürün verisini dataSource'a ata
      this.dataSource.data = response.products;
      this.totalProductCount = response.totalProductCount;  // Toplam ürün sayısını güncelle
      this.dataSource.paginator = this.paginator;  // Paginator'ı güncelle
    }).catch(error => {
      console.error('Hata oluştu:', error);
    });
  }
  
  pageChanged(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.loadProducts(pageIndex, pageSize);  // Yeni sayfa numarası ve boyutuna göre ürünleri yükler
  }
  
onDelete(id: string): void {
  this.productService.Delete(
    id,
    () => {
      console.log("Silme başarılı");
      // Silme işleminden sonra, aynı sayfayı tekrar yükleyin:
      this.loadProducts(this.paginator.pageIndex, this.paginator.pageSize);
    },
    (err) => {
      console.error("Hata:", err);
    }
  );
}


onUpdate(product: UpdateProduct): void {
  const updatedProduct: any = {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock
  };

  // imageUrl varsa ekle
  if (product.imageUrl !== undefined && product.imageUrl !== null) {
    updatedProduct.imageUrl = product.imageUrl;
  }

  this.productService.Update(
    updatedProduct.id,
    updatedProduct,
    () => {
      console.log("Güncelleme başarılı");
      this.loadProducts(this.paginator.pageIndex, this.paginator.pageSize);
    },
    (err) => {
      console.error("Hata:", err);
    }
  );
}










}
