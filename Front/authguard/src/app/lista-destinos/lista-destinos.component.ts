import { Component, OnInit } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  destinos: DestinoViaje[];
  constructor() { 
     this.destinos = [];
  }

  guardar(iNombreOrganizador:string, ipersonas:number, iDestino:string,iFecha:Date): boolean {
    console.log(this.destinos);
    this.destinos.push(new DestinoViaje(iNombreOrganizador,ipersonas,iDestino,iFecha));

    return false;
  }

  

  elegido(d:DestinoViaje){
    this.destinos.forEach(function (x){x.setSelected(false);});
    d.setSelected(true);
  }

  ngOnInit(): void {
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
