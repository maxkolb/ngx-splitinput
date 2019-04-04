import {Component} from '@angular/core';
import {SplitInputService} from "@SplitInputLibrary/ngx-split-input";

@Component({
  selector: 'SplitInputLibrary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private splitInputService: SplitInputService) {}

  handleCompleted(event: any): void {
    console.log(event);
    this.splitInputService.clearSplitIpnut();
  }
}
