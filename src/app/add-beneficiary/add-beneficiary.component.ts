import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router'
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {AddBeneficiaryform} from '../addBeneficiaryForm'


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
	requestUrl:string;
  found:boolean;
  model = new AddBeneficiaryform('','','','');
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }

  
  ngOnInit() {
	  this.found= false;
	  this.requestUrl = "https://benehost.cfapps.io";
	  this.route.params.subscribe(translatedValue => { 
		  this.model.customerId = translatedValue.id;
		});
  }

  public name : string;
  public accountNumber: string;
  public ifscCode: string;
  public customerId: string;
  
  
  submitBene(){
	  console.log("call  from app component");
      this.httpClient.post( this.requestUrl.concat('/bene/add'),this.model,{headers: this.headers})
      .subscribe(
			  (data:any) =>{
				  if(data.status == 'SUCCESS'){
					   this.router.navigate(['/home',this.model.customerId])
				  }
			  },(data:any) =>{
				  this.found= false;
				 console.log('error occured ihere')
			  }
			   )
			   
  }
  closeBene(){
	  this.router.navigate(['/home',this.model.customerId])
  }
  
}
