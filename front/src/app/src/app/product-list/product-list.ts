import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  message: string = ''; 

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => { 
        this.products = data;
        this.message = '';
      },
      error: (err: any) => { 
        this.message = err.error?.msg || 'Error al cargar los productos.';
        console.error('Error al cargar productos:', err);
      }
    });
  }

  editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response: any) => {
          this.message = 'Producto eliminado con éxito.';
          this.loadProducts(); 
        },
        error: (err: any) => {
          this.message = err.error?.msg || 'Error al eliminar el producto.';
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }

  createNewProduct(): void {
    this.router.navigate(['/products/create']);
  }
}