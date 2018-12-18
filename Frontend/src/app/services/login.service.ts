import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';

const httpOptions =
{
  headers:
    new HttpHeaders(
      {
        "Content-Type": "application/json"
      }),
  withCredentials: true,
}

@Injectable()
export class LoginService {

  base_url = 'http://localhost:3000/';
  constructor(private _http: HttpClient) { }

  login(user): Observable<User> {
    return this._http.post<User>(this.base_url + 'login', user, httpOptions)
  }

  logout() {
    return this._http.get(this.base_url + 'logout', httpOptions)
  }

  setSessionStorageVar(key, value) {
    sessionStorage.setItem(key, value);
  }

  getSessionStorageVar(key) {
    return sessionStorage.getItem(key)
  }

  clearSession() {
    // sessionStorage.removeItem('username');
    sessionStorage.clear();
  }

  clearSessionVar(key) {
    sessionStorage.removeItem(key);
  }

}
