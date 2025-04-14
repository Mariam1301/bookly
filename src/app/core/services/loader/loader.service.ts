import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderSubject = new Subject<{ showLoader: boolean; loaderId?: string }>();
  loader$: Observable<{ showLoader: boolean; loaderId?: string }> =
    this.loaderSubject.asObservable();
  constructor() {}

  createLoader(loaderId: string) {
    this.loaderSubject.next({ showLoader: true, loaderId });
  }

  removeLoader(loaderId: string) {
    this.loaderSubject.next({ showLoader: false, loaderId });
  }
}
