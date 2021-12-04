import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteFormService {


  base_url="https://epr.troology.com/dt/quotes"
  api_key="8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8"

  constructor(private http:HttpClient) { }

  submitForm(data:any){
    console.log(data.attachments)
    let api_url=this.base_url+"/create-quote"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getQuote(){
    let api_url=this.base_url+"/getquote"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getQuoteById(id:any){
    let api_url=this.base_url+"/getquotebyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  deleteQuote(id:any){
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













