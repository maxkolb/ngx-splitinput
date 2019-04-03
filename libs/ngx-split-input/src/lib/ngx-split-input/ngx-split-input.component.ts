import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import {SplitInputDirective} from "../split-input.directive";
import {SplitInputService} from "../split-input.service";
import {SplitInputClipboardEvent, SplitInputKeyUpEvent} from "../model";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-split-input',
  templateUrl: './ngx-split-input.component.html',
  styleUrls: ['./ngx-split-input.component.scss']
})
export class NgxSplitInputComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() autofocus: Boolean = true;
  @Input() clipboard: Boolean = true;

  @ContentChildren(SplitInputDirective) splitInputElems: QueryList<SplitInputDirective>;

  keyUpSubscription: Subscription;
  clipboardSubscription: Subscription;

  constructor(private splitInputService: SplitInputService) { }

  ngOnInit() {
    this.keyUpSubscription = this.splitInputService.keyUp$.subscribe((e: SplitInputKeyUpEvent) => {
      this.handleKeyUpEvent(e);
    });

    if (this.clipboard) {
      this.clipboardSubscription = this.splitInputService.clipboard$.subscribe((e: SplitInputClipboardEvent) => {
        this.handleClipboardEvent(e);
      });
    }
  }

  ngAfterContentInit(): void {
    this.validateSplitInputElements();

    this.setupSplitInputElements();
  }

  ngOnDestroy(): void {
    if (this.keyUpSubscription) this.keyUpSubscription.unsubscribe();
    if (this.clipboardSubscription) this.clipboardSubscription.unsubscribe();
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

  private handleClipboardEvent(event: SplitInputClipboardEvent) {
    const e = event.clipboardEvent;
    const elem = event.element;
    let clipboardData = e.clipboardData.getData('text');

    // Find current element
    const splitInputElementRefs = this.splitInputElems.map(element => {
      return element.elementRef;
    });

    const currentElementIndex: number = splitInputElementRefs.indexOf(elem);

    // remove content
    splitInputElementRefs[currentElementIndex].nativeElement.value = '';

    // for elems insert maxlength
    const remainingElements: number = this.splitInputElems.length - currentElementIndex;

    for (let i = 0; i < remainingElements; i++) {
      const focusElem = splitInputElementRefs[currentElementIndex+i].nativeElement;
      const elemMaxLength = focusElem.maxLength;
      focusElem.value = clipboardData.substring(0, elemMaxLength);
      clipboardData = clipboardData.slice(elemMaxLength);
    }

    splitInputElementRefs[currentElementIndex].nativeElement.focus();
  }

  private handleKeyUpEvent(event: SplitInputKeyUpEvent) {
    const e = event.keyboardEvent;
    const elem = event.element;

    const splitInputElementRefs = this.splitInputElems.map(element => {
      return element.elementRef;
    });

    const currentElementIndex = splitInputElementRefs.indexOf(elem);

    if (elem.nativeElement.maxLength === elem.nativeElement.value.length && currentElementIndex !== this.splitInputElems.length - 1 && e.key !== 'Meta') {
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
