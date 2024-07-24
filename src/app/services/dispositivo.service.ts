import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  isMobile(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
  }

  isDesktop(): boolean {
    return !this.isMobile();
  }
}
