import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SplitInputClipboardEvent, SplitInputKeyUpEvent} from "./model";

@Injectable({
  providedIn: 'root'
})
export class SplitInputService {

  private _clearSplitInputSource = new Subject<any>();
  private _onSplitInputCleared: Observable<any> = this._clearSplitInputSource.asObservable();

  /** Trigger clearing of a SplitInput */
  clearSplitIpnut(): void {
    this._clearSplitInputSource.next();
  }

  /** Emits when a SplitInput has been cleared. */
  get onSplitInputCleared(): Observable<any> {
    return this._onSplitInputCleared;
  }
}
