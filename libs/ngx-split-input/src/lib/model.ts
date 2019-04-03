import {ElementRef} from "@angular/core";

export class SplitInputKeyUpEvent {
  keyboardEvent: KeyboardEvent;
  element: ElementRef;

  constructor(keyboardEvent: KeyboardEvent, element: ElementRef<any>) {
    this.keyboardEvent = keyboardEvent;
    this.element = element;
  }
}

export class SplitInputClipboardEvent {
  clipboardEvent: ClipboardEvent;
  element: ElementRef;

  constructor(clipboardEvent: ClipboardEvent, element: ElementRef<any>) {
    this.clipboardEvent = clipboardEvent;
    this.element = element;
  }
}
