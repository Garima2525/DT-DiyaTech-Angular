import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: HttpClient) {}
  base_url = 'http://localhost:3159/dt';

  submitForm(data: any) {
    let api_url = this.base_url + '/service';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: 'NVPBV2F-ZSA405E-J3EE3WE-QAJ0QNE',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}