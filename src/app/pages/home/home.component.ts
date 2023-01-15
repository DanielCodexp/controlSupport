import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { FormbHelper } from 'src/app/helper/form-helper';
import { DatosCars } from 'src/app/interface/cars-interface';
import { Country } from 'src/app/interface/countries';
import { DatosRequest, DatosService, DatosUser } from 'src/app/interface/UserProfile';
import { RoutePath } from 'src/app/phats/route-path.constant';
import { CarsService } from 'src/app/services/cars.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    public sharedService: SharedService,
    private carService: CarsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      direccionCordoba: ["",[]],
      direccionOrizaba: ["",[]],
      fechaEntrega: [, [Validators.required]]
    });
    this.formDataUser = fb.group({
      name:[, [Validators.required, Validators.minLength(1)]],
      surname:[, [Validators.required, Validators.minLength(1)]],
      cel:[, [Validators.required, Validators.minLength(10)]],
      email:[, [Validators.required, Validators.email]],
      description:[, [Validators.required, Validators.maxLength(150)]],
    });
   }

  ngOnInit(): void {

    this.isMobile = this.sharedService.isMobile;
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
    if(!this.validationDate(this.form.get("fechaEntrega")?.value)){
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

  public async reservar(marca: string) {
   
    let direc;
    if (this.ciudadEntrega == 'cordoba') {
      direc = this.form.get("direccionCordoba")?.value
    } else if (this.ciudadEntrega == 'orizaba') {
      direc = this.form.get("direccionOrizaba")?.value
    }
    // const responseCar = await this.carService.getCarByOrder(id)
    // this.carByUser = responseCar
   
    const data: DatosRequest = {
      auto: marca,
      ciudad: this.ciudadEntrega,
      direccion: direc,
      fechaEntrega:  this.form.get("fechaEntrega")?.value

    }

    this.datos = [data]
console.log(this.datos)
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
    
   
    const dataUser: DatosUser = {
      name:this.formDataUser.get("name")?.value,
      surname:this.formDataUser.get("surname")?.value,
      
      cel:this.formDataUser.get("cel")?.value,
      email:this.formDataUser.get("email")?.value,
      
      numOrder:this.getRandomIntInclusive(10000,1000000),
      
      description: this.formDataUser.get("description")?.value
    }
   
   
   
    const returnedTarget = Object.assign(this.datos[0], dataUser);

    console.log(returnedTarget)
    
     this.carService.addCars(returnedTarget)
   
        .then(response => {

          console.log(response)
           this.router.navigate([`/${RoutePath.CONFIRMATION_PATH}`],{ queryParams: { order: response.id} });
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

 
   public validationDate(DeliverDate:string){
    
    const DATE_REGEX = /^(19|20)(((([02468][048])|([13579][26]))-02-29)|(\d{2})-((02-((0[1-9])|1\d|2[0-8]))|((((0[13456789])|1[012]))-((0[1-9])|((1|2)\d)|30))|(((0[13578])|(1[02]))-31)))$/
    
    const CURRENT_YEAR = new Date().getFullYear()
    const CURRENT_DAY = new Date().getDate();
    const CURRENT_MONTH = new Date().getMonth() + 1;
    const birthDeliverDate = DeliverDate

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
  
      return true
  }


}
