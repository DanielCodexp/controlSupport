import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isMobile = false;
  public lanscape: boolean;
  constructor(public deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile() || deviceService.isTablet();
    this.lanscape = this.deviceService.orientation.includes('landscape');
  }

}
