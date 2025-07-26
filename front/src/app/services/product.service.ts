import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  createProduct(product: any) {
    const token = localStorage.getItem('token');
    return this.http.post(this.apiUrl, product, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Otros métodos...

  login(credentials: any) {
    return this.http.post('http://localhost:5000/api/login', credentials)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
      });
  }
}