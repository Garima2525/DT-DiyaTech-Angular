import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { TosterService } from 'src/app/service/toster.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-new-product-edit',
  templateUrl: './new-product-edit.component.html',
  styleUrls: ['./new-product-edit.component.css']
})
export class NewProductEditComponent implements OnInit {

  productForm!:FormGroup
  closebutton:any;
  login_id: any;
  productdata:any;
  PID:any;
  pno:any;
  pname:any;
  CCNNo:any;
  isValidbutton: any;
  saveas: any = true;
  isValidFormSubmitted: any;
  productname:any;
  constructor(
    private prdAdd:FormBuilder,private prdadd:ProductService,
    private toast:TosterService,
    private router:Router,
    private _Activatedroute:ActivatedRoute,
    private Auth:AuthService,
    private product:ProductService,

    ) { }

    get f() {
      return this.productForm.controls;
    }

 

  ngOnInit(): void {
    this.PID=  this._Activatedroute.snapshot.paramMap.get('id');
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.product.getproduct(this.PID).subscribe((data: any) => {
      console.log(data.result[0]);
      this.forminit(data.result[0]);
   
      this.productname = data.result[0].productname;
      console.log(this.productname)
    });
    
  }

  
  forminit(productId:any){
    this.productForm=this.prdAdd.group({
      productname:productId.productname,
      CCNNo:productId.CCNNo,
      Category:productId.Category,
      GST:productId.GST,
      HSNCode:productId.HSNCode,
      OEM:productId.OEM,
      OEMProductCode:productId.OEMProductCode,
      PartNo:productId.PartNo,
      UOM:productId.UOM,
      UnitPrice:productId.UnitPrice,
      type:productId.type,
      parent:productId.parent,
      quantity:productId.quantity,
      amount:productId.amount,
     
    })
    
  }
  saveform(svalue: any) {
    if (this.productForm.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
 
 

  onFormSubmit() {
    this.productForm.value.amount=this.productForm.value.UnitPrice
    this.productForm.value.quantity=1
    this.productForm.value.parent=false
    this.isValidFormSubmitted = false;
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      // this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.productForm, 'true');
      this.isValidbutton = true;
      this.productForm.value.user_id = this.login_id;
     
      // this.productForm.value.productname=this.pname
      // this.productForm.value.PartNo=this.pno
      // this.productForm.value.CCNNo=this.CCNNo
     
      this.prdadd.updateForm(this.productForm.value,this.PID).subscribe((data:any)=>{
        console.log(data);
        this.toast.showSuccess(
          'Congratulation!,Product has been updated.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.router.navigate(['/new-products']);
          }, 1000);
        } else {
          console.log(this.saveas);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
       });
    }
   }
}

