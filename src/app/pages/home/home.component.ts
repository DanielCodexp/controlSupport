import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosCars } from 'src/app/interface/cars-interface';
import { Country } from 'src/app/interface/countries';
import { DatosRequest, DatosService } from 'src/app/interface/UserProfile';
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
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      direccionCordoba: ["",[]],
      direccionOrizaba: ["",[]],
      fechaEntrega: [, [Validators.required]]
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

}
