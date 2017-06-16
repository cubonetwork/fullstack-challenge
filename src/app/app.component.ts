import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }
}
