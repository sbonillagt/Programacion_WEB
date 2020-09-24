import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlContainer, ValidatorFn } from '@angular/forms';
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
      iPersonas: ['',Validators.required],
      iDestino: ['',Validators.required],
      fechaSeleccionada: ['',Validators.required],
      iDescripcion: ['',Validators.required],
    });
   }

  guardar(iNombreOrganizador:string, iPersonas:number, iDestino:string, fechaSeleccionada:Date, iDescripcion:string):boolean{
    let destino = new DestinoViaje(iNombreOrganizador,iPersonas,iDestino,fechaSeleccionada.toString(),iDescripcion);
    console.log(destino);
    this.onItemAdded.emit(destino)
    this.formGroupFormulario.reset();
    this.formGroupFormulario.controls.iNombreOrganizador.setErrors(null);
    this.formGroupFormulario.controls.iPersonas.setErrors(null);
    this.formGroupFormulario.controls.iDestino.setErrors(null);
    this.formGroupFormulario.controls.fechaSeleccionada.setErrors(null);
    this.formGroupFormulario.controls.iDescripcion.setErrors(null);
    this.step =0;
    return false;
  }

  nombreValidador(control: FormControl): {[salida: string]: boolean}{
    const input = control.value.toString().trim().length;
    if(input>0 && input <5){
      console.log("Es verdadero")
      return {nombreInvalido:true}
    }
    console.log("Es falso")
    return {nombreInvalido:false}
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
