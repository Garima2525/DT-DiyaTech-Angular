import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealFormService {
  constructor(private http:HttpClient) { }

  base_url="https://epr.troology.com/dt/deals"
  api_key='8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8'


  submitForm(data:any){
    console.log(data.attachments)
    let api_url=this.base_url+"/createdeal"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getDealData(id:any){
    console.log(id)
    let api_url=this.base_url+"/getdealbyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getAllDeals(){
    let api_url=this.base_url+"/getdeals"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }


  deleteDeal(id:any){
    
    let api_url=this.base_url+"/deletequote/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
}
