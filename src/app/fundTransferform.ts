export class FundTransferform {

  constructor(
	  public  fromAccount : string,  
	  public  toAccount : string,
	  public  drifscCode: string,
	  public  crifscCode: string,
      public debitOrCredit: string,
	  public amount: string,
	  public  status: string,
	  public  transactionRef: string,
	  public customerId:string) {  }

}
