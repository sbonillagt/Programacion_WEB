import { Injectable } from '@angular/core';
import { dateISO } from 'ngx-custom-validators/src/app/date-iso/validator';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { DestinoViaje } from './models/destino-viaje';
import { RespuestaDestinoViajes} from './models/respuesta-destino-viajes';
import { data } from 'jquery';

const API: string = "https://yoqiypo3o5.execute-api.us-east-1.amazonaws.com/dev"
//const KEY: string = '123456$#@$^@1ERF';

@Injectable()
export class MyserviceService {
  destinos:DestinoViaje[];
  unDestino:DestinoViaje;

  constructor(private http: HttpClient) { 
    this.destinos = [];
  }

  addDestino(iDestino:DestinoViaje): Observable<DestinoViaje>{
    this.destinos.push(iDestino);
    return this.http.post<DestinoViaje>(`${API}/post`, iDestino);

  }

  deleteItem(iDestino:DestinoViaje){
    this.http.delete(`${API}/post/${iDestino.id}`,).subscribe(
      (response)=> console.log(response),
      (error)=> console.log(error)
    );
  }

  getAllDestinos(): Observable<DestinoViaje[]>{
    //Agarra toda la información del los post
    return this.http.get<DestinoViaje[]>(`${API}/posts`);
  }

  getByIdDestinos(id:string):Observable<DestinoViaje>{
    return this.http.get<DestinoViaje>(`${API}/post/${id}`);
    //return this.destinos[0];
    // return this.destinos.filter(function(destinos){return destinos.id.toString() === id;})[0];
  }

  editByID(idestino:DestinoViaje){
    let idBase = idestino.id;
    this.http.put(`${API}/post/${idBase}`,idestino).subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=> console.log(error)
    );
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
