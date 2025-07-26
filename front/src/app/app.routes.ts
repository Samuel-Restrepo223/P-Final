import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { ProductListComponent } from './src/app/product-list/product-list';
import { ProductFormComponent } from './product-form/product-form';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
];