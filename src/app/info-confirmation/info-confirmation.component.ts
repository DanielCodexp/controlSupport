import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-info-confirmation',
  templateUrl: './info-confirmation.component.html',
  styleUrls: ['./info-confirmation.component.scss']
})
export class InfoConfirmationComponent implements OnInit {
  public isMobile = false;

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.isMobile = this.sharedService.isMobile;
  }

}
