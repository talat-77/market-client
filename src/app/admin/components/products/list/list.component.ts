import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListProduct } from '../../../../Contract/Product/list_product';
import { ProductService } from '../../../../Services/Common/Models/product.service';
import { ProductEventService } from '../../../../Services/Common/Models/productevent.service';
import { UpdateProduct } from '../../../../Contract/Product/update_product';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../../../../shared/update-dialog/update-dialog.component';
import { FieldConfig } from '../../../../Contract/field-config/field-config';

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
    private productEventService: ProductEventService,
    private dialog: MatDialog
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
  const fields: FieldConfig[] = [
    { key: 'name', label: 'Ürün Adı', type: 'text', required: true },
    { key: 'price', label: 'Fiyat', type: 'number', required: true },
    { key: 'stock', label: 'Stok', type: 'number', required: true }
  ];

  const dialogRef = this.dialog.open(UpdateDialogComponent, {
    width: '400px',
    data: { fields, data: product }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const updatedProduct = { ...product, ...result };

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
  });
}











}
