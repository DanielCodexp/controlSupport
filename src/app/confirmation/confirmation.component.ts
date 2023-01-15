import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { filter } from 'rxjs/operators';
import { CarsService } from '../services/cars.service';
import { DatosService } from '../interface/UserProfile';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
public imprimir = false;
public isMobile = false;
public order: any = [];
public orderData: any = [];
public carByUser: any = [];
  constructor(
    public sharedService: SharedService,
    private route: ActivatedRoute,
    private carService: CarsService,
  ) { }

  async ngOnInit(): Promise<void> {

    this.isMobile = this.sharedService.isMobile;

    this.route.queryParamMap
    .subscribe((params) => {
      this.order = params;
    })

    const response = await this.carService.getOrder(this.order.params.order)
      this.orderData = response
     

      const responseCar = await this.carService.getCarByOrder(this.orderData.iDCarByUser)
      this.carByUser = responseCar

 }

 public download(){
  this.imprimir = true;
  const DATA = document.getElementById('htmlData') as HTMLElement;
  const doc = new jsPDF('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 25;
    const bufferY = 25;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_VLICARS.pdf`);
    this,this.imprimir = false
  });
}
 }

//  public priceTotal(price_day:number, total_days:number){
//   let price_total
// return  price_total = price_day * total_days;

//  }

//  public iva(price_total:number){

//   const iva = 0.16;
//   let price_iva;

//   return price_iva = (price_total*iva)

//  }

//  public priceFinal(price_total:number, ivaTotal:number){
//   let priceFinal;
//   return priceFinal = price_total + ivaTotal
//  }



 


