import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-financial-period',
  templateUrl: './new-financial-period.component.html',
  styleUrls: ['./new-financial-period.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFinancialPeriodComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
