import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router'
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {FundTransferform} from '../fundTransferform'

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }
  
  requestUrl:string;
  customerId:string;
  accountNumber:string;
  debitIfsc:string;
  found:boolean;
  drAccountNumber:string;
  crAccountNumber:string;
  drIfscCode:string;
  amount:string;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  model = new FundTransferform('','','','','','','','','');
  
  ngOnInit() {
	  this.requestUrl = "https://paymenthost.cfapps.io";
	  this.route.params.subscribe(translatedValue => { 
	  this.customerId = translatedValue.id;
	  });
	  this.model.customerId =  this.customerId;

	  
	  let Params = new HttpParams().set('customerId', this.customerId);
	     this.httpClient.get('https://customerhost.cfapps.io/customer/customerdetails',{params:Params})
		   .subscribe(
				  (data:any) =>{
					  if(data.status && data.status.valueOf() == 'FAIL'){
						  this.found = false;
						  this.router.navigate(['/login']);
					 }
					  else if(data.status && data.status.valueOf() == 'SUCCESS'){
						  this.found = true;
						  this.customerId = data.customer.id;
						  this.model.fromAccount = JSON.stringify(data.account.accountNumber);
						  this.model.drifscCode = data.account.ifscCode;
					  }
				  },
				  (data:any[]) =>{
					  console.log("this is error");
					  this.router.navigate(['/home',this.customerId ]);
				  }
			   )
  }

  submitFund(){

	   this.httpClient.post( this.requestUrl.concat('/payment/transfer'),this.model,{headers: this.headers})
	   .subscribe(
			  (data:any) =>{
				  if(data.status == 'SUCCESS'){
					  this.found = true;
					  this.router.navigate(['/home',this.customerId])
				  }
				  else if(data.status == 'FAIL'){
					  this.found = false;
				  }
			  },
			  (data:any) =>{
				  console.log('this is error')
				  if(data){
					  this.router.navigate(['/home',this.customerId])
				  }
			  }
			   )
  }
  
  cancelFund(){
	  this.router.navigate(['/home',this.customerId])
  }
}
