import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';

  constructor(public jwtHelper: JwtHelperService) { }

  saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  getAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      return token;
    } else return null;
  }

  saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  
  getUser(): User | null {
    const userString = localStorage.getItem(this.USER_KEY);
    try {
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if( token == 'undefined')
      return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
