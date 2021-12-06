import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TosterService } from '../service/toster.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {


  login_id: any;
  performanceId:any;
  Perform!: FormGroup;
  saveas: any = true;
  isValidbutton: any;
  isValidFormSubmitted: any;
  constructor(
    private form: FormBuilder,
    private Toaster: TosterService,
    private Route: Router,
    private Auth:AuthService
  ) { }



  ngOnInit(): void {
    
    this.Auth.userLoggedIn().subscribe((logindata:any)=>{
      console.log(logindata);
      this.login_id=logindata.result._id
    })

    let number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = number.toString(36).substr(2, 9);
    this.performanceId=id.toUpperCase()
    this.forminit(this.performanceId);
  }

  forminit(uni: any) {
    this.Perform = this.form.group({
      goal_id: [uni],
      industry:'',
      employee:'',
      goal_type:'',
      goal_name:'',
      weightage:'',
      duration:'',
      target_goal:'',
      lead_quantity:'',
      lead_value:'',
      quote_quantity:'',
      quote_value:'',
      deal_quantity:'',
      deal_value:'',
      
  })
}
saveform(svalue: any) {
  if (this.Perform.invalid) {
    this.saveas = true;
  } else {
    this.saveas = svalue;
  }
}

onFormSubmit() {
  this.isValidFormSubmitted = false;
  if (this.Perform.invalid) {
    console.log(this.Perform, 'error');
    this.isValidFormSubmitted = true;
    this.isValidbutton = false;
    this.Toaster.showError('Sorry!, Fields are mandatory.');
  } else {
    console.log(this.Perform, 'true');
    this.isValidbutton = true;
    this.Perform.value.user_id = this.login_id;
    
    // this.serviceS.submitForm(this.ServiceForm.value).subscribe((data) => {
      // console.log(data);
      // this.Toaster.showSuccess(
      //   'Congratulation!'
      // );
      // if (this.saveas == 'save') {
        console.log(this.saveas);
        setTimeout(() => {
         
        }, 5000);
    //   } else {
    //     console.log(this.saveas);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 5000);
    //   }
    // });
  }
}
}
