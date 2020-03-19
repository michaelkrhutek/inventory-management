import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-financial-accounts',
  templateUrl: './financial-accounts.component.html',
  styleUrls: ['./financial-accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialAccountsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
