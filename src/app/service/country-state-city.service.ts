import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http:HttpClient) { }
   accessToken="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtYXVyeWFvbXNoYWt0aUBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJVSXR1VzZLUWRFSF9GQmJ3REMwN0VXN2ZCQWhyZ1lxQm5KcEQ2SFZtNGtMSXhWaE91TkR4dmVXN1pHTVZzZnhEOURjIn0sImV4cCI6MTYzNzQ4NzY4OX0.fPTxqTyqyZJYbZamez86nMX2UPHnlCpcMfZLhvm8la4"
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
