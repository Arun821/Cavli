import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "https://serene-hollows-11661.herokuapp.com/api/v1/signup";
  private loginUrl = " https://serene-hollows-11661.herokuapp.com/api/v1/signin";
  private uploadUrl = "https://serene-hollows-11661.herokuapp.com/api/v1/upload";
  private imageUrl = " https://serene-hollows-11661.herokuapp.com/uploads/_file_name_";

  constructor(private http:HttpClient, private router:Router) { }

  register(user) {
    return this.http.post<any>(this.registerUrl, user)
  }

  login(user) {
    return this.http.post<any>(this.loginUrl, user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  upload(image) {
    return this.http.post<any>(this.uploadUrl, image);
  }

  getImage(image) {
    return this.http.get<any>(this.imageUrl, image)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
