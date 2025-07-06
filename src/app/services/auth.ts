import { Injectable, signal } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

@Injectable({ providedIn: 'root' })
export class Auth {
  private userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_mQRMo6ZSx',
    ClientId: '62b7ui0nmus6p4802ntmijatn3'
  });

  isAuthenticated = signal(false);

  login(email: string, password: string): Promise<string> {
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    const user = new CognitoUser({ Username: email, Pool: this.userPool });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const token = result.getAccessToken().getJwtToken();
          localStorage.setItem('access_token', token);
          this.isAuthenticated.set(true);
          resolve(token);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  checkSession(): void {
    const token = this.getToken();
    this.isAuthenticated.set(!!token);
  }
}
