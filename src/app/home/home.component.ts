import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Customerloginform} from '../customerloginform';
import {Accountform} from '../accountform';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }
  
  model = new Customerloginform('','','','','','','','','');
  ngmodel = new Accountform('','','','','','');
  requestUrl:string;
  found:boolean;
  currentTimestamp:any;
  customerId:string;
  ngOnInit() {
	  this.requestUrl = "https://customerhost.cfapps.io";
	  this.currentTimestamp = new Date();
	  this.route.params.subscribe(translatedValue => { 
	  this.model.customerId = translatedValue.id;
	});
	  
     let Params = new HttpParams().set('customerId', this.model.customerId);
     this.httpClient.get(this.requestUrl.concat('/customer/customerdetails'),{params:Params})
	   .subscribe(
			  (data:any) =>{
				  if(data.status.valueOf() == 'FAIL'){
					  this.found = false;
					  this.router.navigate(['/login',this.customerId]);
				 }
				  else if(data.status.valueOf() == 'SUCCESS'){
					  this.found = true;
					  this.model = data.customer;
					  this.customerId = data.customer.id;
					  this.ngmodel = data.account;
				  }
			  },
			  (data:any[]) =>{
				  console.log("this is error");
				  this.router.navigate(['/home',this.customerId]);
			  }
		   )
  }

  routefundTransfer(){
	  this.router.navigate(['/fundTransfer',this.customerId]);
  }
  routepaymentTransaction(){
	  this.router.navigate(['/paymentTransaction',this.customerId]);
  }
  routeToaddBene(){
	  this.router.navigate(['/addBene',this.customerId]);
  }
  routeToviewBene(){
	  this.router.navigate(['/viewBene',this.customerId]);
  }
  routeTologin(){
	  this.router.navigate(['/login']);
  }
}
