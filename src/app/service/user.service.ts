
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  base_url = 'https://epr.troology.com/dt';
  api_key = '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8';


  getUserRolePermissions(id:any){
    
    console.log(this.api_key);
    let api_url = this.base_url + '/role/getuserole/'+id;

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  updaterolebyid(id:any,data: any) {
    let api_url = this.base_url + '/role/updatebyid/'+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAllUsers() {
    // https://epr.troology.com/dt/login/get-allusers
    console.log(this.api_key);
    let api_url = this.base_url + '/user/getalluser';

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllrole() {
    // https://epr.troology.com/dt/login/get-allusers
    console.log(this.api_key);
    let api_url = this.base_url + '/role/getallrole';

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  createUser(data: any) {
    console.log(data);
    let api_url = this.base_url + '/user';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  createRole(data: any) {
    console.log(data);
    let api_url = this.base_url + '/role';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  changePassword(data: any,id:any) {
    console.log(data);
    let api_url = this.base_url + '/user/change-password/'+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
