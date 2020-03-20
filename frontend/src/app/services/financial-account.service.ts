import { Injectable } from '@angular/core';
import { FinancialAccountType } from '../models/financial-account-type';

@Injectable({
  providedIn: 'root'
})
export class FinancialAccountService {

  constructor() { }

  getAllFinancialAccountTypes(): FinancialAccountType[] {
    return [
      FinancialAccountType.Assets,
      FinancialAccountType.Liabilities,
      FinancialAccountType.Equity,
      FinancialAccountType.Revenues,
      FinancialAccountType.Expenses
    ];
  }

  getFinancialAccountTypeName(type: FinancialAccountType): string {
    console.log(type);
    switch (type) {
      case FinancialAccountType.Assets:
        return 'Assets';
      case FinancialAccountType.Equity:
        return 'Equity';
      case FinancialAccountType.Liabilities:
        return 'Liabilities';
      case FinancialAccountType.Revenues:
        return 'Revenues';
      case FinancialAccountType.Expenses:
        return 'Expenses';
      default:
        return 'N/A';
    }
  }
}
