import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { TosterService } from '../service/toster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm!:FormGroup
  constructor(private prdAdd:FormBuilder,private prdadd:ProductService,
    private toast:TosterService,
    private router:Router) { }

    get f() {
      return this.productForm.controls;
    }

  handleSubmit(){

    this.productForm.value.amount=this.productForm.value.UnitPrice
    this.productForm.value.quantity=1
    this.productForm.value.parent=false

    this.prdadd.AddProduct(this.productForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status==200){
        this.toast.showSuccess(data.message)
        this.productForm.reset()
        this.router.navigate(['/new-products'])
      }else if(data.status==200){
        this.toast.showError(data.message)
      }
    })
  }


  ngOnInit(): void {
    this.formInit()
  }

  
  formInit(){
    this.productForm=this.prdAdd.group({
      id:Math.floor(Math.random()*(100000 - 10000) + 10000),
      CCNNo:"",
      Category:"",
      GST:"",
      HSNCode:"",
      OEM:"",
      OEMProductCode:"",
      PartNo:"",
      UOM:"",
      UnitPrice:'',
      productname:"",
      type:"",
      parent:"",
      quantity:"",
      amount:'',
      products:""
    })
    
  }

}
