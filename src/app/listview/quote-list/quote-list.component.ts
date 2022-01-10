import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';

import { QuoteFormService } from 'src/app/service/quote-form.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;
  quoteData:any
  quote_id:any
  user:any
  currentUser:any
  userId:any
  time:any=100

  pending:any=[]
  verified:any=[]
  approved:any=[]

  userPermission:any
  totalAmount:any=0

  public mySelection: string[] = [];
  constructor(private router:Router,
              private quote:QuoteFormService,
              private auth:AuthService,
              private role:UserService,
              private account:AccountService,
              private contact:ContactService
             ) { }

  ngOnInit(): void {
    
    this.auth.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.user=user.result
      this.currentUser=user.result.username
      this.userId=user.result._id

      this.role.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })
    this.getQuotes()
  }



  handleVerify(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        let quote=this.gridData.filter((data:any)=>data._id===id)


        quote[0].verified_by=this.user
        quote[0].verified_date=new Date()
        quote[0].quote_status_approvel="verified"
        quote[0].verified=true
    
        console.log(quote[0])
    
        this.quote.submitForm(quote[0]).subscribe((data:any)=>{
          console.log(data)
          if(data.status===200){
            Swal.fire(
              'Verified!',
              'Your Quote is verified.',
              'success'
            )
          }else{
            Swal.fire(
              'Error!',
              'Something went wrong!',
              'error'
            )
          }
        })
      }
    })


  }

  handleApprove(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        let quote=this.gridData.filter((data:any)=>data._id===id)
        
        console.log(quote)
        if(!quote[0].verified){
          console.log("Quote Approved")
          quote[0].verified=true
          quote[0].verified_by=this.user
          quote[0].verified_date=new Date()
        }
        quote[0].approved_by=this.user
        quote[0].approval_date=new Date()
        quote[0].aprroved=true
        quote[0].quote_status_approvel="approved"
        console.log(quote)
    
        this.quote.submitForm(quote[0]).subscribe((data:any)=>{
          console.log(data)
          if(data.status===200){
            Swal.fire(
              'Approved!',
              'Your Quote is Approved.',
              'success'
            )
          }else{
            Swal.fire(
              'Error!',
              'Something went wrong!',
              'error'
            )
          }
        })
        
      }
    })
  }

  getQuotes(){
    console.log("get quotes")
    this.quote.getQuote().subscribe((resdata:any)=>{
      this.gridData=resdata.result
      let data=resdata.result
      console.log(resdata.result)
      

      resdata?.result?.map((dt:any,index:any)=>{
        this.totalAmount=0


        dt.product_services?.map((item:any)=>{
          this.totalAmount+=item.amount
        })

        // data[index].totalAmount=this.totalAmount.toFixed(2)

        let date=new Date(dt.created_date_time)
        data[index].approved_by=dt.approved_by && dt.approved_by!="undefined"?dt.approved_by[0]:{username:'NA'}
        data[index].verified_by=dt.verified_by && dt.approved_by!="undefined"?dt.verified_by[0]:{username:'NA'}
        data[index].created_date_time=date.toLocaleString("en-IN",{day:'numeric',month:'short',year:'numeric'})

        this.contact.getContactData(dt.contact_id).subscribe((cntdata:any)=>{
          console.log(cntdata,dt.contact_id,dt.quote_id)
          data[index].contact_name=cntdata[0].contact_name
          data[index].company_name=cntdata[0].company_name
        })
        if(dt.modified_date_time){
          let modify_date=new Date(dt?.modified_date_time)
        data[index].modified_date_time=modify_date.toLocaleString("en-IN",{day:'numeric',month:'short',year:'numeric'})
        }else{
          data[index].modified_date_time="NA"
        }
        let date2=new Date()

        var Difference_In_Time = date2.getTime() - date.getTime();
          
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        data[index]['aging']=Math.floor(Difference_In_Days)+" days"  

        // data[index].approved_by[0].username=data[index].approved_by[0]?.username.toUpperCase()
        // data[index].verified_by[0].username=data[index].verified_by[0]?.username.toUpperCase()

      })


      this.quoteData=resdata.result
     
      console.log("resdata",resdata,data)

      this.gridView = data.reverse();
      console.log("data",data)
    })
  }


  handleStatus(id:any){
    console.log(id)
  }

  handleCloneDeal(id:any){
    console.log(id)
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-quote',{state:{id}})
  }


  handleConvertDeal(id:any){
    console.log(id)
    console.log(this.quoteData.filter((item:any)=>item._id===id))
    
  }



  handleDelete(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quote.deleteQuote(id).subscribe((data:any)=>{
          if(data.status===200)
            Swal.fire(data.message, '', 'success')
          else if(data.status===500)
            Swal.fire(data.message, '', 'error')
            this.getQuotes()
        })
        
      }
    })
  }

    // Swal.fire({
    //   title: 'Are You Sure?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Delete',
    //   // denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
        
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })
  

  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "quote_owner",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_source",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_status",
            operator: "contains",
            value: inputValue,
          },
          {
            field:"created_date_time",
            operator: "contains",
            value: inputValue
          },
          {
            field:"aging",
            operator: "contains",
            value: inputValue
          },
          {
            field:"modified_date_time",
            operator: "contains",
            value: inputValue
          },
          {
            field:"quote_id",
            operator: "contains",
            value: inputValue
          },
          
          {
            field:"company_name",
            operator: "contains",
            value: inputValue
          },
          {
            field:"contact_name",
            operator: "contains",
            value: inputValue
          },
          
          {
            field:"quote_location",
            operator: "contains",
            value: inputValue
          },
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

}
