export class ViewPaymentform {

  constructor(
	public debitOrCredit:string,
    public amount: string,
    public transactionRef: string,
    public dateOfTransaction: string
  ) {  }

}