import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-cancel-rent',
  templateUrl: './cancel-rent.component.html',
  styleUrls: ['./cancel-rent.component.scss']
})
export class CancelRentComponent implements OnInit {
  public isMobile = false;
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isMobile = this.sharedService.isMobile;
  }

}
