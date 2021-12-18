import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: HttpClient) {}
  base_url = 'https://epr.troology.com/dt/service';

  submitForm(data: any) {
    let api_url = this.base_url + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getallservice() {
    let api_url = this.base_url + '/getallservice';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
 
  getservicebyid(id:any){
    let api_url=this.base_url+"/getservicebyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  updateForm(data: any, id: any) {
    let api_url = this.base_url + '/updateservicebyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}