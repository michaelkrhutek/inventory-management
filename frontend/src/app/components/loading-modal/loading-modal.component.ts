import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
