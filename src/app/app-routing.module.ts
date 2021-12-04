import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateLeadComponent} from './create-lead/create-lead.component'
import {CreateDealComponent} from './create-deal/create-deal.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';

import { AccountComponentList } from './listview/account/account.component';
import { CompanyComponent } from './company/company.component';
import { ContactComponent } from './contact/contact.component';

import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './editform/account-edit/account-edit.component';
import { ContactComponentList } from './listview/contact/contact.component';
import { ContactEditComponent } from './editform/contact-edit/contact-edit.component';
import { QuoteEditComponent } from './editform/quote-edit/quote-edit.component';
import { LeadEditComponent } from './editform/lead-edit/lead-edit.component';
import { LeadListComponent } from './listview/lead-list/lead-list.component';
import { QuoteListComponent } from './listview/quote-list/quote-list.component';
import { DealListviewComponent } from './listview/deal-listview/deal-listview.component';
import { DealEditComponent } from './editform/deal-edit/deal-edit.component';
import {AdduserComponent} from './adduser/adduser.component'
import { AddrolepermissionComponent } from './addrolepermission/addrolepermission.component';
import { SendquoteComponent } from './sendquote/sendquote.component';
import { SenddealComponent } from './senddeal/senddeal.component';
import { RoleListComponent } from './listview/role-list/role-list.component';
import { ProductsComponent } from './products/products.component';
import { LeadViewComponent } from './datatable-view/lead-view/lead-view.component';
import { DealViewComponent } from './datatable-view/deal-view/deal-view.component';
import { QuoteViewComponent } from './datatable-view/quote-view/quote-view.component';
import { ProductsListComponent } from './listview/products-list/products-list.component';
import { NewProductsListComponent } from './listview/new-products-list/new-products-list.component';
import { NewGroupListComponent } from './listview/new-group-list/new-group-list.component';
import {ServiceRequestComponent} from './service-request/service-request.component'

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:DashboardComponent},

  {path:'lead',component:LeadListComponent},
  {path:'create-lead',component:CreateLeadComponent},
  {path:'edit-lead/:id',component:LeadEditComponent},
  

  {path:'quote',component:QuoteListComponent},
  {path:'create-quote',component:CreateQuoteComponent},
  {path:'edit-quote/:id',component:QuoteEditComponent},

  {path:'deal',component:DealListviewComponent},
  {path:'create-deal',component:CreateDealComponent},
  {path:'edit-deal/:id',component:DealEditComponent},
  
  {path:'account',component:AccountComponentList},
  {path:'create-account',component:AccountComponent},
  {path:'edit-account/:id',component:AccountEditComponent},

  {path:'contact',component:ContactComponentList},
  {path:'create-contact',component:ContactComponent},
  {path:'edit-contact/:id',component:ContactEditComponent},

  {path:'company',component:CompanyComponent},
  {path:'add-user',component:AdduserComponent},
  {path:'role-permission',component:AddrolepermissionComponent},
  {path:'view-quote/:id',component:SendquoteComponent},
  {path:'view-deal/:id',component:SenddealComponent},
  {path:'role-list',component:RoleListComponent},
  
  {path:'add-products',component:ProductsComponent},
  {path:'products-list',component:ProductsListComponent},
  {path:'new-products',component:NewProductsListComponent},
  {path:'new-groups',component:NewGroupListComponent},

  {path:'lead-view',component:LeadViewComponent},
  {path:'t-deal',component:DealViewComponent},
  {path:'t-quote',component:QuoteViewComponent},
  // {path:'demo',component:KendouiGridviewComponent}
  {path:'service-request',component:ServiceRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
