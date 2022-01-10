import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectTreeCheckableSettings } from '@progress/kendo-angular-dropdowns';
import { FlatBindingDirective } from '@progress/kendo-angular-treelist';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Product } from 'src/productInterface';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { ContactService } from '../service/contact.service';
import { DealFormService } from '../service/deal-form.service';
import { ProductService } from '../service/product.service';
import { TosterService } from '../service/toster.service';
import { UploadAttachmentService } from '../service/upload-attachment.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {

  public checkableSettings: MultiSelectTreeCheckableSettings = {
    checkChildren: true,
    checkOnClick: false,
  };
  productForm!:FormGroup
  buttondisabled: any=true;

  public data: Product[]=[];
  public data1: Product[] =[]
  public data2: Product[] =[]
  public value: Product[] =[]
  selectedProduct: any = [];
  showDropdownData:any=[]
  showDropdownBox:boolean=false
  totalAmount:any=0
  totalQuantity:any=0

  groupName:any
  groupSize:any=0
  groupAmount:any=0
  groupPartNumber:any
  mergedProduct:any=[]


  dealForm!:FormGroup
  isValidFormSubmitted:any=false
  dealId:any
  userId:any
  currentUser:any
  accountData:any
  contactData:any
  contactTempData:any
  attachment_files:any=[]
  show_files:any=[]
  files_url:any=[]
  incoTerm:any=[{value:null}]
  pmtTerm:any=[{value:null}]
  deal_validity:any
  branchData:any
  quoteOwner:any
  quoteOwnerId:any
  users:any
  salesPersonData:any
  selectedPerson:any


  productData:any
  productVal:any=[]
  selectedItem:any=[]
  showbtn:boolean=false
  selectedDataForMerge:any=[]
  currentPrice:any
  mergedProducts:any={}
  MergedProductsName:any=""

 

  dt:any;
  account_id:any=''
  company_name:any=''
  company_industry:any=''
  company_country:any=''
  company_state:any=''
  company_city:any=''
  company_location:any=''
  company_gst:any=''
  company_pan:any=''
  company_tan:any=''
  company_cin:any=''


  contact_id:any
  contact_name:any
  contact_role:any
  contact_phone:any
  contact_mobile:any
  contact_email:any

  dropdownSettings:any={}
  contactDropdownSettings:any={}
  productDropdownSettings={}
  locationDropdownSettings={}
  ownerDropdownSettings={}
  salesPersonDropdownSettings={}


  selectedUser:any
  selectedBranch:any
  settingsQuote:any= {};
  selectedItemssQuote:any=[];
  constructor(private auth:AuthService,
    private account:AccountService,
    private contact:ContactService,
    private company:CompanyService,
    private dlFm:FormBuilder,
    private upload:UploadAttachmentService,
    private deal:DealFormService,
    private toast:TosterService,
    private router:Router,
    private product:ProductService,
    private user:UserService) {

      

   let number = Math.random() // 0.9394456857981651
   number.toString(36); // '0.xtis06h6'
  var id = number.toString(36).substr(2, 9);
  this.dealId=id.toUpperCase()
   }

   submitForm(){
    //  this.dealForm.value.deal_owner=this.currentUser
     this.dealForm.value.deal_owner_id=this.userId
     this.dealForm.value.account_id=this.account_id
     this.dealForm.value.company_name=this.company_name
     this.dealForm.value.contact_id=this.contact_id 
     this.dealForm.value.contact_name=this.contact_name 
     this.dealForm.value.product_services=this.data 
    this.dealForm.value.attachments=this.files_url
    this.dealForm.value.inco_terms=this.incoTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined))

    this.dealForm.value.payment_terms=this.pmtTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined))
    this.dealForm.value.created_by=this.currentUser
    this.dealForm.value.deal_validity=this.deal_validity
    // this.dealForm.value.deal_estimated_value=this.



    
    if(this.dealForm.invalid){
      window.scrollTo({top:0,
     behavior:'smooth'})
      this.isValidFormSubmitted=true
    }else{

    this.deal.submitForm(this.dealForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status===200){
        this.toast.showSuccess(data.message)
        setTimeout(() => {
          
          this.router.navigate(['/deal'])
        }, 1500);
      }
      else if(data.status===500){
        this.toast.showError(data.message)
      }
    })}
    console.log(this.dealForm.value)
   }


   
  ngOnInit(): void {
    this.dt = new Date();
    this.product.getAllProductLimit({'lim':100}).subscribe((data:any)=>{
        this.productData=data.result  
        this.data1=[...data.result]
        this.data2=[...data.result]  
          })

    this.auth.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.currentUser=user.result.username
      this.userId=user.result._id
      this.selectedUser=[user.result]
    })

    this.user.getAllUsers().subscribe((data:any)=>{
      console.log(data)
      this.users=data.result
    })

    this.company.GetAddress().subscribe((branch:any)=>{
      console.log(branch)
      this.branchData=branch.result
    })
    this.account.getAllAccount().subscribe((data:any)=>{
      this.accountData=data
      console.log(data)
    }) 
    this.product.getAllSalesPerson().subscribe((data:any)=>{
      console.log(data)
      this.salesPersonData=data.result
    })

    

    this.contact.getAllContact().subscribe((data:any)=>{
      console.log(data)
      this.contactData=data
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'account_id',
      textField: 'company_name',
      noDataAvailablePlaceholderText:'No Company Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: true
    };
    this.contactDropdownSettings={
      singleSelection: true,
      idField: 'contact_id',
      textField: 'contact_name',
      noDataAvailablePlaceholderText:'No Contact Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: true
    }
    this.productDropdownSettings={
      singleSelection: true,
      idField: 'id',
      textField: 'productname',
      noDataAvailablePlaceholderText:'No Product Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: true
    }

    this.settingsQuote = {
      singleSelection: true,
      text: "Select Items",
      enableSearchFilter: true,
      showCheckbox:true
  };

    this.locationDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'branch_name',
      noDataAvailablePlaceholderText:'No Branch Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }
    this.ownerDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No User Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }

    this.salesPersonDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No Branch Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }

    
    this.formInit()
    this.formmodelInit();

  }

  fetchMore(event: any) {
    if (event.endIndex === this.data1.length - 1) {
      console.log(this.data1.length);
      let limit=this.data1.length+100;
      this.product.getAllProductLimit({'lim':limit}).subscribe((data:any)=>{
        console.log(data)
        this.productData=data.result  
        this.data1=[...data.result]
        this.data2=[...data.result]
        })
    }
}
onSearch(event:any){
  if(event.target.value.length>4){
    this.product.getProductDataSearch({'searchValue':event.target.value}).subscribe((data:any)=>{
      console.log(data)
      if(data.result==null){
        this.data1=[]
      }else{ 
        this.productData=data.result  
        this.data1=[...data.result]
        this.data2=[...data.result]
      }
      })
  }
  else{
    console.log('edrtyertertye');
  }
}
  handleLocationChange(e:any){
    console.log(e)
  }
  
  
  handleOwnerChange(e:any){
    console.log(e)
    this.quoteOwner=e.username
    this.quoteOwnerId=e._id
   // this.leadOwner=e.target.value.split(',')[0]
 }


  handleAttachmentUpload(e:any){
    let date=new Date()
    this.attachment_files=e.target.files
      
    for(let file of e.target.files){
       this.upload.uploadFiles(file,this.dealId).subscribe((url:any)=>{
        let img_url=url.url
         this.files_url.push({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.dealId})
         console.log({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.dealId})
       })
     }

     for(let file of e.target.files)
    this.show_files.push({
      name:file.name,
      size:file.size,
      attached_by:this.currentUser,
      upload_date:date.toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric'})
    })


   }


  onContactSelect(contact:any){
    console.log(contact)

    let filter_contact = this.contactData.filter((cntc:any)=>cntc.contact_id===contact.contact_id)
    console.log(filter_contact[0])

    this.contact_id=filter_contact[0].contact_id
    this.contact_name=filter_contact[0].contact_name
    this.contact_role=filter_contact[0].role
    this.contact_phone=filter_contact[0].phone_no
    this.contact_mobile=filter_contact[0].mobile_no
    this.contact_email=filter_contact[0].email
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);

    let contacts=this.contactData.filter((contact:any)=>contact.account_id===item.account_id)
    console.log(contacts)

    this.contactTempData=contacts

    let filtered_company= this.accountData.filter((acc:any)=>acc.account_id===item.account_id)
    console.log(filtered_company)

    this.account_id=filtered_company[0].account_id
    this.company_name=filtered_company[0].company_name
    this.company_industry=filtered_company[0].industry
    this.company_country=filtered_company[0].company_country
    this.company_state=filtered_company[0].company_state
    this.company_city=filtered_company[0].company_city
    this.company_location=filtered_company[0].company_location
    this.company_gst=filtered_company[0].gst
    this.company_pan=filtered_company[0].pan
    this.company_tan=filtered_company[0].tan
    this.company_cin=filtered_company[0].cin

  }

  handleCheckbox(val:any){
    this.dt.setDate(this.dt.getDate() + parseInt(val));
    this.deal_validity=val
   }

   handleAddPmtTerm(){
    this.pmtTerm.push({value:null})
   }
   handleBlurPmtTerm(e:any,index:any){
    this.pmtTerm[index].value=e.target.value
   }
   handleDeletePmtTerm(index:any){
    this.pmtTerm.splice(index,1)
   }

   handleBack(){
     this.router.navigate(['/deal'])
   }
   handleBlurIncoTerm(e:any,index:any){
     this.incoTerm[index].value=e.target.value
     console.log(e.target.value,index)
     console.log(this.incoTerm)
   }

   handleDeleteIncoTerm(index:any){
    this.incoTerm.splice(index,1)
   }
   handleAddIncoTerm(){
    this.incoTerm.push({value:null})
    
   }


   get f() {
    return this.dealForm.controls;
  }

  // onProductSelect(product:any){
  //   console.log(product)
  //   let data=this.productVal.filter((data:any)=>data._id===product._id)
  //   if(data.length===0){
  //         let prd=this.productData.filter((data:any)=>data._id===product._id)
  //         console.log(prd[0])
  //         prd[0].quantity=1
  //         prd[0].amount=1*prd[0].UnitPrice
  //         this.productVal.push(prd[0])
  //   }
  //   this.showbtn=this.productVal.length>1?true:false
  //   this.productVal.length>1?null:this.selectedDataForMerge=[]
  //   this.selectedItem=[]
  // }


  // onSelectAll(e:any){
  //   console.log(e)
  //   this.productVal=this.productData
  // }


  // handleProductdelete(id:any,type:any){
  //   console.log(id,this.productVal)
  //   this.productVal=this.productVal.filter((item:any)=>item._id!==id)
  //   let data=this.selectedDataForMerge.filter((item:any)=>item._id!=id)
  //   if(type==='group'){
  //     this.product.deleteGroup(id).subscribe((data:any)=>{
  //       // this.toast.showSuccess(data.message)
  //       console.log(data.message)
  //     })
  //   }
  //   console.log(data)

  //   this.selectedDataForMerge=data
  //   this.showbtn=this.productVal.length>1?true:false
  //   this.productVal.length>1?null:this.selectedDataForMerge=[]
  // }


  // handleMergeSelection(e:any,id:any){
  //   console.log(e.target.checked,id)
  //   if(e.target.checked){
  //     let data=this.productVal.filter((item:any)=>item._id===id)
  //     this.selectedDataForMerge.push(data[0])
  //   }else{
  //     let data=this.selectedDataForMerge.filter((item:any)=>item._id!=id)
  //     this.selectedDataForMerge=data
  //   }
  // }


