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
  @Output() onItemEditToSave: EventEmitter<DestinoViaje>;
  destinos: DestinoViaje[];

  constructor(private servicio:MyserviceService,
      private routes: Router) { 
    this.onItemAdded = new EventEmitter();
    this.onItemEditado = new EventEmitter();
    this.onDelete =  new EventEmitter();
    this.onEditForm = new EventEmitter();
    this.onItemEditToSave = new EventEmitter();
  }

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos(){
    this.servicio.getAllDestinos().subscribe((res:DestinoViaje[])=>{
      console.log(res);
      this.destinos  = res;
    }, err => console.log(err)
    );
  }

  eliminarDestino(onDelete:DestinoViaje){
    this.servicio.deleteItem(onDelete).subscribe((res:any)=>{
      console.log(res);
      this.obtenerTodos()
    }, err => console.log(err)
    );;

    console.log(onDelete);
    //this._router.navigate(['/destino']);
    //this.obtenerTodos();
    //console.log(onDelete);
    //this.destinos[this.destinos.findIndex(x => x.id == onDelete.id)];
    //this.routes.navigate(['/destino']);
    
  }

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

  itemAEditar(destino: DestinoViaje){
  this.destinos[this.destinos.findIndex(x => x.id == destino.id)] = destino;
  this.servicio.editByID(destino);
  //this.routes.navigate(['/destino']);
  }

  editarViaje(destino: DestinoViaje){
    console.log("Esto vamos a edaitar");
    console.log(destino);
    this.routes.navigate(['/edit',destino.id]);
    
  }
}
