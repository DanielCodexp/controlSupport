import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  public isMobile = false;
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isMobile = this.sharedService.isMobile;
  }

}
