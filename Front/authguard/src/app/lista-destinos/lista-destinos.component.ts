import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';



@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  
  destinos: DestinoViaje[] = [];

  constructor() { 
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {

  }

  idate: string = '';
  agregado(destino: DestinoViaje) { 
    console.log("Entro A AGREGADO")
    console.log(destino)
    this.destinos.push(destino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino:DestinoViaje){
    this.destinos.forEach(function (x){x.setSelected(false);});
    destino.setSelected(true);
  }
}
