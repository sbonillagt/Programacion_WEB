import { Component, OnInit, Input, EventEmitter, Output, HostBinding,ViewChild } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { FormDestinoViajeComponent } from '../form-destino-viaje/form-destino-viaje.component';
import { ListaDestinosComponent } from '../lista-destinos/lista-destinos.component';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino!: DestinoViaje;
  @Input('idx') position: number | undefined;
  @Output() onDelete: EventEmitter<DestinoViaje>;
  @Output() onItemEditado: EventEmitter<DestinoViaje>;

  // @HostBinding('attr.class') cssClass = '33.33%';
  constructor(private servicio:MyserviceService) { 
    this.onDelete = new EventEmitter();
    this.onItemEditado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  editarViaje(idestino:DestinoViaje){
    this.onItemEditado.emit(idestino);
    return false;
  }

  borrarDestino(destino:DestinoViaje){
    this.onDelete.emit(destino);
    return false;
  }
}
