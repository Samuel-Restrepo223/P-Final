import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { } 

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.message = 'Inicio de sesión exitoso.';
        console.log('Inicio de sesión exitoso', res);
        this.authService.saveToken(res.token); 
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.message = err.error?.msg || 'Error en el inicio de sesión. Credenciales inválidas.';
        console.error('Error en el inicio de sesión', err);
      }
    });
  }
}