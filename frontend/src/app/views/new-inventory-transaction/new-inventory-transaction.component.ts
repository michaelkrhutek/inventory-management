import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-inventory-transaction',
  templateUrl: './new-inventory-transaction.component.html',
  styleUrls: ['./new-inventory-transaction.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInventoryTransactionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
