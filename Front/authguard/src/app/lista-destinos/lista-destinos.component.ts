import { Component, OnInit } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  fechaSeleccionada: Date;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

  }

  destinos: DestinoViaje[] = [];

  constructor() { 
  }

  idate: string = '';
  guardar(iNombreOrganizador:string, ipersonas:number, iDestino:string,ifecha:Date,idescripcion:string): boolean {
    
 
    this.destinos.push(new DestinoViaje(iNombreOrganizador,ipersonas,iDestino,ifecha,idescripcion));
    console.log(this.destinos);

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
