import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false; // Cambia esto al conectar con Cognito
  userName = '';

  ngOnInit() {
    // Aquí deberías verificar el estado con Cognito (o localStorage por ahora)
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticated = true;
      this.userName = JSON.parse(user).name;
    }
  }

  login() {
    // Lógica de login, puede ser redirección a Cognito
    window.location.href = '/login'; // O usa router.navigate
  }
}
