import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  ElementRef,
  Input,
  OnDestroy, Output, EventEmitter
} from '@angular/core';
import {SplitInputDirective} from "../split-input.directive";
import {SplitInputEventHandlerService} from "../split-input-event-handler.service";
import {SplitInputClipboardEvent, SplitInputKeyUpEvent} from "../model";
import {Subscription} from "rxjs";
import {SplitInputService} from "../split-input.service";

@Component({
  selector: 'ngx-split-input',
  templateUrl: './ngx-split-input.component.html',
  styleUrls: ['./ngx-split-input.component.scss']
})
export class NgxSplitInputComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() autofocus: Boolean = true;
  @Input() clipboard: Boolean = true;

  @Output() completed: EventEmitter<any> = new EventEmitter();

  @ContentChildren(SplitInputDirective) splitInputElems: QueryList<SplitInputDirective>;

  private _inputMaxLength = 0;

  private _keyUpSubscription: Subscription;
  private _clipboardSubscription: Subscription;
  private _clearSplitInputSubscription: Subscription;

  constructor(private splitInputEventHandlerService: SplitInputEventHandlerService,
              private splitInputService: SplitInputService) { }

  ngOnInit(): void {
    this._keyUpSubscription = this.splitInputEventHandlerService.keyUp$.subscribe((e: SplitInputKeyUpEvent) => {
      this.handleKeyUpEvent(e);
    });

    this._clearSplitInputSubscription = this.splitInputService.onSplitInputCleared.subscribe(() => {
      this.clearSplitInput();
    });

    if (this.clipboard) {
      this._clipboardSubscription = this.splitInputEventHandlerService.clipboard$.subscribe((e: SplitInputClipboardEvent) => {
        this.handleClipboardEvent(e);
      });
    }
  }

  ngAfterContentInit(): void {
    this.validateSplitInputElements();

    this.setupSplitInputElements();

    this._inputMaxLength = this.setInputMaxLength();
  }

  ngOnDestroy(): void {
    if (this._keyUpSubscription) this._keyUpSubscription.unsubscribe();
    if (this._clipboardSubscription) this._clipboardSubscription.unsubscribe();
    if (this._clearSplitInputSubscription) this._clearSplitInputSubscription.unsubscribe();
  }

  private clearSplitInput() {
    this.splitInputElems.forEach(elem => {
      elem.elementRef.nativeElement.value = '';
    });

    this.splitInputElems.first.elementRef.nativeElement.focus();
  }

  private setInputMaxLength(): number {
    const maxLengthArray = this.splitInputElems.map(elem => {
      return elem.elementRef.nativeElement.maxLength;
    });

    return maxLengthArray.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  private setupSplitInputElements(): void {
    if (this.autofocus) {
      this.splitInputElems.first.elementRef.nativeElement.autofocus = true;
    }
  }

  private validateSplitInputElements(): void {
    this.splitInputElems.forEach(elem => {
      if (elem.elementRef.nativeElement.localName !== 'input') throw new Error('ngxSplitInput directive can only be used on "input" elements');
      if (!(elem.elementRef.nativeElement.type === 'text' || elem.elementRef.nativeElement.type === 'number')) throw new Error('ngxSplitInput only supports input elements with type "text" or "number"');
      if (elem.elementRef.nativeElement.maxLength === -1) throw new Error('"maxLength" attribute has to be defined for ngxSplitInput elements');
    });
  }

  private handleClipboardEvent(event: SplitInputClipboardEvent): void {
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
    this.triggerValidation()
  }

  private handleKeyUpEvent(event: SplitInputKeyUpEvent): void {
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

    if (e.key !== 'Meta') {
      this.triggerValidation();
    }
  }

  private triggerValidation(): void {
    let inputValue = '';

    for (const elem of this.splitInputElems.toArray()) {
      const value = elem.elementRef.nativeElement.value;
      const maxLength = elem.elementRef.nativeElement.maxLength;

      if (value === undefined || value.trim().length !== maxLength) {
        break;
      } else {
        inputValue += value;
      }
    }

    if (inputValue.length === this._inputMaxLength) this.completed.emit(inputValue);
  }
}
