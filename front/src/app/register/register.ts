import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;
  role: string = 'user'; 
  message: string = '';

  constructor(private authService: AuthService) { } 

  onRegister() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.message = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
        console.log('Registro exitoso', res);
      },
      error: (err) => {
        this.message = err.error?.msg || 'Error en el registro.';
        console.error('Error en el registro', err);
      }
    });
  }
}