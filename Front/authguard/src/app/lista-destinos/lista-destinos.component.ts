import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { MyserviceService } from '../myservice.service';




@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  
  destinos: DestinoViaje[];

  constructor(private servicio:MyserviceService) { 
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
    this.obtenerTodos()
  }

  obtenerTodos(){
    this.destinos = this.servicio.getAllDestinos();
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

  borrar(destino:DestinoViaje){
    console.log(destino);

  }
}