//  async MergeProducts(){

//     this.mergedProducts={
//     // group_name:this.MergedProductsName,


//     // products:this.selectedDataForMerge,
//     // group_amount:this.groupAmount,
//     // group_price:this.groupPrice,
//     // group_part_no:this.groupPartNo,
//     // group_gst:'',
//     // group_cnn_no:'',
//     // group_hsn_no:'',

//     type:'group',
//     main_id:this.dealId,
//     product:this.selectedDataForMerge,
//     PartNo: this.groupPartNo,
//     CCNNo: 'Nan',
//     productname: this.MergedProductsName,
//     UnitPrice: this.groupAmount,
//     UOM: 0,
//     Category: 'Nan',
//     OEM: 'Nan',
//     quantity:1,
//     amount:this.groupPrice*1,

//     OEMProductCode:'Nan',
//     HSNCode: 'Nan',
//     GST: 'Nan'
//   }


//     console.log(this.mergedProducts)
//     this.MergedProductsName?
    
//     this.mergedProducts.main_id && this.product.createGroup(this.mergedProducts).subscribe((data:any)=>{
//       console.log(data)
//       if(data.status==200){
//         document.getElementById('closebtn')?.click()
//         console.log( data.data.product)
//         console.log(this.productVal)


//         console.log(this.productVal)

