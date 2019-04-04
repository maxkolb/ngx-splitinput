import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {SplitInputEventHandlerService} from './split-input-event-handler.service';

@Directive({
  selector: '[ngxSplitInput]'
})
export class SplitInputDirective implements OnInit {

  private _elementRef: ElementRef;

  constructor(private el: ElementRef,
              private splitInputEventHandlerService: SplitInputEventHandlerService) {}

  ngOnInit(): void {
    this._elementRef = this.el;
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent): void {
    this.splitInputEventHandlerService.keyUp(e, this._elementRef);
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    this.splitInputEventHandlerService.clipboard(e, this._elementRef);
  }

  get elementRef(): ElementRef<any> {
    return this._elementRef;
  }
}
