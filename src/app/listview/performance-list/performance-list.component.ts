import { Component, OnInit,ViewChild } from '@angular/core';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { PerformanceService } from 'src/app/service/performance.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.css']
})
export class PerformanceListComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(
    private router: Router,
    private PerformanceService: PerformanceService
  ) {}

  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getall();
  }
getall() {
    this.PerformanceService.getall().subscribe((data: any) => {
      this.gridData = data.result;
      this.gridView = data.result;
      console.log(data);
    });
  }
  public onFilter(e: any): void {
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'goal_id',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'industry',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'employee',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'goal_type',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'goal_name',
            operator: 'contains',
            value: inputValue,
          },

          {
            field: 'weightage',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'duration',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'cpcb_validity',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'spcb_registration',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'spcb_validity',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }



  
}
