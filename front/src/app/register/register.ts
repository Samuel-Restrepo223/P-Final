import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './register.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; 
  message: string = '';

  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required] 
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.message = 'Registro exitoso. Ahora puedes iniciar sesión!';
          console.log('Registro exitoso', res);
          this.router.navigate(['/login']); 
        },
        error: (err: any) => {
          this.message = err.error?.msg || 'Error en el registro.';
          console.error('Error en el registro:', err);
        }
      });
    } else {
      this.message = 'Por favor, completa todos los campos correctamente.';
    }
  }
}