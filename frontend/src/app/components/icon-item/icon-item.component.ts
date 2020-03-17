import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon-item',
  templateUrl: './icon-item.component.html',
  styleUrls: ['./icon-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
