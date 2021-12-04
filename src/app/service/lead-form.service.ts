import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadFormService {
  constructor(private http:HttpClient) { }

  base_url="https://epr.troology.com/dt/leads"
  api_key='8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8'


  submitForm(data:any){
    console.log(data.attachments)
    let api_url=this.base_url+"/savelead"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getLeadData(id:any){
    console.log(id)
    let api_url=this.base_url+"/getleadbyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getAllLead(){
    let api_url=this.base_url+"/getleads"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getAllLogsById(id:any){
    let api_url=this.base_url+"/getleadlogs/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getOneLog(id:any){
    let api_url=this.base_url+"/getoneleadlogs/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  deleteLead(id:any){
    let api_url=this.base_url+"/deletelead/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  
}
