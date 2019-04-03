import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {SplitInputService} from "./split-input.service";

@Directive({
  selector: '[ngxSplitInput]'
})
export class SplitInputDirective implements OnInit {

  private _elementRef: ElementRef;

  constructor(private el: ElementRef, private splitInputService: SplitInputService) {}

  ngOnInit(): void {
    this._elementRef = this.el;
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    this.splitInputService.keyUp(e, this._elementRef);
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    this.splitInputService.clipboard(e, this._elementRef);
  }


  get elementRef(): ElementRef<any> {
    return this._elementRef;
  }

  set elementRef(value: ElementRef<any>) {
    this._elementRef = value;
  }
}
