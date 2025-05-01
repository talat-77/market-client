import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/UI/Auth.service';
import { Register } from '../../../Contract/UI/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,
            private authservice:AuthService) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      surname:['',[Validators.required,Validators.minLength(3)]]
    }, { 
      // Şifre ve onay şifresinin eşleşip eşleşmediğini kontrol ediyoruz
      validator: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData: Register = this.registerForm.value;
      
      this.authservice.registerUser(registerData, 
        () => {
          console.log('Kullanıcı başarıyla kaydedildi.');
          // Başarılı olduğunda yapılacak işlemler
        },
        (errorMessage) => {
          console.error('Hata: ', errorMessage);
          // Hata durumunda yapılacak işlemler
        }
      );
    } else {
      console.log('Form geçersiz.');
      this.registerForm.markAllAsTouched();  // Tüm form alanlarını kontrol eder
    }
  }
}
