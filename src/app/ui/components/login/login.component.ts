import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/UI/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  loginform:FormGroup
  loginError: string | null = null;
  constructor(private fb : FormBuilder , private authService:AuthService , private router:Router){}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    if (this.loginform.invalid) {
      return ;
    }
    const loginData = this.loginform.value;
    this.authService.login(loginData).subscribe({
      next: (res) => {
        // Örnek: JWT token geldiyse localStorage'a kaydet
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('expiration', res.expiration);
        }

       
        this.router.navigate(['admin']); // yönlendirmek istediğin sayfa
      },
      error: (err) => {
        this.loginError = err?.error || "Giriş sırasında bir hata oluştu.";
        console.error("Giriş hatası:", err);
      }
    });
}}
