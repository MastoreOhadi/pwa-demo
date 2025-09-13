import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatus {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  getOnlineStatus() {
    return this.onlineStatus.asObservable();
  }

  private updateOnlineStatus() {
    this.onlineStatus.next(navigator.onLine);
  }
}
