import { Injectable, signal } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { awsConfig } from '../../aws-exports';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userPool = new CognitoUserPool({
    UserPoolId: awsConfig.userPoolId,
    ClientId: awsConfig.userPoolWebClientId,
  });

  isAuthenticated = signal(false);

  login(email: string, password: string): Promise<void> {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          localStorage.setItem('id_token', idToken);
          this.isAuthenticated.set(true);
          resolve();
        },
        onFailure: (err) => reject(err),
      });
    });
  }

  logout(): void {
    const user = this.userPool.getCurrentUser();
    if (user) user.signOut();
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }

  signup(name: string, email: string, password: string): Promise<void> {
    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: name }),
    ];
  
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, attributes, [], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  checkSession(): void {
    const user = this.userPool.getCurrentUser();
    if (user) {
      user.getSession((err: any, session: any) => {
        if (err || !session.isValid()) {
          this.isAuthenticated.set(false);
        } else {
          this.isAuthenticated.set(true);
        }
      });
    } else {
      this.isAuthenticated.set(false);
    }
  }

  confirmSignup(email: string, code: string): Promise<void> {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });
  
    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
