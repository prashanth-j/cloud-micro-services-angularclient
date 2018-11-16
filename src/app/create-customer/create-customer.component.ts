import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import {Customerloginform} from '../customerloginform'

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient) { }
  requestUrl:string;
  customerId:string;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  model = new Customerloginform('','','','','','','','','');
  ngOnInit() {
	  this.requestUrl = "https://customerhost.cfapps.io";
  }

  createCustomerPage(){
	   this.httpClient.post( this.requestUrl.concat('/customer/add'),JSON.stringify(this.model),{headers: this.headers})
	   .subscribe(
			  (data:any) =>{
				  if(data){
					  this.customerId = data.customerId;
					  this.router.navigate(['/createAccount',this.customerId])
				  }
			  },
			  (data:any) =>{
				  if(data){
					  this.router.navigate(['/createCustomer'])
				  }
			  }
			   )
  }

  closeCreatePage(){
 this.router.navigate(['/login'])
}

}
