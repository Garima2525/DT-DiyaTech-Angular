import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { ContactService } from '../service/contact.service';
import { DealFormService } from '../service/deal-form.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-senddeal',
  templateUrl: './senddeal.component.html',
  styleUrls: ['./senddeal.component.css']
})
export class SenddealComponent implements OnInit {
  quote_id:any
  quoteData:any
  validDate:any
  quoteDate:any
  contactData:any
  companyData:any
  branchData:any
  totalAmount:any=0
  quantity:any=0
  salesPersonData:any
  totalAmountTax: any = 0;
  totalGST: any=0;


  constructor( private _Activatedroute:ActivatedRoute,
    private deal:DealFormService,
    private account:AccountService,
    private contact:ContactService,
    private company:CompanyService,
    private salesperson:ProductService) { }

  ngOnInit(): void {
    this.quote_id= this._Activatedroute.snapshot.paramMap.get("id")
    console.log(this._Activatedroute.snapshot.paramMap.get("id"))
    let qtdate=new Date()
    this.quoteDate=qtdate.toLocaleString('en-IN',{day:'numeric',month:"short",year:'numeric'})
    console.log("fjbsjkvbksb")
    this.deal.getDealData(this._Activatedroute.snapshot.paramMap.get("id")).subscribe((data:any)=>{
      console.log(data)
      this.quoteData=data[0]
      let date=this.addDays(data[0].created_date_time,Number(data[0].deal_validity.split(" ")[0]))
      this.validDate=date?.toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric'})
      this.quoteData.product_services.map((item:any)=>{
        this.totalAmount+=item.amount
        this.totalGST+=item.amount*(parseFloat(item.GST)/100)
        this.totalAmountTax+=(item.UnitPrice)*100/(100+parseFloat(item.GST));
        // this.totalAmountTax+=((item.UnitPrice*100)/(100+parseFloat(item.GST)));
        this.quantity+=item.quantity
        this.totalAmountTax+=item.UnitPrice
      })
      
      this.account.getAccountData(data[0].account_id).subscribe((data:any)=>{
        console.log(data ,"account")
        this.companyData=data[0]
      })

      this.contact.getContactData(data[0].contact_id).subscribe((data:any)=>{
        console.log(data)
        this.contactData=data[0]
      })
      console.log(data[0].deal_location)
      this.company.getBranch(data[0].deal_location[0]._id).subscribe((data:any)=>{
        console.log(data)
        this.branchData=data?.result[0]
      })

      
      this.salesperson.getSalesPerson(data[0]?.sales_person[0]?._id).subscribe((data:any)=>{
        console.log(data)
        this.salesPersonData=data.result[0]
      })


    })
  }

  decimalFormat(num:any){
    return num.toFixed(2)
  }
  
   addDays(date:any, days:any) {
     if(days){

       var result = new Date(date);
       result.setDate(result.getDate() + days);
       return result;
      }
      return null
  }

}