//         data.data.product?.map((item:any)=>{

//           this.productVal=this.productVal.filter((data:any)=>{
//             return data._id!==item._id
//           })
//           if(item.type==='group'){
//             this.product.deleteGroup(item._id).subscribe((data:any)=>{
//               // this.toast.showSuccess(data.message)
//               console.log(data.message)
//             })
//           }
//         })

        
//         this.product.getGroups(data.data.main_id).subscribe((data:any)=>{
//           console.log(data)
//           data.result.map((item:any)=>{
//             this.productVal=this.productVal.filter((data:any)=>{
//               console.log(data._id!==item._id,data._id,item._id)
//               return data._id!==item._id
//             })
//             this.productVal.push(item)
//           })
//           console.log(this.productVal)
//         })



//        this.selectedDataForMerge=[]
//        this.MergedProductsName=''
       
//        // this.showbtn=this.productVal.length>1?true:false

//       }
//     }):this.toast.showError("Group Name Required")

//   }


  // handleGroupData(){
  //   this.groupAmount=0
  //   this.groupPrice=0
    

  //   this.selectedDataForMerge.map((item:any)=>{
  //     console.log(typeof(item.UnitPrice),Number(item.UnitPrice))
  //     this.groupAmount+=item.amount
  //     this.groupPrice+=Number(item.UnitPrice)
  //   })
  //   this.groupPartNo=Math.floor(Math.random()*1000000)
  // }



  // inputName(e:any){
  //   this.MergedProductsName=e.target.value
  // }

  // handleInput(e:any,index:any,name:any){
  //   console.log(this.productVal)
  //   if(e.target.value>0 && e.target.value<1001){
  //     this.productVal[index][name]=e.target.value
  //     this.productVal[index].amount=this.productVal[index].UnitPrice*e.target.value
  //   }
  //   this.productVal[index][name]=1

  // }



  public sort: SortDescriptor[] = [
    // {
    //   field: 'type',
    //   dir: 'asc',
    // },
    // {
    //   field: 'productname',
    //   dir: 'asc',
    // },
  ];


  handleFilter(value1: any) {
    this.data1 = this.data1.filter((s) => s.productname.toLowerCase().indexOf(value1.toLowerCase()) !== -1 );
  }

  public selectionChange(val: any): void {
    this.value=this.data2.filter((item:any)=>item.id===val.id)
     if (this.value[0] !== undefined) {
       
       if(this.selectedProduct.length==1)
       {
         this.selectedProduct[0].amount+=Number(this.value[0].UnitPrice)
         this.selectedProduct[0]["products"]?.push(this.value[0])
         this.totalAmount+=Number(this.value[0].UnitPrice)
         this.selectedProduct[0]["quantity"]==0? this.totalQuantity+=1:null
         this.selectedProduct[0]["quantity"]=1
         this.data=this.data.filter((dt:any)=>dt)
       } 
       else if(this.selectedProduct.length>1)
       {
         this.toast.showError("Please Select only One Group!")
       }
       else
       {
         this.totalAmount+=Number(this.value[0].UnitPrice)
         this.totalQuantity+=Number(this.value[0].quantity)
         this.data.push(this.value[0]);
         this.data=this.data.filter((dt:any)=>dt)
       }
     }
   }

  public fetchChildren = (item: any): Product[] => {
    return item.products;
  };

  public hasChildren = (item: any): any => {
    return item.products && item.products.length > 0;
  };

  selectProducts(product: any,e:any) {
    console.log(product,e.target.checked);
    if (e.target.checked){
      this.selectedProduct.push(product);
    }else{
      this.selectedProduct = this.selectedProduct.filter((data: any) => data.id !== product.id);
      console.log(product, e.target.checked);
    }
    this.selectedProduct.length==1?this.showDropdownBox=true:this.showDropdownBox=false
  }
  

  changeParentType(data:any){
    console.log(data)
    data.map((item:any)=>{
      if(item.type==="Product"){
        item['parent']=true
        item.id=Math.floor(Math.random()*1000)
        console.log(item)
        return
      }else{
        item['parent']=true
        item.id=Math.floor(Math.random()*1000)
        this.changeParentType(item.products)
      }
    })
    return
  }


  mergeSelection( ){
    this.changeParentType(this.selectedProduct)
    console.log(this.selectedProduct)

    this.mergedProduct={
      productname:this.groupName,
      PartNo:Math.floor(Math.random()*10000),
      id:Math.floor(Math.random()*100),
      UOM:"NA",
      CCNNo:"NA",
      GST:"NA",
      UnitPrice:this.groupSize,
      products:this.selectedProduct,
      Category:"NA",
      OEM:"NA",
      OEMProductCode:"NA",
      HSNCode:"NA",
      main_id:"NA",
      type:"Group",
      amount:this.groupAmount,
      quantity:1,
      parent: false


      // type: 'directory',
      // id: Math.floor(Math.random()*100),
      // name: this.groupName,
      // size: this.groupSize,
      // time: new Date(),
      // amount: this.groupAmount,
      // contents:this.selectedProduct,
      // quantity: 1,
      // parent: false,
    }

    console.log(this.mergedProduct)

    this.data.push(this.mergedProduct)
    this.selectedProduct.map((dt:any)=>{
      var index = this.data.map(item => {
        return item.id;
      }).indexOf(dt.id);
      this.data.splice(index, 1);
    })

    this.selectedProduct=[]
    this.groupPartNumber=null
    this.groupName=""
    this.groupAmount=0
    this.groupSize=0 
    document.getElementById('closebtn')?.click()

    this.data=this.data.filter((dt:any)=>dt)
  }

  inputName(e:any){
    this.groupName=e.target.value
  }

  checkMergeSelection(){
    if(this.selectedProduct.length>1){
      this.groupSize=0
      this.groupAmount=0
      this.groupName=''
      this.groupPartNumber=Math.floor(Math.random()*1000000)
      // this.changeId(this.selectedProduct)
      this.selectedProduct.map((item:any)=>{
        this.groupSize+=parseInt(item.UnitPrice)
        this.groupAmount+=item.amount
      })
      document.getElementById('showmodal')?.click()
    }else{
      console.log("Select atleast two products")
    }
  }

  getParent(data: any, id: any, amt: any, qty: any):any {
    console.log(data,id,qty,amt)
    let amount=0
    data?.map((item: any, index: any):any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          
          // data.amount=amount
          console.log(item.id);
          item.amount = amt;
          item.quantity = qty;
          let total=item.UnitPrice*qty
          item.amount = total-total*(item.discount/100);

          return 
        }
      } else {
        this.getParent(item.products, id, amt, qty);
        item.amount=0

        item.products.length>0?item.quantity=1:item.quantity=0

        item.products.map((itm:any)=>{
          item.amount+=Number(itm.amount)
          console.log(item.amount)
        })
        this.data.filter((dt:any)=>dt)
      }
    });
