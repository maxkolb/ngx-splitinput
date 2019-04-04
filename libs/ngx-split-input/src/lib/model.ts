import {ElementRef} from "@angular/core";

export class SplitInputKeyUpEvent {
  private readonly _keyboardEvent: KeyboardEvent;
  private readonly _element: ElementRef;

  constructor(keyboardEvent: KeyboardEvent, element: ElementRef<any>) {
    this._keyboardEvent = keyboardEvent;
    this._element = element;
  }

  get keyboardEvent(): KeyboardEvent {
    return this._keyboardEvent;
  }

  get element(): ElementRef<any> {
    return this._element;
  }
}

export class SplitInputClipboardEvent {
  private readonly _clipboardEvent: ClipboardEvent;
  private readonly _element: ElementRef;

  constructor(clipboardEvent: ClipboardEvent, element: ElementRef<any>) {
    this._clipboardEvent = clipboardEvent;
    this._element = element;
  }

  get clipboardEvent(): ClipboardEvent {
    return this._clipboardEvent;
  }

  get element(): ElementRef<any> {
    return this._element;
  }
}
