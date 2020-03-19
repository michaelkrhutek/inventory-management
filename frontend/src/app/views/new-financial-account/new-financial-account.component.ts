import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-financial-account',
  templateUrl: './new-financial-account.component.html',
  styleUrls: ['./new-financial-account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFinancialAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