return data
    
  }

  
  updateUnitPrice(data: any, id: any, unitprice: any):any {
    console.log(data,id,unitprice)
    let amount=0
    data?.map((item: any, index: any):any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          
          // data.amount=amount
          console.log(item.id);
          item.UnitPrice=unitprice
          let total=unitprice*item.quantity
          item.amount = total-total*(Number(item.discount/100));

          return 
        }
      } else {
        this.updateUnitPrice(item.products, id, unitprice);
        item.amount=0

        item.products.length>0?item.quantity=1:item.quantity=0

        item.products.map((itm:any)=>{
          item.amount+=Number(itm.amount)
          console.log(item.amount)
        })
        this.data.filter((dt:any)=>dt)
      }
    });
return data
    
  }


  updateDiscount(data: any, id: any, discount: any):any {
    console.log(data,id,discount)
    let amount=0
    data?.map((item: any, index: any):any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          
          // data.amount=amount
          console.log(item.id);
          item.discount=discount
          let total=item.UnitPrice*item.quantity
          item.amount = total-total*(Number(discount)/100);
          return 
        }
      } else {
        this.updateDiscount(item.products, id, discount);
        item.amount=0

        item.products.length>0?item.quantity=1:item.quantity=0

        item.products.map((itm:any)=>{
          item.amount+=Number(itm.amount)
          console.log(item.amount)
        })
        this.data.filter((dt:any)=>dt)
      }
    });
