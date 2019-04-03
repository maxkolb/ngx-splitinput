import { Component } from '@angular/core';

@Component({
  selector: 'SplitInputLibrary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  handleCompleted(event: any): void {
    console.log(event);
  }
}
