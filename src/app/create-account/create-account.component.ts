import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Accountform} from '../accountform'



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient, private route: ActivatedRoute) { }
  
  requestUrl:string;
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  model = new Accountform('','','','','','');
  ngOnInit() {
	  this.requestUrl = "https://accounthost.cfapps.io";
//	  console.log(this.route.params.value.id,"test");
	  
  }
 
 
  createAccountPage(){
	       this.route.params.subscribe(translatedValue => { 
		    this.model.customerId = translatedValue.id;
		  });

		   this.httpClient.post( this.requestUrl.concat('/account/add'),this.model,{headers: this.headers})
		   .subscribe(
				  (data:any) =>{
					  if(data){
						  this.router.navigate(['/login'])
					  }
				  },
				  (data:any) =>{
					  if(data){
						  this.router.navigate(['/login'])
					  }
				  }
				   )
	   }
 
  closeAccountPage(){
	  this.router.navigate(['/login'])
  }
}
