import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
