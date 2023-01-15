import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosCars } from '../interface/cars-interface';
import { DatosRequest, DatosService, DatosUser } from '../interface/UserProfile';
import { CarsService } from '../services/cars.service';
import { SharedService } from '../services/shared.service';
import { FormbHelper } from '../helper/form-helper';
import { Router } from '@angular/router';
import { RoutePath } from '../phats/route-path.constant';
import { Country, Time } from '../interface/countries';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-form-rent',
  templateUrl: './form-rent.component.html',
  styleUrls: ['./form-rent.component.scss']
})
export class FormRentComponent implements OnInit {
  public priceByDay = 0;
  public totalRentDays = 0;
  public ErrordateEn = false;
  public countryNames: Country [] = [];
  public time: Time [] = [];
  public orders: DatosService[] = [];
  public errorData = false;
  public error = false;
  public idCar = '';
  public userDatos = false
  public isMobile = false;
  public ciudadEntrega = '';
  public cordoba = false;
  public orizaba = false;
  public form: FormGroup;
  public formDataUser: FormGroup;
  public isProcessingLogin = false;
  public autos = false;
  public codigo = true;
  public datos: DatosRequest[] = [];
  public cars: DatosCars[] = [];
  public carByUser: any = [];
  public cordobaArray: any[] = [
    { value: '1', lugar: 'Córdoba', direccion: 'Parque 21 de mayo av.1' },
    { value: '2', lugar: 'Córdoba', direccion: 'Parque de San José av.9' },
    { value: '3', lugar: 'Córdoba', direccion: 'Parque Centenario av.11' },
  ]
  public orizabaArray: any[] = [
    { value: '1', lugar: 'Orizaba', direccion: 'Parque Castillo' },
    { value: '2', lugar: 'Orizaba', direccion: 'Poliforum' },
    { value: '3', lugar: 'Orizaba', direccion: 'Palacio de Hierro' },
  ]
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carService: CarsService,
    public sharedService: SharedService
  ) {

    this.form = fb.group({
      direccionCordoba: ["",[]],
      direccionOrizaba: ["",[]],
      fechaEntrega: [, [Validators.required]],
      horaEntrega: ["", [Validators.required]],
      fechaDevolucion: [, [Validators.required]],
      horaDevolucion: ["", [Validators.required]],
      edad: ["",[Validators.required]],
      codigo: [false],
      codeProm: [, []]
    });

    this.formDataUser = fb.group({
      name:[, [Validators.required, Validators.minLength(1)]],
      surname:[, [Validators.required, Validators.minLength(1)]],
      country:['MX', ],
      cel:[, [Validators.required, Validators.minLength(10)]],
      email:[, [Validators.required, Validators.email]],
      bithDate:[, [Validators.required]],
      terms: [, Validators.requiredTrue],
      numCard: [, [Validators.required, Validators.minLength(16)]],
      expCard: [, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    

    this.carService.getCountryNames().subscribe(response => {
      this.countryNames = response;
      });

    this.carService.getTime().subscribe(response => {
      this.time = response;
      });

    this.isMobile = this.sharedService.isMobile;
    this.carService.getCars().subscribe(response => {
      this.cars = response;
    })
  }
  public getRandomIntInclusive(min:number, max:number) {
    const result = 0;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  public send() {
   if(this.form?.invalid)
   {
    this.error = true
    return
   }
   if(!this.validationDate(this.form.get("fechaEntrega")?.value, this.form.get("fechaDevolucion")?.value)){
    this.ErrordateEn = true
     return 
   }else this.ErrordateEn = false
   this.autos = true;
    setTimeout(() => {
      this.scroll(1000);
    }, 200);

  }

  public scroll(topSize: number) {
    window.scroll({
      top: topSize,
      behavior: 'smooth'
    });
  }

  public ciudad(lugar: string) {
    this.ciudadEntrega = lugar;
    if (lugar == 'cordoba') {
      this.cordoba = true;
      this.orizaba = false;
    } else if (lugar == 'orizaba') {
      this.orizaba = true;
      this.cordoba = false;
    }

  }
  public async reservar(marca: string, img: string, id:string, priceByDay:number) {
    this.priceByDay = priceByDay;
    this.idCar = id;
    let direc;
    if (this.ciudadEntrega == 'cordoba') {
      direc = this.form.get("direccionCordoba")?.value
    } else if (this.ciudadEntrega == 'orizaba') {
      direc = this.form.get("direccionOrizaba")?.value
    }
    const responseCar = await this.carService.getCarByOrder(id)
    this.carByUser = responseCar
   
    const data: DatosRequest = {
      auto: marca,
      ciudad: this.ciudadEntrega,
      direccion: direc,
      fechaEntrega:  this.form.get("fechaEntrega")?.value,
      horaEntrega: this.form.get("horaEntrega")?.value,
      fechaDevolucion: this.form.get("fechaDevolucion")?.value,
      horaDevolucion: this.form.get("horaDevolucion")?.value,
      edad: this.form.get("edad")?.value,
      url: img,
      codigo:this.form.get("codigo")?.value,
      codeProm:this.form.get("codeProm")?.value,
      totalRentDays: this.totalRentDays,

    }

    this.datos = [data]

    this.userDatos = true
    setTimeout(() => {
      this.scroll(2500);
    }, 200);


  }

  sendDatos() {

   
 if(this.formDataUser?.invalid)
 {
 this.errorData = true;
  return
 }
 if(!this.valiDateOfBirth(this.formDataUser.get("bithDate")?.value)){
   this.ErrordateEn = true
    return 
  }else this.ErrordateEn = false

 const dataUser: DatosUser = {
   name:this.formDataUser.get("name")?.value,
   surname:this.formDataUser.get("surname")?.value,
   country:this.formDataUser.get("country")?.value,
   cel:this.formDataUser.get("cel")?.value,
   email:this.formDataUser.get("email")?.value,
   bithDate:this.formDataUser.get("bithDate")?.value,
   terms:this.formDataUser.get("terms")?.value,
   iDCarByUser:this.idCar,
   numOrder:this.getRandomIntInclusive(10000,1000000),
   priceTotalByDays: this.priceTotal(this.priceByDay, this.totalRentDays),
   ivaTotal:this.iva(this.priceTotal(this.priceByDay,this.totalRentDays)),
   priceFinal: this.priceFinal(this.priceTotal(this.priceByDay, this.totalRentDays),this.iva(this.priceTotal(this.priceByDay,this.totalRentDays))),
   numCard: this.formDataUser.get("numCard")?.value,
   expCard: this.formDataUser.get("expCard")?.value,
 }



 const returnedTarget = Object.assign(this.datos[0], dataUser);
 this.carService.addCars(returnedTarget)

    .then(response => {
      this.carService.updateAvaible(this.idCar);
      this.router.navigate([`/${RoutePath.CONFIMATION_PATH}`],{ queryParams: { order: response.id} });
    })
    .catch(error => console.log(error))

   
 this.datos = []
 this.autos = false;
 this.cordoba = false;
 this.orizaba = false;
 this.userDatos = false;
  }

 
  public getMessage(msg:string): string {
    return FormbHelper.getMessage(msg);
  }

  public validationDate(DeliverDate:string, ReturnDate:string){
    
    const DATE_REGEX = /^(19|20)(((([02468][048])|([13579][26]))-02-29)|(\d{2})-((02-((0[1-9])|1\d|2[0-8]))|((((0[13456789])|1[012]))-((0[1-9])|((1|2)\d)|30))|(((0[13578])|(1[02]))-31)))$/
    
    const CURRENT_YEAR = new Date().getFullYear()
    const CURRENT_DAY = new Date().getDate();
    const CURRENT_MONTH = new Date().getMonth() + 1;
    const birthDeliverDate = DeliverDate
    const birthReturnDate = ReturnDate

      /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
      if (!birthDeliverDate.match(DATE_REGEX)) {
            console.log('mes incorrecto')
            return
      }

      const year = parseInt(birthDeliverDate.split('-')[0])
      const month = parseInt(birthDeliverDate.split('-')[1])
      const day = parseInt(birthDeliverDate.split('-')[2])
      // const monthDays = new Date(year, month, 0).getDate()
    
       /* Comprobar que el mes no sea inferior al actual, el dia no se inferior al actual y el año solo sea el actual*/
       if ((day < CURRENT_DAY && month == CURRENT_MONTH) || (month < CURRENT_MONTH) || (year > CURRENT_YEAR || year < CURRENT_YEAR)) {
        return
      } 

      const year_return = parseInt(birthReturnDate.split('-')[0])
      const month_return = parseInt(birthReturnDate.split('-')[1])
      const day_return = parseInt(birthReturnDate.split('-')[2])
      // const monthDays_return = new Date(year, month, 0).getDate()

      if ((day_return <= day && month_return == CURRENT_MONTH) || (month_return < month) || (year_return > year || year_return < year)) {
        console.log("mes de retorno es invalido")
        return
      }
  
      this.rentDays(day, day_return);
      return true
  }

  public rentDays(day:number, day_return:number){
  this.totalRentDays = day_return - day;
  }

  public priceTotal(price_day:number, total_days:number){
    let price_total
  return  price_total = price_day * total_days;
  
   }

   public iva(price_total:number){
    const iva = 0.16;
    let price_iva;
    return price_iva = (price_total*iva)
   }

   public priceFinal(price_total:number, ivaTotal:number){
    let priceFinal;
    return priceFinal = price_total + ivaTotal
   }

   public valiDateOfBirth(dateOfBith:string){

    const CURRENT_YEAR = new Date().getFullYear() - 21
    console.log(CURRENT_YEAR)
    const date = dateOfBith


    const year = parseInt(date.split('-')[0])
    console.log(year)

    if(year > CURRENT_YEAR){
        return
    }
    return true
   }
}