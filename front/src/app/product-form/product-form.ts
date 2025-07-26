import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service'; 

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup; 
  productId: string | null = null;
  message: string = ''; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product: any) => { 
          this.productForm.patchValue(product);
        },
        error: (err: any) => { 
          this.message = err.error?.msg || 'Error al cargar los datos del producto para editar.';
          console.error('Error al cargar producto para editar:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.productId) {
    
        this.productService.updateProduct(this.productId, productData).subscribe({
          next: (response: any) => {
            this.message = 'Producto actualizado con éxito.';
            this.router.navigate(['/products']); 
          },
          error: (err: any) => {
            this.message = err.error?.msg || 'Error al actualizar el producto.';
            console.error('Error al actualizar producto:', err);
          }
        });
      } else {

        this.productService.createProduct(productData).subscribe({
          next: (response: any) => {
            this.message = 'Producto creado con éxito.';
            this.router.navigate(['/products']); 
          },
          error: (err: any) => {
            this.message = err.error?.msg || 'Error al crear el producto.';
            console.error('Error al crear producto:', err);
          }
        });
      }
    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }
}