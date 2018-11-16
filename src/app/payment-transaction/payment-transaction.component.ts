import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {ViewPaymentform} from '../viewPayment';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router'

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.component.html',
  styleUrls: ['./payment-transaction.component.css']
})

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [],
  bootstrap: []
})

export class PaymentTransactionComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }
  requestUrl:string;
  customerId:string;
  found :boolean;
  paymentList:ViewPaymentform[];
  
  ngOnInit() {
	  this.requestUrl = "https://paymenthost.cfapps.io";
	  this.route.params.subscribe(translatedValue => { 
		  this.customerId = translatedValue.id;
			});
	  
	  let Params = new HttpParams().set('customerId', this.customerId);
	  this.httpClient.get( this.requestUrl+'/payment/customer',{params:Params})
		   .subscribe(
				  (data:any) =>{
					  if(data.status.valueOf() == 'FAIL'){
						  this.found = false;
						  this.router.navigate(['/login']);
					 }
					  else if(data.status.valueOf() == 'SUCCESS'){
						  this.found = true;
						  this.paymentList = data.paymentList;
					  }
				  },
				  (data:any[]) =>{
					  console.log("this is error");
					  this.router.navigate(['/home',this.customerId]);
				  }
			   )
			   
  }

  routeToHome(){
	  this.router.navigate(['/home',this.customerId])
  }
  
}
