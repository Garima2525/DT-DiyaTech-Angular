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
import { QuoteFormService } from '../service/quote-form.service';
import { TosterService } from '../service/toster.service';
import { UploadAttachmentService } from '../service/upload-attachment.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.css']
})
export class CreateQuoteComponent implements OnInit {


  public checkableSettings: MultiSelectTreeCheckableSettings = {
    checkChildren: true,
    checkOnClick: false,
  };


  public data: Product[]=[];
  public data1: Product[] =[]
  public data2: Product[] =[]
  public value: Product[] =[]
  selectedProduct: any = [];
  PartNo: any = [];
  showDropdownData:any=[]
  showDropdownBox:boolean=false
  totalAmount:any=0
  totalQuantity:any=0
  settings:any= {};
  itemList:any=[];
  loading = false;
  selectedItemss:any=[]
  groupName:any
  groupSize:any=0
  groupAmount:any=0
  groupPartNumber:any
  mergedProduct:any=[]



  quoteForm!:FormGroup
  branchData:any
  users:any
  quoteId:any
  currentUser:any
  quoteLocation:any
  quoteLocationId:any
  userId:any
  quoteOwner:any
  quoteOwnerId:any
  accountData:any=''
  contactData:any
  contactTempData:any=''
  incoTerm:any=[{value:null}]
  pmtTerm:any=[{value:null}]
  deal_validity:any=''
  attachment_files:any=[]
  show_files:any=[]
  isValidFormSubmitted:any=false
  productData:any
  productVal:any=[]
  selectedItem:any=[]
  showbtn:boolean=false
  selectedDataForMerge:any=[]
  currentPrice:any
  mergedProducts:any={}
  MergedProductsName:any=""
  salesPersonData:any


  ShowFilter = true;
  limitSelection = false;
  dropdownList:any=[]
  selectedItems: any = [];
  selectedUser:any


  dropdownSettings = {};
  contactDropdownSettings={}
  productDropdownSettings={}
  ownerDropdownSettings={}
  locationDropdownSettings={}
  salesPersonDropdownSettings={}


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

  files_url:any=[]
  productForm!:FormGroup

  buttondisabled: any=true;

  constructor(private auth:AuthService,
    private account:AccountService,
    private contact:ContactService,
    private toast:TosterService,
    private router:Router,
    private qtFm:FormBuilder,
    private quote:QuoteFormService,
    private upload:UploadAttachmentService,
    private company:CompanyService,
    private deal:DealFormService,
    private product:ProductService,
    private user:UserService) {
    let number = Math.random() // 0.9394456857981651
   number.toString(36); // '0.xtis06h6'
  var id ="Q-"+number.toString(36).substr(2,9);
  this.quoteId=id.toUpperCase()
   }



