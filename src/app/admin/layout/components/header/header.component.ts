import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  expirationTime: number = 0;
  remainingTime: string = ''; // Kalan süreyi gösterecek değişken

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Kullanıcı giriş durumunu kontrol eden fonksiyon
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    
    if (token && expiration) {
      this.isLoggedIn = true;
      this.expirationTime = new Date(expiration).getTime();
      this.updateRemainingTime();
      this.startCountdown();
    } else {
      this.isLoggedIn = false;
    }
  }

  // Kalan süreyi hesaplama ve formatlama
  updateRemainingTime(): void {
    const currentTime = Date.now();
    const timeLeft = this.expirationTime - currentTime;
    
    if (timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      this.remainingTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
      this.remainingTime = 'Expired';
    }
  }

  // Kalan süreyi her saniye güncelleme
  startCountdown(): void {
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000); // Her saniye kalan süreyi günceller
  }

  // Kullanıcı çıkışı yaparsa token ve expiration bilgilerini sil
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
  }
}
