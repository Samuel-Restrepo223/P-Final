import { Component, OnInit } from '@angular/core'; 
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html', 
  styleUrls: ['./product-list.css'],   
  standalone: true, 
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit { 
  products: any[] = [];
  message: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data; 
        this.message = ''; 
      },
      error => {
        this.message = 'Error al cargar los productos.'; 
        console.error('Error al cargar productos:', error);
      }
    );
  }

  editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(
        response => {
          this.message = response.msg || 'Producto eliminado con éxito.'; 
          this.loadProducts(); 
        },
        error => {
          this.message = 'Error al eliminar el producto.'; 
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  createNewProduct(): void {

    this.router.navigate(['/products/create']);
  }
}