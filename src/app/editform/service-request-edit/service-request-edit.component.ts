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
  todayDate:any;
  selectedProduct: any = [];
  showDropdownData:any=[]
  showDropdownBox:boolean=false
  totalAmount:any=0
  totalQuantity:any=0
  salesPersonData:any
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
  
 
  
  dropdownList:any=[]
  selectedItems: any = [];
  selectedUser:any
  dropdownSettings = {};
  contactDropdownSettings={}
  productDropdownSettings={}
  ownerDropdownSettings={}
  salesPersonDropdownSettings={}
  s_id:any;
  contact_id:any
  contact_name:any
  contact_role:any
  contact_phone:any
  contact_mobile:any
  contact_email:any
  accountVal: any;
  account_info_val: any;
  service_type:any;
  sId:any;
  accountd:any;
  account_info:any;
  selectedItemtt : any = [];
  add_serviced:any;
  sdata:any;
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
    private _Activatedroute: ActivatedRoute,) {}

     

  ngOnInit(): void {
    this.todayDate = new Date();
    
    this.sId=  this._Activatedroute.snapshot.paramMap.get('id');
    this.auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.userId = logindata.result._id;
   
});
    this.account.getAllAccount().subscribe((data:any)=>{
      this.accountData=data
      console.log(data)
    })

    this.user.getAllUsers().subscribe((data:any)=>{
      console.log(data)
      this.users=data.result
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

   
    this.ownerDropdownSettings={
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText:'No User Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: false
    }
    this.serviceS.getservicebyid(this.sId).subscribe((data: any) => {
      console.log(data.result[0]);
    this.forminit(data.result[0]);
    this.s_id = data.result[0].service_id;

    this.addservice = data.result[0].add_service;
    // console.log(this.addservice);
    this.accountd=data.result[0].account;
    this.service_type=data.result[0].service_type;
    console.log(this.accountd)


   
  });
}

  handleAddservice(){
    this.addservice.push({value:null})
   }
  handleBlurservice(e:any,index:any){
    this.addservice[index].value=e.target.value
    console.log(e.target.value,index)
    console.log(this.addservice)
  }

  handleDeleteservice(index:any){
   this.incoTerm.splice(index,1)
  }

  handleAttachmentUpload(e:any){
    let date=new Date()
    this.attachment_files=e.target.files
      
    for(let file of e.target.files){
       this.upload.uploadFiles(file,this.sId).subscribe((url:any)=>{
        let img_url=url.url
         this.files_url.push({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.sId})
         console.log({img_url,name:file.name,size:file.size,attached_by:this.currentUser,upload_date:date,lead_id:this.sId})
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

  public sort: SortDescriptor[] = [];

 



  forminit(Sdata:any) {
    this.ServiceForm = this.fb.group({ 
      service_id:Sdata.service_id,
      service_type:Sdata.service_type,
     
      service_location:Sdata.service_location,
      priority:Sdata.priority,
      
      source_type:Sdata.source_type,
      account:Sdata.account,
      account_info:Sdata.account_info,
      add_service:Sdata.add_service,
      person_name:Sdata.person_name,
      assign_to:Sdata.assign_to,
      visit_schedule:Sdata.visit_schedule,
      attachments:'',
      stages:Sdata.stages,
      remark:Sdata.remark
    });
}

saveform(svalue: any) {
    if (this.ServiceForm.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }

  removeAttachment(index:any){
    console.log(index)
    this.files_url.splice(index,1)
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
      this.ServiceForm.value.add_service=this.addservice.filter((term:any)=>(term.value!=null) || (term.value!=undefined))
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