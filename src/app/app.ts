import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {CommonModule} from '@angular/common';
import {NetworkStatus} from '../service/network-status';
import {PwaInstall} from '../service/pwa-install';




@Component({
  selector: 'app-root',

  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit{

  isOnline: boolean = true;
  showInstallButton: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  toastClass: string = '';
  toastIcon: string = '';

  constructor(
    private networkStatus: NetworkStatus,
    private pwaInstall: PwaInstall
  ) {}

  ngOnInit() {
    this.networkStatus.getOnlineStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
      this.showStatusMessage(isOnline);
    });

    setTimeout(() => {
      this.showInstallButton = !!this.pwaInstall.getPromptEvent();
    }, 1000);
  }

  showStatusMessage(isOnline: boolean) {
    const message = isOnline ? 'اتصال اینترنت برقرار شد' : 'شما در حالت آفلاین هستید';
    const type = isOnline ? 'success' : 'warning';

    console.log(message);
    this.displayToast(message, type);
  }

  displayToast(message: string, type: string = 'info') {
    this.toastMessage = message;
    this.toastClass = `toast-${type}`;

    switch(type) {
      case 'success':
        this.toastIcon = 'fas fa-check-circle';
        break;
      case 'warning':
        this.toastIcon = 'fas fa-exclamation-triangle';
        break;
      case 'error':
        this.toastIcon = 'fas fa-times-circle';
        break;
      default:
        this.toastIcon = 'fas fa-info-circle';
    }

    this.showToast = true;

    // مخفی کردن خودکار نوتیفیکیشن پس از 5 ثانیه
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.showToast = false;
  }

  installPwa() {
    this.pwaInstall.showInstallPrompt();
  }

  simulateNetworkChange() {
    // برای تست وضعیت شبکه
    this.isOnline = !this.isOnline;
    this.showStatusMessage(this.isOnline);
  }
}
