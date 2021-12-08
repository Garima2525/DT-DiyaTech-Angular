import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  base_url: any = 'http://localhost:3159/dt/performance';
  constructor(private http: HttpClient) {}

  submitForm(data: any) {
    let api_url = this.base_url;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: 'NVPBV2F-ZSA405E-J3EE3WE-QAJ0QNE',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getall() {
    let api_url = this.base_url + '/getall';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: 'NVPBV2F-ZSA405E-J3EE3WE-QAJ0QNE',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

}

