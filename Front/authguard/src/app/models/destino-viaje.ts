export class DestinoViaje {
    //private selected: boolean =false;
    //public servicios: string[];
    
    public dateFormat: Date;
    constructor(
        //public id:number,
        public nombreOrganizador:string,
        public cantidadPersonas:number,
        public nombreDestino:string,
        public fechaInicial:string,
        public descripcion:string,
        public userID:number,
        public id:string ){
            //this.servicios = ['Pileta','Desayuno'];
    }
    // isSelected():boolean{
    //     return this.selected;
    // }
    // setSelected(val:boolean){
    //     this.selected = val;
    // }

    public obtenerFecha(){
        // console.log("Desde el metodo ObtenerFecha()")
        // this.dateFormat = new Date (this.fechaInicial.toString());
        // console.log(this.fechaInicial);
        // console.log(this.dateFormat);
        // console.log('Fecha: '+ this.dateFormat.getFullYear)
        // return this.dateFormat;

        //return this.fechaInicial;


        var date = new Date (this.fechaInicial.toString());
        return date;
    }
}


