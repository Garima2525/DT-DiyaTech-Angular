import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { ProductService } from 'src/app/service/product.service';
import { UploadAttachmentService } from 'src/app/service/upload-attachment.service';

import * as XLSX from 'xlsx';
import { product } from 'src/app/Product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  productData:any
  public gridData: any;
  public gridView: any;
  public mySelection: string[] = [];
  attachment_files: any;
  importContacts: product[] = [];
  constructor(private prd:ProductService,private upload:UploadAttachmentService,) { }

  ngOnInit(): void {
    this.prd.productmaster().subscribe((data:any)=>{
      console.log(data)
      this.productData=data.result
      this.gridView=data.result
    })
  }


  
  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "lead_owner",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "created_date_time",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "modified_date_time",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "aging",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "company_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "contact",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "industry",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_source",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_status_stage",
            operator: "contains",
            value: inputValue,
          }
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  handleUpload(e:any){
    let date=new Date()
    console.log(date.getTime())
    this.attachment_files=e.target.files
      
    for(let file of e.target.files){
       this.upload.uploadFiles(file,date.getTime()).subscribe((url:any)=>{
        let img_url=url.url
         console.log({img_url,name:file.name,size:file.size,upload_date:date})
       })
     }
}

onFileChange(evt: any) {
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {

    const bstr: string = e.target.result;
    const data = <any[]>this.upload.importFromFile(bstr);

    const header: string[] = Object.getOwnPropertyNames(new product());
    const importedData = data.slice(1);

    this.importContacts = importedData.map(arr => {
      const obj:any = {};
      for (let i = 0; i < header.length; i++) {
        const k = header[i];
        obj[k] = arr[i];
      }
      return <product>obj;
    })
    console.log(this.importContacts);
    this.prd.bulkAddProduct(this.importContacts).subscribe((data:any)=>{
      window.location.reload();
    })

  };
  reader.readAsBinaryString(target.files[0]);
}
}
