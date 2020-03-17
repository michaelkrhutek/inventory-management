import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(
    private socketService: SocketService
  ) { }

  data$: Observable<string[]> = this.socketService.data$;

  emitSocketEvent(key: number, value: string): void {
    console.log(key, value)
    this.socketService.emitSocketMessage(key, value || '');
  }

  trackByFn(index: number): number {
    return index;
  }
}
