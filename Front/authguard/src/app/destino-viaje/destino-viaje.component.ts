import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino!: DestinoViaje;
  @Input('idx') position: number | undefined;
  @Output() clicked: EventEmitter<DestinoViaje>;
  // @HostBinding('attr.class') cssClass = '33.33%';
  constructor() { 
    this.clicked=new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino)
    return false;
  }

  borrarDestino(destino:DestinoViaje){
    console.log(destino);
}
}
