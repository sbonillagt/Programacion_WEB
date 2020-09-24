export class DestinoViaje {
    //private selected: boolean =false;
    //public servicios: string[];
    constructor(
        //public id:number,
        public nombreOrganizador:string,
        public cantidadPersonas:number,
        public nombreDestino:string,
        public fechaInicial:String,
        public descripcion:string ){
            //this.servicios = ['Pileta','Desayuno'];
    }
    // isSelected():boolean{
    //     return this.selected;
    // }
    // setSelected(val:boolean){
    //     this.selected = val;
    // }
    obtenerFecha(){
        var date = new Date (this.fechaInicial.toString());
        return date;
    }
}


