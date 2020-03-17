import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-inventory-item',
  templateUrl: './new-inventory-item.component.html',
  styleUrls: ['./new-inventory-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInventoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
