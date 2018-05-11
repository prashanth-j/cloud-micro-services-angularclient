import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CTS Bank';
  age:number;
  found:boolean;
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  name:string ='';
   constructor(private httpClient:HttpClient){}
   onNamekeyup(event:any){
	   console.log(event.target.value)
	   this.name = event.target.value;
	   this.found = false;
   }
   /*customer : string {userName: 'test', password: '455'};
   
   loginToApp(){
	   console.log("call  from app component");
	   this.httpClient.post('http://localhost:8080/customer/add',JSON.stringify(this.customer),{headers: this.headers})
	   .subscribe(
			  (data:any) =>{
				  if(data){
					  console.log(data);
				  }
			  }
			   )
   }*/
  }

