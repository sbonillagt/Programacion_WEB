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
  eventsDates: string[] = [];
  form: FormGroup;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.eventsDates.push(`${type}: ${event.value}`);
  }

  destinos: DestinoViaje[];
  constructor(private fb:FormBuilder) { 
     this.destinos = [];
  }
  idate: string = '';
  guardar(iNombreOrganizador:string, ipersonas:number, iDestino:string,idescripcion:string): boolean {
    
    // this.idate= this.events.pop();
    //this.idate = this.eventsDates.pop.toString();
    this.destinos.push(new DestinoViaje(iNombreOrganizador,ipersonas,iDestino,this.eventsDates.pop.toString(),idescripcion));
    console.log(this.destinos);

    return false;
  }
  

  elegido(d:DestinoViaje){
    this.destinos.forEach(function (x){x.setSelected(false);});
    d.setSelected(true);
  }

  ngOnInit(): void {
    this.form =this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      })
    })
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
