import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
   templateUrl:'./login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    public router: Router // <-- cambia 'private' por 'public'
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => { 
          this.message = 'Inicio de sesión exitoso.';
          console.log('Inicio de sesión exitoso', res);
          this.authService.saveToken(res.token); 
          this.router.navigate(['/products']);
        },
        error: (err: any) => { 
          this.message = err.error?.msg || 'Error en el inicio de sesión. Credenciales inválidas.';
          console.error('Error en el inicio de sesión:', err);
        }
      });
    } else {
      this.message = 'Por favor, introduce un email y una contraseña válidos.';
    }
  }
}