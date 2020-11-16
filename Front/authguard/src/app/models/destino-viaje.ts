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
    }
}


