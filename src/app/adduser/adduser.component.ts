import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { TosterService } from '../service/toster.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;
  userform!: FormGroup;
  public mySelection: string[] = [];
  isValidFormSubmitted: any;
  isPasswordSame: any;
  buttondisabled: any=true;
  roledata:any;
  user:any
  userPermission:any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private users: AuthService,
    private userservice: UserService,
    private toast :TosterService
  ) {}

  ngOnInit(): void {


    this.users.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.user=user.result
      this.userservice.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })


    this.userservice.getAllrole().subscribe((roledata:any)=>{
      this.roledata=roledata.result;
    })
    this.getQuotes();
    this.initform();
  }

  initform() {
    this.userform = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
        phone: ['', [Validators.required]],
        designation: ['', Validators.required],
        password: ['', Validators.compose([Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\W]{8,63}$")])],
        
        cpassword: ['', Validators.compose([Validators.required])],
        role: ['', Validators.required],
        dt_users: ['', Validators.required],
      },
      { validator: this.checkPassword('password', 'cpassword') }
    );
  }

  get f() {
    return this.userform.controls;
  }
  onsubmit() {
    if (this.userform.invalid) {
      console.log(this.userform, 'error');
      this.isValidFormSubmitted = true;
    } else {
      console.log(this.userform, 'true');
      this.userservice.createUser(this.userform.value).subscribe((data:any)=>{
        this.buttondisabled="false";
        console.log(data)
        if(data.status==200){
          this.toast.showSuccess(data.message)
          this.getQuotes()
          document.getElementById('closemodal')?.click()
        }else if(data.status===500){
          this.toast.showError(data.message)
        }
        // setTimeout(()=>{
        // },1000)
      })
    }
  }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      } else {
        matchingControl.setErrors(null);
        this.isPasswordSame = matchingControl.status == 'VALID' ? true : false;
      }
    };
  }

  getQuotes() {
    console.log('get quotes');
    this.userservice.getAllUsers().subscribe((data: any) => {
      this.gridData = data.result;
      this.gridView = data.result;
      console.log(data.result);
    });
  }

  handleEdit(id: any) {
    console.log('edit clicked ' + id);
    this.router.navigateByUrl('/edit-quote', { state: { id } });
  }



  public onFilter(e: any): void {
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'username',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'email',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'mobile',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'role',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'created_at',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

}
