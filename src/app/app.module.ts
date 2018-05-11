import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { HomeComponent } from './home/home.component';
import { PaymentTransactionComponent } from './payment-transaction/payment-transaction.component';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewBenificiariesComponent } from './view-benificiaries/view-benificiaries.component';

const appRoutes : Routes = [
	{path:'home/:id', component:HomeComponent},
	{path:'createAccount/:id', component:CreateAccountComponent},
	{path:'addBene/:id', component:AddBeneficiaryComponent},
	{path:'fundTransfer/:id', component:FundTransferComponent},
	{path:'paymentTransaction/:id', component:PaymentTransactionComponent},
	{path:'login', component:LoginComponent},
	{path:'createCustomer', component:CreateCustomerComponent},
	{path:'viewBene/:id', component:ViewBenificiariesComponent},
	{path:'', redirectTo:'/login',pathMatch:'full'},
	{path:'**', redirectTo:'/login',pathMatch:'full'}
	
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    AddBeneficiaryComponent,
    FundTransferComponent,
    HomeComponent,
    PaymentTransactionComponent,
    CreateCustomerComponent,
    ViewBenificiariesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
/*	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true; 
*/}
