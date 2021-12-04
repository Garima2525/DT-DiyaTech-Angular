import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
  
  base_url="https://epr.troology.com/dt/user"
  api_key='8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8'


  loginUser(data:any){
    let api_url=this.base_url+"/login"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  CheckEmail(email:any){
    let api_url=this.base_url+'/checkemail'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,email,httpOptions)
  }

  SendEmail(email:any){
    let api_url=this.base_url+'/sendmail'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,email,httpOptions)
  }

  VerifyEmail(data:any){
    let api_url=this.base_url+'/verify-otp'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key,
        'Referrer-Policy': 'no-referrer'
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  userLoggedIn(){
    let email=localStorage.getItem('user')?localStorage.getItem('user'):this.router.navigate(['/login'])
    console.log(email)
    let api_url=this.base_url+'/get-user'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,{email},httpOptions)
  }

  getAllUsers(){
    // https://epr.troology.com/dt/login/get-allusers
    console.log(this.api_key)
    let api_url=this.base_url+'/get-allusers'

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':"*",
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
}
