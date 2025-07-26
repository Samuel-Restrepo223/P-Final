import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product-service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
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
      this.productService.getProductById(this.productId).subscribe(
        (product: any) => {
          this.productForm.patchValue(product);
        },
        (error: any) => {
          this.message = 'Error al cargar los datos del producto.';
          console.error('Error al cargar producto para editar:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe(
          (response: any) => {
            this.message = 'Producto actualizado con éxito.';
            this.router.navigate(['/products']);
          },
          (error: any) => {
            this.message = 'Error al actualizar el producto.';
            console.error('Error al actualizar producto:', error);
          }
        );
      } else {
        this.productService.createProduct(productData).subscribe(
          (response: any) => {
            this.message = 'Producto creado con éxito.';
            this.router.navigate(['/products']);
          },
          (error: any) => {
            this.message = 'Error al crear el producto.';
            console.error('Error al crear producto:', error);
          }
        );
      }
    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
