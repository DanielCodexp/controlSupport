import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DatosCars } from '../interface/cars-interface';
import { Country, Time } from '../interface/countries';
import { Faq } from '../interface/faq';
import { DatosRequest, DatosService } from '../interface/UserProfile';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private firetore: Firestore, private baseService: BaseService) { }

  // public getFaq(): Observable<Faq []>{
  //   return this.baseService.get('assets/json/faq.json');
  // }
  
  // public getCountryNames(): Observable<Country []>{
  //   return this.baseService.get('assets/json/countries.json');
  // }

  // public getTime(): Observable<Time []>{
  //   return this.baseService.get('assets/json/time.json');
  // }
// Agregar un carro 
  addCars(car:DatosService){
    const carRef = collection(this.firetore, 'report-info');
    return addDoc(carRef, car);
  }
// Traer carros disponible
  // getCars(): Observable<DatosCars[]> {
  //   const carRef = collection(this.firetore, 'car');
  //   return collectionData(carRef, {idField: 'id'}) as Observable<DatosCars[]>;
  // }


    async getOrder(id:string) {
     const carDocRef = doc(this.firetore, "rent-info", id);
     return getDoc(carDocRef)
     .then((doc) => {
       return doc.data()
     })
   }

  // async getCarByOrder(id:string) {
  //   const carDocRef = doc(this.firetore, "car", id);
  //   return getDoc(carDocRef)
  //   .then((doc) => {
  //     return doc.data()
  //   })
  // }


  //Borrar cita
  // deleteCar(car: DatosRequest){
  //   const carDocRef = doc(this.firetore, `car/${car.id}`);
  //   return deleteDoc(carDocRef);
  // }


  //Cambiar estado de auto disponible

  updateAvaible(id: string){
    const carDocRef = doc(this.firetore, "car", id);
 return updateDoc(carDocRef,{
  available: false
 })
  }
}
