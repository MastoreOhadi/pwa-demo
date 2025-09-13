import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PwaInstall {
  private promptEvent: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.promptEvent = event;
      });
    }
  }

  public getPromptEvent() {
    return this.promptEvent;
  }

  public showInstallPrompt() {
    if (this.promptEvent && isPlatformBrowser(this.platformId)) {
      this.promptEvent.prompt();
      this.promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.promptEvent = null;
      });
    }
  }
}
