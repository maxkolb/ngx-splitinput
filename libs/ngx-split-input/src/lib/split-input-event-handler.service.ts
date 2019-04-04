import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {SplitInputClipboardEvent, SplitInputKeyUpEvent} from "./model";

@Injectable({
  providedIn: 'root'
})
export class SplitInputEventHandlerService {

  // Observable sources
  private _keyUpSource = new Subject<SplitInputKeyUpEvent>();
  private _clipboardSource = new Subject<SplitInputClipboardEvent>();

  // Observable streams
  keyUp$ = this._keyUpSource.asObservable();
  clipboard$ = this._clipboardSource.asObservable();

  // Service message commands
  keyUp(e: KeyboardEvent, elem: ElementRef): void {
    this._keyUpSource.next(new SplitInputKeyUpEvent(e, elem));
  }

  clipboard(e: ClipboardEvent, elem: ElementRef): void {
    this._clipboardSource.next(new SplitInputClipboardEvent(e, elem));
  }
}
