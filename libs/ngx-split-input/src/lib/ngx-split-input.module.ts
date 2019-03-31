import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSplitInputComponent } from './ngx-split-input/ngx-split-input.component';
import { SplitInputDirective } from './split-input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxSplitInputComponent, SplitInputDirective],
  exports: [NgxSplitInputComponent, SplitInputDirective]
})
export class NgxSplitInputModule {}
