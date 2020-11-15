import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { MyserviceService } from '../myservice.service';
import { RespuestaDestinoViajes} from 'src/app/models/respuesta-destino-viajes';



@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  @Output() onItemEditado: EventEmitter<DestinoViaje>;
  @Output() onDelete: EventEmitter<DestinoViaje>;

  destinos: DestinoViaje[];

  constructor(private servicio:MyserviceService) { 
    this.onItemAdded = new EventEmitter();
    this.onItemEditado = new EventEmitter();
    this.onDelete =  new EventEmitter();
  }

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos(){
    this.destinos = this.servicio.getAllDestinos();
    // let dateT=  new Date(this.destinos[1].fechaInicial);
    // console.log(dateT.getDate());
    // console.log(dateT.getFullYear());
    // console.log(dateT.getMonth().valueOf()+1);
    console.log("Prueba SACAR FECHA");
  }

  eliminarDestino(onDelete:DestinoViaje){
    this.servicio.deleteItem(onDelete);
    this.obtenerTodos();
    console.log(onDelete);
  }

  idate: string = '';
  agregado(destino: DestinoViaje) { 
    
    this.servicio.addDestino(destino);
    //this.destinos.push(destino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino:DestinoViaje){
    //this.destinos.forEach(function (x){x.setSelected(false);});
    //destino.setSelected(true);
  }

  editarViaje(destino: DestinoViaje){
    console.log("Esto vamos a edaitar");
    console.log(destino);
  }

  borrar(destino:DestinoViaje){
    console.log(destino);

  }
}
