import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {DestinoViaje} from 'src/app/models/destino-viaje';
import { MyserviceService } from '../myservice.service';
import { RespuestaDestinoViajes} from 'src/app/models/respuesta-destino-viajes';
import { Router} from '@angular/router';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  @Output() onItemEditado: EventEmitter<DestinoViaje>;
  @Output() onDelete: EventEmitter<DestinoViaje>;
  @Output() onEditForm: EventEmitter<DestinoViaje>;
  
  destinos: DestinoViaje[];

  constructor(private servicio:MyserviceService,
              private _router:Router) { 
    this.onItemAdded = new EventEmitter();
    this.onItemEditado = new EventEmitter();
    this.onDelete =  new EventEmitter();
    this.onEditForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos(){
    //this.destinos = this.servicio.getAllDestinos();

    this.servicio.getAllDestinos().subscribe((res:any)=>{
      console.log(res);
      this.destinos  = res;
    }, err => console.log(err)
    );

    // let dateT=  new Date(this.destinos[1].fechaInicial);
    // console.log(dateT.getDate());
    // console.log(dateT.getFullYear());
    // console.log(dateT.getMonth().valueOf()+1);
    
  }

  eliminarDestino(onDelete:DestinoViaje){
    this.servicio.deleteItem(onDelete);
    this.obtenerTodos();
    console.log(onDelete);
  }

  idate: string = '';
  agregado(destino: DestinoViaje) { 
    
    this.servicio.addDestino(destino).subscribe(
      (response)=>{
        console.log(response)
        this.destinos.push(response);
      },
      (error)=> console.log(error)
    );

    this.obtenerTodos();
    //this.ngOnInit();
    //this.destinos.push(destino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino:DestinoViaje){
    //this.destinos.forEach(function (x){x.setSelected(false);});
    //destino.setSelected(true);
  }

  editarViaje(destino: DestinoViaje){
    console.log("Esto vamos a edaitar");
    console.log(destino);
    this._router.navigate(['/edit',destino.id]);
  }

  borrar(destino:DestinoViaje){
    console.log(destino);

  }
}
