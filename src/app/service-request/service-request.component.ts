import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectTreeCheckableSettings } from '@progress/kendo-angular-dropdowns';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { TosterService } from '../service/toster.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {

  public checkableSettings: MultiSelectTreeCheckableSettings = {
   
  };
  saveas: any = true;
  saveasnew: any = true;
  serviceForm!:FormGroup
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

 constructor(private auth:AuthService,
    private user:UserService,
    private form: FormBuilder,
    private Toaster: TosterService,
    private Route: Router,
    private account:AccountService,
    
    ) {


}

  ngOnInit(): void {  
    this.auth.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.currentUser=user.result.username
      this.userId=user.result._id 
    })

    let number = Math.random() // 0.9394456857981651
number.toString(36); // '0.xtis06h6'
var id = number.toString(36).substr(2, 9);
this.serviceId=id.toUpperCase()


this.account.getAllAccount().subscribe((data:any)=>{
  this.accountData=data
  console.log(data)
})
    this.forminit(this.serviceId);
  }

   handleAddservice(){
    this.addservice.push({value:null})
   }

   handleBlurservice(e:any,index:any){
    this.addservice[index].value=e.target.value
   }

   handleDeleteservice(index:any){
    this.addservice.splice(index,1)
   }

   forminit(uni: any) {
    this.serviceForm = this.form.group({
      serice_id:[uni, ''],
      serice_type:'',
      serice_location:'',
      priority:'',
      source_type:'',
      company:'',
      account:'',
      account_info:'',
      person_name:'',
      assign_to:'',
      visit_schedule:'',
      attachments:'',
      states:'',
      remark:''
      
    });
  }
  saveform(svalue: any) {
    if (this.serviceForm.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.serviceForm.invalid) {
      console.log(this.serviceForm,'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.Toaster.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.serviceForm,'true');
     
      // this.serviceForm
        // .submitForm(this.serviceForm.value)
        // .subscribe((resdata: any) => {
        //   console.log(resdata);
        //   this.Toaster.showSuccess(
        //     'Congratulation!, Customer has been created.'
        //   );
          if ( this.saveas =='save') {
            console.log(this.saveas);
            setTimeout(() => {
              this.Route.navigate(['/view-customer']);
            }, 5000);
          }
          else {
            console.log(this.saveas);
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
        // });
    }
  }
}
