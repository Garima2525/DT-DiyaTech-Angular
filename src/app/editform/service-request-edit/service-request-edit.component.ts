import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { CompanyService } from 'src/app/service/company.service';
import { ContactService } from 'src/app/service/contact.service';

import { ProductService } from 'src/app/service/product.service';

import { TosterService } from 'src/app/service/toster.service';
import { UploadAttachmentService } from 'src/app/service/upload-attachment.service';
import { UserService } from 'src/app/service/user.service';

import { SortDescriptor } from '@progress/kendo-data-query';
import { MultiSelectTreeCheckableSettings, MultiSelectTreeHierarchyBindingDirective } from "@progress/kendo-angular-dropdowns";
import { Product } from 'src/productInterface'
import { ServiceRequestService } from 'src/app/service/service-request.service';

import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-service-request-edit',
  templateUrl: './service-request-edit.component.html',
  styleUrls: ['./service-request-edit.component.css']
})
export class ServiceRequestEditComponent implements OnInit {

  @ViewChild('multiselecttree', { static: true }) 
  public multiselecttree: any;
  public checkableSettings: MultiSelectTreeCheckableSettings = {
    checkChildren: true,
    checkOnClick: false,
  };




  saveas: any = true;
  saveasnew: any = true;
  ServiceForm!:FormGroup
  serviceId:any
  userId:any
  currentUser:any
  attachment_files:any=[]
  show_files:any=[]
  files_url:any=[]
  isValidFormSubmitted: any;
  isValidbutton: any;
  incoTerm:any=[{value:null}]
  addservice:any=[{value:null}]
  accountData:any;
  s_id:any;
  s_type:any;
  s_location:any;
  priority:any;
  public data:any=[];
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






  productForm!:FormGroup;


 
  contactData:any
  contactTempData:any=''
  loggedInUser:any
  leadOwner:any
  leadOwnerId:any
  selectedCompany:any={}

  users:any
 
  lead_id:any
  location:any
 
  isValidPrdFormSubmitted:any=false
  branchData:any
  productData:any
  productVal:any=[]
  selectedItem:any=[]
  showbtn:boolean=false
  selectedDataForMerge:any=[]
  currentPrice:any
  mergedProducts:any
  MergedProductsName:any=""
  quoteLocation:any
  quoteLocationId:any

  ShowFilter = true;
  limitSelection = false;
  dropdownList:any=[]
  selectedItems: any = [];
  selectedUser:any
  dropdownSettings = {};
  contactDropdownSettings={}
  productDropdownSettings={}
  ownerDropdownSettings={}

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
  accountVal: any;
  account_info_val: any;
  add_service:any;
  sId:any;
  p_name:any;
  assign_to:any;
  stages:any;
  adds:any;
  v_schedule:any;
  constructor( 
    private fb:FormBuilder,
  
    private Toaster:TosterService,
    private router:Router,
    private Route: Router,
    private auth:AuthService,
    private account:AccountService,
    private contact:ContactService,
    private upload:UploadAttachmentService,
    private serviceS: ServiceRequestService,
    private company:CompanyService,
    private product:ProductService,
    private user:UserService,
    private _Activatedroute:ActivatedRoute
    ) { 

      this.product.getAllProduct().subscribe((data:any)=>{
        console.log(data)
        this.productData=data.result.slice()  
        this.data1=this.productData.slice()
       
        this.data2=this.data1.slice()
        })
      
  
   }

