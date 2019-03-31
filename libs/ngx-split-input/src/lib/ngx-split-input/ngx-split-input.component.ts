import {Component, ContentChildren, OnInit, QueryList, AfterContentInit, ElementRef, Input} from '@angular/core';
import {SplitInputDirective} from "../split-input.directive";
import {SplitInputService} from "../split-input.service";
import {SplitInputKeyUpEvent} from "../model";

@Component({
  selector: 'ngx-split-input',
  templateUrl: './ngx-split-input.component.html',
  styleUrls: ['./ngx-split-input.component.scss']
})
export class NgxSplitInputComponent implements OnInit, AfterContentInit {

  @Input()
  autofocus: Boolean = true;

  @ContentChildren(SplitInputDirective)
  splitInputElems: QueryList<SplitInputDirective>;

  constructor(private splitInputService: SplitInputService) { }

  ngOnInit() {
    this.splitInputService.keyUp$.subscribe((e: SplitInputKeyUpEvent) => {
      this.handleKeyUpEvent(e);
    });
  }

  ngAfterContentInit(): void {
    this.validateSplitInputElements();

    this.setupSplitInputElements();
  }

  private setupSplitInputElements() {
    if (this.autofocus) {
      this.splitInputElems.first.elementRef.nativeElement.autofocus = true;
    }
  }

  private validateSplitInputElements() {
    this.splitInputElems.forEach(elem => {
      if (elem.elementRef.nativeElement.localName !== 'input') throw new Error('ngxSplitInput directive can only be used on "input" elements');
      if (!(elem.elementRef.nativeElement.type === 'text' || elem.elementRef.nativeElement.type === 'number')) throw new Error('ngxSplitInput only supports input elements with type "text" or "number"');
      if (elem.elementRef.nativeElement.maxLength === -1) throw new Error('"maxLength" attribute has to be defined for ngxSplitInput elements');
    });
  }

  private handleKeyUpEvent(event: SplitInputKeyUpEvent) {
    const e = event.keyboardEvent;
    const elem = event.element;

    const splitInputElementRefs = this.splitInputElems.map(element => {
      return element.elementRef;
    });

    const currentElementIndex = splitInputElementRefs.indexOf(elem);
    
    if (elem.nativeElement.maxLength === elem.nativeElement.value.length && currentElementIndex !== this.splitInputElems.length - 1) {
      e.preventDefault();

      const nextControl: ElementRef = splitInputElementRefs[currentElementIndex+1];
      nextControl.nativeElement.focus();

    } else if (elem.nativeElement.value.length === 0 && e.code === 'Backspace' && currentElementIndex !== 0) {
      e.preventDefault();

      const prevControl: ElementRef = splitInputElementRefs[currentElementIndex-1];
      prevControl.nativeElement.focus();
    }
  }
}
