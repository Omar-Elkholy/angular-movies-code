import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import jwtDecode from 'jwt-decode'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userToken = new BehaviorSubject(null);
  userData: any;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // To keep user logged in
    if (localStorage.getItem("userToken") != null) {
      this.getUserToken();
    }
  }
  

  getUserToken() {
    let encodedToken = localStorage.getItem("userToken");
    this.userToken.next(jwtDecode(JSON.stringify(encodedToken)));
  }

  getUserData() {
    let encodedToken = localStorage.getItem("userToken");
    this.userData = jwtDecode(JSON.stringify(encodedToken));
  }

  register(formData:object):Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`, formData)
  }

  login(formData:object):Observable<any> {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`, formData)
  }

  logout() {
    this._Router.navigate(['/login']);
    localStorage.removeItem("userToken");
    this.userToken.next(null);
  }
}
