import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'real-time-app';

  ngOnInit(): void {
    document.documentElement.setAttribute('color-theme', 'dark');
    document.getElementsByTagName('html')[0].setAttribute('class', 'dark-theme');
  }
}
