import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'
import {Customerloginform} from '../customerloginform'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 
  
export class LoginComponent implements OnInit {
 
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private router:Router,private httpClient:HttpClient) { }
  found : boolean;
  name:string;
  password:string;
  requestUrl:string;
  data : {
	  status:'';
  }
 
  
  model = new Customerloginform('','','','','','','','','');
  
  disabledSubmit : boolean;
  ngOnInit() {
	  this.found = true;
	  this.name ='test';
	  this.requestUrl = "https://customerhost.cfapps.io";
	  console.log("model value-->", this.model);
  }
    
  dataAvailable(){
	  if(this.model.userName=='' && this.model.password ==''){
		  this.disabledSubmit = true;
		  return  this.disabledSubmit; 
	  }
  }
  loginSubmit() {
	  let Params = new HttpParams().set('userName', this.model.userName).set('password', this.model.password);
      this.httpClient.get(this.requestUrl.concat('/customer/login'),{params:Params})
	   .subscribe(
			  (data:any) =>{
				  if(data.status.valueOf() == 'FAIL'){
					  this.found = false;
					  this.router.navigate(['/login'])  
				 }
				  else if(data.status.valueOf() == 'SUCCESS'){
					  this.found = true;
					  this.router.navigate(['/home',data.customerId])
				  }
			  },
			  (data:any[]) =>{
				  console.log("this is error");
				  this.found = false;
				  this.router.navigate(['/home'])
			  }
		   )
  }
}
