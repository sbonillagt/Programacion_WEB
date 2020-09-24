import { Injectable } from '@angular/core';
import { dateISO } from 'ngx-custom-validators/src/app/date-iso/validator';
import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './models/destino-viaje';

@Injectable()
export class MyserviceService {
  destinos:DestinoViaje[];
  //actual:Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje> (null );


  // public nombreOrganizador:string,
  // public cantidadPersonas:number,
  // public nombreDestino:string,
  // public fechaInicial:Date,
  // public descripcion:string 

  constructor() { 
    this.destinos = [];
  }

  addDestino(iDestino:DestinoViaje){
    this.destinos.push(iDestino);
  }

  getAllDestinos():DestinoViaje[]{
    return this.destinos;
  }

  getByIdDestinos(id:string):DestinoViaje{
    return this.destinos[0];
    // return this.destinos.filter(function(destinos){return destinos.id.toString() === id;})[0];
  }



  checkUser(userName: string, password: string) {
    if (userName === 'admin' && password === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    } else {
      return false;
    }
  }
}
