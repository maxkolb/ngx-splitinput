import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSplitInputModule} from "@SplitInputLibrary/ngx-split-input";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSplitInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
