import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

import {
  AdminDashboardComponent,
  AdminUserComponent,
  AdminUserFormComponent,
  DecorationItemsFormComponent,
  DecorationItemsComponent,
  EmployeeComponent,
  EmployeeFormComponent,
  ClientsComponent,
  ClientsFormComponent,
  AdminComponent,
  ChallanComponent,
  InvoiceComponent,
  ChallanPrintComponent,
  ChallanViewComponent,
  InvoiceViewComponent,
  InvoicePrintComponent,
  GalleryImagesComponent,
  GalleryImagesFormComponent,
  TransactionComponent,
  TransactionViewComponent
} from './admin';
import { SpinnerComponent } from './_shared';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: 'transaction', component: TransactionComponent },
      { path: 'transaction/view', component: TransactionViewComponent },
      { path: 'challan', component: ChallanComponent },
      { path: 'challan/view', component: ChallanViewComponent },
      { path: 'challan/print/:id', component: ChallanPrintComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'invoice/view', component: InvoiceViewComponent },
      { path: 'invoice/print/:id', component: InvoicePrintComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user', component: AdminUserComponent },
      { path: 'user/form', component: AdminUserFormComponent },
      { path: 'user/form/:id', component: AdminUserFormComponent },
      { path: 'decoration/item', component: DecorationItemsComponent },
      { path: 'decoration/item/form', component: DecorationItemsFormComponent },
      { path: 'decoration/item/form/:id', component: DecorationItemsFormComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'employee/form', component: EmployeeFormComponent },
      { path: 'employee/form/:id', component: EmployeeFormComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/form', component: ClientsFormComponent },
      { path: 'clients/form/:id', component: ClientsFormComponent },
      { path: 'gallery/images', component: GalleryImagesComponent },
      { path: 'gallery/images/form', component: GalleryImagesFormComponent },
      { path: 'gallery/images/form/:id', component: GalleryImagesFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const declarations = [
  AppComponent,
  LoginComponent,
  RegisterComponent,
  FooterComponent,
  NavbarComponent,
  HomeComponent,
  AdminDashboardComponent,
  AdminUserComponent,
  AdminUserFormComponent,
  SpinnerComponent,
  DecorationItemsFormComponent,
  DecorationItemsComponent,
  EmployeeComponent,
  EmployeeFormComponent,
  ClientsComponent,
  ClientsFormComponent,
  AdminComponent,
  ChallanComponent,
  InvoiceComponent,
  InvoiceViewComponent,
  ChallanPrintComponent,
  ChallanViewComponent,
  InvoicePrintComponent,
  GalleryImagesComponent,
  GalleryImagesFormComponent,
  TransactionComponent,
  TransactionViewComponent
];
