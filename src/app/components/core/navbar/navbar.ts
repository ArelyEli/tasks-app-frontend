import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);

  isAuthenticated = this.auth.isAuthenticated;
  userName = this.auth.userName;

  ngOnInit() {
    this.auth.checkSession();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