  ngOnInit(): void {
    this.sId =  this._Activatedroute.snapshot.paramMap.get('id');
    // this.auth.userLoggedIn().subscribe((user:any)=>{
    //   console.log(user)
    //   this.currentUser=user.result.username
    //   this.userId=user.result._id 
    // })
    this.auth.userLoggedIn().subscribe((logindata:any)=>{
      console.log(logindata);
      this.userId=logindata.result._id
    })

    this.account.getAllAccount().subscribe((data:any)=>{
      this.accountData=data
      console.log(data)
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

    this.ownerDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No User Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }

    // this.forminit(this.serviceId);
    this.serviceS.getservicebyid(this.sId).subscribe((data: any) => {
      console.log(data.result[0]);

    this.forminit(data.result[0]);
    this.s_id = data.result[0].service_id;
     this.s_type=data.result[0].service_type
     this.s_location=data.result[0].service_location;
    this.priority=data.result[0].priority
     this.p_name=data.result[0].person_name;
     this.assign_to=data.result[0].assign_to
     this.stages=data.result[0].stages
     this.v_schedule=data.result[0].visit_schedule;
     this.adds = data.result[0].add_service;
      console.log(this.adds);
      // this.materialInfo = data.result[0].materials;
      // console.log(this.materialInfo);
    });
  }

  handleAddservice(){
    this.addservice.push({value:null})
   }

   handleBlurservice(e:any,index:any){
    this.addservice[index].value=e.target.value
    console.log( this.addservice);
   }

   handleDeleteservice(index:any){
    this.addservice.splice(index,1)
   }

  optionClick(index:any){
    console.log(index)
  }

  removeAttachment(index:any){
    console.log(index)
    this.files_url.splice(index,1)
  }

  handleUpload(e:any){
    let date=new Date()
    // console.log(e.target.files)
    this.attachment_files=e.target.files
      
    for(let file of e.target.files){
       this.upload.uploadFiles(file,this.lead_id).subscribe((url:any)=>{
        let img_url=url.url
         this.files_url.push({img_url,name:file.name,size:file.size,attached_by:this.loggedInUser,upload_date:date,lead_id:this.lead_id})
         console.log({img_url,name:file.name,size:file.size,attached_by:this.loggedInUser,upload_date:date,lead_id:this.lead_id})
       })
     }

    for(let file of e.target.files)
        this.show_files.push({
          name:file.name,
          size:file.size,
          attached_by:this.loggedInUser,
          upload_date:date
        })
}


  onContactSelect(contact:any){
    console.log(contact)

    let filter_contact = this.contactData.filter((cntc:any)=>cntc.contact_id===contact.contact_id)
    console.log(filter_contact[0])
    this.account_info_val=filter_contact[0]._id
   
  }


onItemSelect(item: any) {
    console.log('onItemSelect', item);
    let contacts=this.contactData.filter((contact:any)=>contact.account_id===item.account_id)
    console.log(contacts)
    this.contactTempData=contacts
    let filtered_company= this.accountData.filter((acc:any)=>acc.account_id===item.account_id)
    console.log(filtered_company)
    this.accountVal=contacts[0]._id
   
  }

  public sort: SortDescriptor[] = [
    
  ];

 

forminit(uni: any) {
    this.ServiceForm = this.fb.group({
      service_id:uni.service_id,
      service_type:uni.service_type,
      service_location:uni.service_location,
      priority:uni.priority,
      source_type:uni.source_type,
      company:uni.company,
      account:uni.account,
      account_info:uni.account_info,
      add_service:uni.add_service,
      person_name:uni.person_name,
      assign_to:uni.assign_to,
      visit_schedule:uni.visit_schedule,
      attachments:[],
      stages:uni.stages,
      remark:uni.remark
      
    });
  }
  saveform(svalue: any) {
    if (this.ServiceForm.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.ServiceForm.invalid) {
      console.log(this.ServiceForm, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.Toaster.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.ServiceForm, 'true');
      this.isValidbutton = true;
      this.ServiceForm.value.user_id = this.userId;
      this.ServiceForm.value.attachments=this.files_url
      this.ServiceForm.value.account=this.accountVal
      this.ServiceForm.value.account_info=this.account_info_val
      this.ServiceForm.value.add_service = this.addservice;
      this.serviceS.updateForm(this.ServiceForm.value,this.sId).subscribe((data) => {
        console.log(data);
        this.Toaster.showSuccess(
          'Congratulation!, Service has been created.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.Route.navigate(['/service-request-list']);
          }, 5000);
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