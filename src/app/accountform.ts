	
	export class Accountform {

		  constructor(
		      public accountNumber:string,
			  public  ifscCode: string,
		      public balance: string,
			  public type: string,
			  public  status: string,
			  public  customerId: string
		 ) {}
		  set setcustomerId(customerId:string){
			  this.customerId = customerId;
		  }
		}