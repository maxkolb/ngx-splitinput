import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {SplitInputKeyUpEvent} from "./model";

@Injectable({
  providedIn: 'root'
})
export class SplitInputService {

  // Observable string sources
  private keyUpSource = new Subject<SplitInputKeyUpEvent>();

  // Observable string streams
  keyUp$ = this.keyUpSource.asObservable();

  // Service message commands
  keyUp(e: KeyboardEvent, elem: ElementRef) {
    this.keyUpSource.next(new SplitInputKeyUpEvent(e, elem));
  }
}
