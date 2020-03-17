import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inventory-transactions',
  templateUrl: './inventory-transactions.component.html',
  styleUrls: ['./inventory-transactions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryTransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
