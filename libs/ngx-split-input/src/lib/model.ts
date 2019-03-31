import {ElementRef} from "@angular/core";

export class SplitInputKeyUpEvent {
  keyboardEvent: KeyboardEvent;
  element: ElementRef;

  constructor(keyboardEvent: KeyboardEvent, element: ElementRef<any>) {
    this.keyboardEvent = keyboardEvent;
    this.element = element;
  }
}
