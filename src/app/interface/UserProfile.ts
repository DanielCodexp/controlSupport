export interface DatosService{
    id?:string;
    auto: string;
    ciudad: string;
    direccion: boolean;
    fechaEntrega: string;
    

    name:string;
    surname:string;

    cel:string;
    email:string;
  description:string;
    numOrder:number;
 
}

export interface DatosRequest{
    id?:string;
    auto: string;
    ciudad: string;
    direccion: boolean;
    fechaEntrega: string;
    url: string;
}

export interface DatosUser{
    name:string;
    surname:string;
    cel:string;
    email:string;
    numOrder:number;
    description:string;
   
}
