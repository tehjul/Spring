import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {LoaderState} from "../loader.model";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show(): void {
    this.handleLoader(true);
  }

  hide(): void {
    this.handleLoader(false);
  }

  handleLoader(bool: boolean): void {
    this.loaderSubject.next({show: bool});
  }
}
