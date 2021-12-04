import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadAttachmentService {
  base_url="https://epr.troology.com/dt"
  api_key='8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8'
  constructor(private http:HttpClient) { }


  uploadFiles(files:any,id:any){
    let api_url=this.base_url+"/upload"
    const formData = new FormData()
    const httpOptions={
      headers:new HttpHeaders({
        'apikey': this.api_key
      }),
    }
    formData.append("image", files, files.name)
    formData.append("attachmentid",id)
    return this.http.post(api_url,formData,httpOptions)
  }
}