return data
    
  }


  deleteData(data: any, id: any):any {
    console.log(data,id)
    data?.map((item: any, index: any):any => {
      console.log(item);
      if (item.type === 'Product') {
        if (item.id === id) {
          console.log(index,item)
          data.splice(index,1)
          // data.amount-=item.amount
          // this.data=this.data.filter((itm:any)=>itm)
          return
        }
      } else {
        if(item.id===id){
          data.splice(index,1)
          return
        }
        this.deleteData(item.products, id);
        item.products.length>0?item.quantity=1:item.quantity=0
        item.amount=0
        item.products.map((itm:any)=>{
          item.amount+=itm.amount
          console.log(item.amount)
        })
        this.data=this.data.filter((dt:any)=>dt)
      }
    });
    return data
  }

  public onchange(e: any, prod: any) {
    console.log(e, prod);

    let qty = e.target.value;
    let price = prod.UnitPrice;
    let amt = qty * price;
    this.totalQuantity=0
    this.totalAmount=0
    console.log(e.target.value, prod.UnitPrice);
    console.log(amt, this.data,this.data1);

   this.data= this.getParent(this.data, prod.id, amt, qty);
    this.data=this.data.filter((dt:any)=>{
      this.totalAmount+=Number(dt.amount)
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
    this.totalAmount=this.totalAmount.toFixed(2)
    // this.data[prod.id].amount=amt;
    // this.getParent(this.data, prod.id);
  }


  public handleChangeUnitprice(e:any,prod:any){
    this.updateUnitPrice([...this.data],prod.id,e.target.value)
    this.totalAmount=0
    this.totalQuantity=0
    this.data=this.data.filter((dt:any)=>{
      this.totalAmount+=Number(dt.amount)
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
    this.totalAmount=this.totalAmount.toFixed(2)
  }

  public handleDiscount(e:any,prod:any){

    this.updateDiscount(this.data.slice(),prod.id,e.target.value)
    this.totalAmount=0
    this.totalQuantity=0
    this.data=this.data.filter((dt:any)=>{
      this.totalAmount+=Number(dt.amount)
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
    this.totalAmount=this.totalAmount.toFixed(2)
  }



  handleclick() {
    console.log(this.data);
  }



  checkAddGroup(){
    console.log("add group")

  if(this.groupName){
    this.mergedProduct={
      productname:this.groupName,
      PartNo:Math.floor(Math.random()*10000),
      id:Math.floor(Math.random()*100),
      UOM:"NA",
      CCNNo:"NA",
      GST:"NA",
      UnitPrice:0,
      products:[],
      Category:"NA",
      OEM:"NA",
      OEMProductCode:"NA",
      HSNCode:"NA",
      main_id:"NA",
      type:"Group",
      amount:0,
      quantity:0,
      parent: false
    }
    console.log(this.mergedProduct)
    this.data.push(this.mergedProduct)
    document.getElementById('closenameinp')?.click()
    // directive.rebind()
    this.groupName=""
    this.data=this.data.filter((dt:any)=>dt)
  }else{
    this.toast.showError("Please enter group name!")
  }
  this.groupName=""

  }

  handleBoxOpen():void{
    console.log(this.data);
    if(this.selectedProduct.length===1){
      console.log(this.selectedProduct[0].id)
      this.showDropdownData=this.data.filter((item:any)=>item.id!=this.selectedProduct[0].id)
    }else if(this.selectedProduct.length>1){
      this.toast.showError("Please Select only one group!")
    }else{
      this.showDropdownData=this.data.filter((item:any)=>item)
    }
    // directive.data=this.data
  }

  handlechangeValue(e:any):void{
    console.log(e)
    e.map((item:any)=>{
     this.data= this.data.filter((itm:any)=>{
       if(itm.id===item.id){
        // item.id=item.id+Math.floor(Math.random()*10000)
        this.selectedProduct[0].amount+=parseInt(item.UnitPrice)
        this.selectedProduct[0].products.push(item)
        // this.selectedProduct[0].products=this.selectedProduct[0].products.filter((itm:any)=>item.id!=itm.id)
       }
       return itm.id!==item.id
     })
     this.showDropdownData=this.data.filter((item:any)=>item)
    })
    this.selectedProduct[0].products.length>0?this.selectedProduct[0].quantity=1:this.selectedProduct[0].quantity=0
    this.getParent(this.data,-1,0,0)
  }

  valueChange(e:any):void{
    console.log(e)
  }

  handleDelete(prd:any){
    console.log(prd)
    this.totalQuantity=0
    this.totalAmount=0

    this.deleteData(this.data,prd.id)
    this.data=this.data.filter((dt:any)=>{
      this.totalAmount+=dt.amount
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
    this.totalAmount=this.totalAmount.toFixed(2)
  }



  formInit(){
    this.dealForm=this.dlFm.group({
      deal_id:this.dealId,
      deal_owner:['',Validators.required],
      deal_owner_id:this.userId,
      company_name:'',
      account_id:'',
      contact_name:'',
      contact_id:'',
      deal_source:['',Validators.required],
      deal_location:['',Validators.required],
      deal_title:['',Validators.required],
      deal_type:['',Validators.required],
      referral:'',
      // industry:['',Validators.required],
      deal_estimated_value:'',
      deal_status_stage:['',Validators.required],
      remark:'',
      product_services:[],
      note:'',
      attachments:'',
      sales_order_no:'',
      inco_terms:'',
      payment_terms:'',
      p_f:'',
      p_t:'',
      freight:'',
      taxes:'',
      other_charges:'',
      delivery:'',
      warranty:'',
      deal_validity:'',
      created_by:this.currentUser,
      edit_status:true,
      company:['',Validators.required],
      contact:['',Validators.required],
      sales_person:['',Validators.required],
      selected_contact:''
    })
  }


  handleSubmit(){
    
    this.productForm.value.amount=this.productForm.value.UnitPrice
    this.productForm.value.quantity=1
    this.productForm.value.parent=false
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmitted = true;
    }
    else {
      console.log(this.productForm, 'true');
      this.product.AddProduct(this.productForm.value).subscribe((data:any)=>{
        this.buttondisabled="false";
       
      console.log(data)
      if(data.status==200){
        this.isValidFormSubmitted = true;
        this.toast.showSuccess(data.message)
        
        this.data.push(data.result)
        this.data=this.data.filter((dt:any)=>dt)
        
      }else if(data.status==200){
    
        this.toast.showError(data.message)
        
      }
      
    })
  }
} 
formmodelInit(){
  this.productForm=this.dlFm.group({
    id:Math.floor(Math.random()*(100000 - 10000) + 10000),
    CCNNo:'',
    Category:"",
    GST:"",
    HSNCode:"",
    OEM:"",
    OEMProductCode:"",
    PartNo:['',Validators.required],
    UOM:['',Validators.required],
    UnitPrice:['',Validators.required],
    productname:['',Validators.required],
    type:['',Validators.required],
    parent:"",
    quantity:"",
    amount:'',
    products:""
  })
  
}
get fm() {
  return this.productForm.controls;
}
decimalFormat(num:any){
  return num.toFixed(2)
}
}