   SubmitForm(){
    
    this.quoteForm.value.inco_terms=this.incoTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined))

    this.quoteForm.value.payment_terms=this.pmtTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined))
   
    this.quoteForm.value.product_services=this.data
    this.quoteForm.value.attachments=this.files_url
    this.quoteForm.value.created_by=this.currentUser
    this.quoteForm.value.deal_validity=this.deal_validity
    this.quoteForm.value.account_id=this.account_id
    this.quoteForm.value.contact_id=this.contact_id
    // this.quoteForm.value.quote_owner=this.currentUser
    // this.quoteForm.value.quote_owner_id=this.quoteId

    // this.quoteForm.value.quote_location=this.quoteLocation
    // this.quoteForm.value.quote_location_id=this.quoteLocationId
    
    console.log(this.quoteForm.value)

    if(this.quoteForm.invalid){
      window.scrollTo({top:0,
     behavior:'smooth'})
      this.isValidFormSubmitted=true
    }else{

    this.quote.submitForm(this.quoteForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status===200){
        this.toast.showSuccess(data.message)
        setTimeout(() => {
          this.router.navigate(['/quote'])
        }, 1500);
      } else if(data.status===500){
        this.toast.showError(data.message)
      }
    })
   }
  }



  async handleDealConvert(){
    if(this.quoteForm.invalid){
      window.scrollTo({top:0,
     behavior:'smooth'})
      this.isValidFormSubmitted=true
    }else{
      let obj=await{
        deal_id:this.quoteId,
      deal_owner:this.currentUser,
      sales_person:this.quoteForm.value.sales_person,
      company_name:'',
      account_id:this.account_id,
      contact_name:'',
      contact_id:this.contact_id,
      deal_source:this.quoteForm.value.quote_source,
      deal_location:this.quoteForm.value.quote_location,
      deal_title:this.quoteForm.value.quote_title,
      deal_type:this.quoteForm.value.quote_type,
      referral:this.quoteForm.value.referral,
      industry:this.quoteForm.value.industry,
      deal_estimated_value:this.quoteForm.value.estimated_value,
      deal_status_stage:this.quoteForm.value.quote_status,
      remark:this.quoteForm.value.remark,
      product_services:this.data,
      note:this.quoteForm.value.note,
      attachments:this.files_url,
      sales_order_no:'',
      inco_terms:this.incoTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined)),
      payment_terms:this.pmtTerm.filter((term:any)=>(term.value!=null) || (term.value!=undefined)),
      p_f:this.quoteForm.value.p_f,
      freight:this.quoteForm.value.freight,
      taxes:this.quoteForm.value.taxes,
      other_charges:this.quoteForm.value.other_charges,
      delivery:this.quoteForm.value.delivery,
      warranty:this.quoteForm.value.warrenty,
      deal_validity:this.deal_validity,
      created_by:this.currentUser,
      edit_status:true
      }
      await this.deal.submitForm(obj).subscribe((data:any)=>{
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
      })
     await console.log(obj)
    }
   }

   handleBack(){
    this.router.navigate(['/quote'])
  }


   handleAttachmentUpload(e:any){
    let date=new Date()
    this.attachment_files=e.target.files
      
    for(let file of e.target.files){
       this.upload.uploadFiles(file,this.quoteId).subscribe((url:any)=>{
        let img_url=url.url
         this.files_url.push({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.quoteId})
         console.log({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.quoteId})
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

   handleCheckbox(val:any){
    this.deal_validity=val
   }

   handleAddPmtTerm(){
    this.pmtTerm.push({value:null})
    console.log(this.pmtTerm)
   }
   handleBlurPmtTerm(e:any,index:any){
    this.pmtTerm[index].value=e.target.value
    console.log(this.pmtTerm)
   }
   handleDeletePmtTerm(index:any){
    this.pmtTerm.splice(index,1)
   }


   handleBlurIncoTerm(e:any,index:any){
     this.incoTerm[index].value=e.target.value
   }

   handleDeleteIncoTerm(index:any){
    this.incoTerm.splice(index,1)
   }
   handleAddIncoTerm(){
    this.incoTerm.push({value:null})
    
   }

   
  ngOnInit(): void {
    this.auth.userLoggedIn().subscribe((data:any)=>{
      this.currentUser=data.result.username
      this.userId=data.result._id
      this.selectedUser=[data.result]
    })

    this.user.getAllUsers().subscribe((data:any)=>{
      console.log(data)
      this.users=data.result
    })


    this.product.getAllProduct().subscribe((data:any)=>{
      console.log(data)
        this.productData=data.result  
        this.data1=[...data.result]
        this.data2=[...data.result]   
    })




    this.product.getAllSalesPerson().subscribe((data:any)=>{
      console.log(data)
        this.salesPersonData=data.result  
    })

    this.company.GetAddress().subscribe((branch:any)=>{
      console.log(branch)
      this.branchData=branch.result
    })

    this.account.getAllAccount().subscribe((data:any)=>{
      this.accountData=data
      console.log(data)
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

    this.settings = {
      singleSelection: true,
      text: "Select Items",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'productname',
      primaryKey:'id',

  };
    this.ownerDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No User Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }
    this.locationDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'branch_name',
      noDataAvailablePlaceholderText:'No Branch Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }
    this.salesPersonDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No Sales Person Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }
    this.formInit()
    this.formmodelInit()

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
  
  handleLocationChange(e:any){
    console.log(e)
  }
  
  handleOwnerChange(e:any){
    console.log(e)
    this.quoteOwner=e.username
    this.quoteOwnerId=e._id
   // this.leadOwner=e.target.value.split(',')[0]
 }

  get f() {
    return this.quoteForm.controls;
  }

  get fm() {
    return this.productForm.controls;
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


//     type:'group',
//     main_id:this.quoteId,
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





  handleBranchAdd(e:any){
    console.log(e.target.value)

    // this.quoteForm.value.quote_location=
    // this.quoteForm.value.quote_location_id=e.target.value[1]

    this.quoteLocation=e.target.value.split(',')[0]
    this.quoteLocationId=e.target.value.split(',')[1]
  }





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
    this.PartNo=null
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
          item.amount+=itm.amount
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
          item.amount = total-total*(item.discount/100);

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
  }

  public handleDiscount(e:any,prod:any){

    this.updateDiscount(this.data.slice(),prod.id,e.target.value)
    this.totalAmount=0
    this.totalQuantity=0
    this.data=this.data.filter((dt:any)=>{
      this.totalAmount+=dt.amount
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
  }



  handleclick() {
    console.log(this.data);
  }


  onSearch(event:any){
    if(event.target.value.length>4){
      this.product.getProductDataSearch({'searchValue':event.target.value}).subscribe((data:any)=>{
        console.log(data)
        if(data.result==null){
          this.productData=[]
        }else{
          this.productData=data.result.slice()  
        }
        this.data1=this.productData.slice()
        this.data2=this.data1.slice()
        })
    }
    else{
      console.log('edrtyertertye');
    }
  }

  fetchMore(event: any) {
    if (event.endIndex === this.data1.length - 1) {
      console.log(this.data1.length);
      let limit=this.data1.length+100;
      this.product.getAllProductLimit({'lim':limit}).subscribe((data:any)=>{
        console.log(data)
        this.productData=data.result.slice()  
        this.data1=this.productData.slice()
        this.data2=this.data1.slice()
        })
    }
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
      this.totalAmount+=Number(dt.amount)
      this.totalQuantity+=Number(dt.quantity)
      return dt
    })
  }




  formInit(){
    this.quoteForm=this.qtFm.group({
      quote_id:this.quoteId,
      quote_owner:['',Validators.required],
      quote_owner_id:this.userId,
      account_id:'',
      contact_id:'',
      quote_title:['',Validators.required],
      quote_type:['',Validators.required],
      quote_source:['',Validators.required],
      referral:'',
      // industry:['',Validators.required],
      estimated_value:'',
      quote_status:['',Validators.required],
      quote_location:['',Validators.required],
      quote_location_id:[''],
      remark:'',
      product_services:'',
      note:'',
      attachments:'',
      open_activity:'',
      close_activity:'',
      inco_terms:'',
      payment_terms:'',
      p_f:'',
      p_t:'',
      freight:'',
      taxes:'',
      other_charges:'',
      deal_validity:'',
      delivery:'',
      warrenty:'',
      created_by:'',
      contact:['',Validators.required],
      account:['',Validators.required],
      edit_status:true,
      sales_person:'',
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
      this.productForm.value.id=Math.floor(Math.random()*(100000 - 10000) + 10000);
      this.product.AddProduct(this.productForm.value).subscribe((data:any)=>{
        this.buttondisabled="false";
       
      console.log(data)
      if(data.status==200){
        this.isValidFormSubmitted = true;
        this.toast.showSuccess(data.message)
        
        this.data.push(data.result)
        this.totalAmount=0
        this.totalQuantity=0
        this.data=this.data.filter((dt:any)=>{
          console.log(Number(dt.amount));
          
          this.totalAmount+=parseInt(dt.amount)
          this.totalQuantity+=Number(dt.quantity)
          return dt
        })
        
      }else if(data.status==200){
    
        this.toast.showError(data.message)
        
      }
      
    })
  }
} 
formmodelInit(){
  this.productForm=this.qtFm.group({
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
    type:'Product',
    parent:"",
    quantity:"",
    amount:'',
    products:[]
  })
  
}
decimalFormat(num:any){
  // return num.toFixed(2)
}

}
