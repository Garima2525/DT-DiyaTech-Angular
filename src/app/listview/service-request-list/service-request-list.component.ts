import { Component, OnInit,ViewChild } from '@angular/core';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { ServiceRequestService } from 'src/app/service/service-request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css']
})
export class ServiceRequestListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(
    private router: Router,
    private ServiceRequestService: ServiceRequestService 
  ) {}

  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getallservice();
  }
  getallservice() {
    this.ServiceRequestService.getallservice().subscribe((data: any) => {
      this.gridData = data.result;
      this.gridView = data.result;
      console.log(data);
    });
  }



  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "service_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "service_type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "service_location",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "priority",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "account",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "account_info",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "assign_to",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "visit_schedule",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "states",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
