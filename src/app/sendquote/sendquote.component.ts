import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../service/account.service';
import { CompanyService } from '../service/company.service';
import { ContactService } from '../service/contact.service';
import { ProductService } from '../service/product.service';
import { QuoteFormService } from '../service/quote-form.service';

@Component({
  selector: 'app-sendquote',
  templateUrl: './sendquote.component.html',
  styleUrls: ['./sendquote.component.css']
})
export class SendquoteComponent implements OnInit {
  quote_id:any
  quoteData:any
  validDate:any
  quoteDate:any
  contactData:any
  salesPersonData:any
  companyData:any
  branchData:any
  totalAmount:any=0
  quantity:any=0
  totalAmountTax: any=0;
  totalAmount1: any=0;
  totalGST:any=0;

  constructor( private _Activatedroute:ActivatedRoute,
    private quote:QuoteFormService,
    private account:AccountService,
    private contact:ContactService,
    private company:CompanyService,
    private titleService: Title,
    private salesperson:ProductService) { }

    public setTitle() {
      this.titleService.setTitle("omshakti");
    }

  ngOnInit(): void {
    this.quote_id= this._Activatedroute.snapshot.paramMap.get("id")
    console.log(this._Activatedroute.snapshot.paramMap.get("id"))
    let qtdate=new Date()
    this.quoteDate=qtdate.toLocaleString('en-IN',{day:'numeric',month:"short",year:'numeric'})

    this.quote.getQuoteById(this._Activatedroute.snapshot.paramMap.get("id")).subscribe((data:any)=>{
      console.log(data.result[0])
      this.quoteData=data.result[0]
      let date=this.addDays(data.result[0].created_date_time,Number(data.result[0].deal_validity.split(" ")[0]))
      this.validDate=date?.toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric'})
      this.quoteData.product_services.map((item:any)=>{
        this.totalAmount+=item.amount
        this.totalGST+=item.amount*(parseFloat(item.GST)/100)
        this.totalAmountTax+=(item.UnitPrice)*100/(100+parseFloat(item.GST));
        // this.totalAmountTax+=((item.UnitPrice*100)/(100+parseFloat(item.GST)));
        this.quantity+=parseInt(item.quantity);
        console.log((item.UnitPrice)*100/118);
        
      })
      
      this.account.getAccountData(data.result[0].account_id).subscribe((data:any)=>{
        console.log(data)
        this.companyData=data[0]
      })

      this.contact.getContactData(data.result[0].contact_id).subscribe((data:any)=>{
        console.log(data)
        this.contactData=data[0]
      })


      this.salesperson.getSalesPerson(data.result[0]?.sales_person[0]?._id).subscribe((data:any)=>{
        console.log(data)
        this.salesPersonData=data.result[0]
      })

      console.log(data.result[0].quote_location_id)
      this.company.getBranch(data.result[0].quote_location[0]._id).subscribe((data:any)=>{
        console.log(data)
        this.branchData=data?.result[0]
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
