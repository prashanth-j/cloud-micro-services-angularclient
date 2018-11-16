import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {AddBeneficiaryform} from '../addBeneficiaryForm';
import {ActivatedRoute, Router, Params} from '@angular/router'
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-view-benificiaries',
  templateUrl: './view-benificiaries.component.html',
  styleUrls: ['./view-benificiaries.component.css']
})
export class ViewBenificiariesComponent implements OnInit {

	 model = new AddBeneficiaryform('','','','');
	 requestUrl:string;
	 customerId:string;
	 found:boolean;
	 private headers = new HttpHeaders({'Content-Type': 'application/json'});
	 constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }
	 benelist:AddBeneficiaryform[];
	  
	  ngOnInit() {
		  this.requestUrl = "https://benehost.cfapps.io";
		  this.route.params.subscribe(translatedValue => { 
			  this.model.customerId = translatedValue.id;
			});
		  this.route.params.subscribe(translatedValue => { 
			  this.customerId = translatedValue.id;
				});
		  
		  let Params = new HttpParams().set('customerId', this.customerId);
		  this.httpClient.get( this.requestUrl+'/bene/customer',{params:Params})
			   .subscribe(
					  (data:any) =>{
						  if(data.status.valueOf() == 'FAIL'){
							  this.found = false;
							  this.router.navigate(['/login']);
						 }
						  else if(data.status.valueOf() == 'SUCCESS'){
							  this.found = true;
							  this.benelist = data.benelist;
						  }
					  },
					  (data:any[]) =>{
						  console.log("this is error");
						  this.router.navigate(['/home',this.customerId]);
					  }
				   )
				   
	  }

	  routeToHome() {
		  this.router.navigate(['/home',this.customerId])
	  }

}
