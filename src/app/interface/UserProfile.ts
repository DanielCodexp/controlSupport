export interface DatosService{
    id?:string;
    auto: string;
    ciudad: string;
    direccion: boolean;
    fechaEntrega: string;
    fechaDevolucion: string;
    horaEntrega: string;
    horaDevolucion: string;
    edad: string;
    url: string;
    name:string;
    surname:string;
    country:string;
    cel:string;
    email:string;
    bithDate:string;
    codigo:boolean;
    codeProm:string;
    terms:boolean;
    numOrder:number;
    totalRentDays:number;
    priceTotalByDays:number;
    ivaTotal:number;
    priceFinal: number;
    numCard: number;
    expCard:number;
}

export interface DatosRequest{
    id?:string;
    auto: string;
    ciudad: string;
    direccion: boolean;
    fechaEntrega: string;
    fechaDevolucion: string;
    horaEntrega: string;
    horaDevolucion: string;
    edad: string;
    url: string;
    codigo:boolean;
    codeProm:string;
    totalRentDays:number;
}

export interface DatosUser{
    name:string;
    surname:string;
    country:string;
    cel:string;
    email:string;
    bithDate:string;
    terms:boolean;
    iDCarByUser: string;
    numOrder:number;
    priceTotalByDays:number;
    ivaTotal:number;
    priceFinal: number;
    numCard: number;
    expCard:number;
}
