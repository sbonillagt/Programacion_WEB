import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DestinoViaje } from '../models/destino-viaje';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
@Output() onItemAdded: EventEmitter<DestinoViaje>;

formGroupFormulario: FormGroup;

  constructor(formBuilderFormulario: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.formGroupFormulario = formBuilderFormulario.group({
      iNombreOrganizador: ['', Validators.required],
      iPersonas: [''],
      iDestino: [''],
      fechaSeleccionada: ['',Validators.required],
      iDescripcion: [''],
    });
   }

  guardar(iNombreOrganizador:string, iPersonas:number, iDestino:string, fechaSeleccionada:Date, iDescripcion:string):boolean{
    let destino = new DestinoViaje(iNombreOrganizador,iPersonas,iDestino,fechaSeleccionada,iDescripcion);
    this.onItemAdded.emit(destino)
    return false;
  }

  ngOnInit(): void {
  }

  fechaSeleccionada: Date;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
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
