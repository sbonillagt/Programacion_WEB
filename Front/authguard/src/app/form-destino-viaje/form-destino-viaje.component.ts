import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ControlContainer, ValidatorFn } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DestinoViaje } from '../models/destino-viaje';
import { ActivatedRoute} from '@angular/router';
import { param } from 'jquery';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.scss']
})
export class FormDestinoViajeComponent implements OnInit {
@Output() onItemAdded: EventEmitter<DestinoViaje>;
@Output() onItemEditToSave: EventEmitter<DestinoViaje>;

esEdicion: boolean;
formGroupFormulario: FormGroup;
fechaDestino: Date;

  constructor(private servicio:MyserviceService,
              formBuilderFormulario: FormBuilder,
              private route:ActivatedRoute) {
    this.onItemAdded = new EventEmitter();
    this.onItemEditToSave = new EventEmitter();
    this.formGroupFormulario = formBuilderFormulario.group({
      iNombreOrganizador: ['', Validators.required],
      iPersonas: ['',Validators.required],
      iDestino: ['',Validators.required],
      fechaSeleccionada: ['',Validators.required],
      iDescripcion: ['',Validators.required],
      idBase:[]
    });
   }

  guardar(iNombreOrganizador:string, iPersonas:number, iDestino:string, fechaSeleccionada:Date, iDescripcion:string, idBase:string):boolean{
    console.log(fechaSeleccionada.toISOString());
    let destino = new DestinoViaje(iNombreOrganizador,iPersonas,iDestino,fechaSeleccionada.toISOString(),iDescripcion,1,idBase);
    console.log(destino);
    if(idBase==null){
    this.onItemAdded.emit(destino)
    }else{
      console.log("Vamonos a editar este tema ")
      this.onItemEditToSave.emit(destino)
      //this.servicio.editByID(destino);
    }

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

  editarViaje(idestino:DestinoViaje){
    console.log("Entrando a edición de viajes")
    //this.esEdicion = true; // Boleano para verificar si es edición

    this.fechaDestino = new Date(idestino.fechaInicial)

    this.formGroupFormulario.patchValue({
      iNombreOrganizador: idestino.nombreOrganizador,
      iPersonas: idestino.cantidadPersonas,
      iDestino: idestino.nombreDestino,
      iDescripcion: idestino.descripcion,
      fechaSeleccionada: this.fechaDestino,
      idBase: idestino.id
    });

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{
      const destinoI= params.get('id');
      if (destinoI){
        //this.editarViaje(this.servicio.getByIdDestinos(destinoI.toString()))
        this.servicio.getByIdDestinos(destinoI.toString()).subscribe((res:DestinoViaje)=>{
          console.log(res);
          this.editarViaje(res);
        }, err => console.log(err)
        );;
        
      }
    })

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
