import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http:HttpClient) { }
   accessToken="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjM5NjM5NTQ5fQ.FcJ8eoQfMyeUZPvFYGRrv1BYyOK-qZLQ84MBnF408Tk"
  getStates(country:any){
    let api_url="https://www.universal-tutorial.com/api/states/"+country
    
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json',
        'Authorization': this.accessToken
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  
  getCity(state:any){
    let api_url="https://www.universal-tutorial.com/api/cities/"+state
    
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json',
        'Authorization': this.accessToken
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
}
