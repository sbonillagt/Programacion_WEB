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
  //actual:Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje> (null );


  // public nombreOrganizador:string,
  // public cantidadPersonas:number,
  // public nombreDestino:string,
  // public fechaInicial:Date,
  // public descripcion:string 

  constructor(private http: HttpClient) { 
    this.destinos = [];
  }

  addDestino(iDestino:DestinoViaje): Observable<DestinoViaje>{
    this.destinos.push(iDestino);

    // {
    //   "nombreOrganizador": iDestino.nombreOrganizador,
    //   "cantidadPersonas": iDestino.cantidadPersonas,
    //   "nombreDestino": iDestino.nombreDestino,
    //   "fechaInicial": iDestino.fechaInicial,
    //   "descripcion": iDestino.descripcion
    // }

    // console.log("Imprmiendo desde addDestino "+ iDestino.descripcion)
    // this.http.post(`${API}/post`, iDestino).subscribe(
    //   (response)=> console.log(response),
    //   (error)=> console.log(error)
    // );

    return this.http.post<DestinoViaje>(`${API}/post`, iDestino);

  }

  deleteItem(iDestino:DestinoViaje){
    this.http.delete(`${API}/post/${iDestino.id}`,).subscribe(
      (response)=> console.log(response),
      (error)=> console.log(error)
    );
  }

  // getAllDestinos():DestinoViaje[]{
  //   return this.destinos;
  // }

  getAllDestinos(): Observable<DestinoViaje[]>{
    //Agarra toda la información del los post
    // this.http.get(`${API}/posts`).subscribe((res:any)=>{
    //   console.log(res);
    //   this.destinos = res;
    // }, err => console.log(err)
    // );
    return this.http.get<DestinoViaje[]>(`${API}/posts`);
  }

  // getByIdDestinos(id:string):DestinoViaje{
  //   this.http.get(`${API}/post/${id}`).subscribe((res:any)=>{
  //     console.log(res);
  //     //this.destinos = res;
  //     this.unDestino=res;
  //   }, err => console.log(err)
  //   );

  //   return this.unDestino;
  //   //return this.destinos[0];
  //   // return this.destinos.filter(function(destinos){return destinos.id.toString() === id;})[0];
  // }

  getByIdDestinos(id:string):Observable<DestinoViaje>{
    // this.http.get(`${API}/post/${id}`).subscribe((res:any)=>{
    //   console.log(res);
    //   //this.destinos = res;
    //   this.unDestino=res;
    // }, err => console.log(err)
    // );

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
