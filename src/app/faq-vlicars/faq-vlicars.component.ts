import { Component, OnInit } from '@angular/core';
import { Faq } from '../interface/faq';
import { CarsService } from '../services/cars.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-faq-vlicars',
  templateUrl: './faq-vlicars.component.html',
  styleUrls: ['./faq-vlicars.component.scss']
})
export class FaqVlicarsComponent implements OnInit {
  public isMobile = false;
  public faq: Faq [] = [];

  constructor(
    public sharedService: SharedService,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.isMobile = this.sharedService.isMobile;
    this.carService.getFaq().subscribe(response => {
      console.log(response)
      this.faq = response;
      });
  }

}
