export class DestinoViaje {
    private selected: boolean =false;
    public servicios: string[];
    constructor(public nombreOrganizador:string, public cantidadPersonas:number,public nombreDestino:string, public fechaInicial:Date ){
        this.servicios = ['Pileta','Desayuno'];
    }
    isSelected():boolean{
        return this.selected;
    }
    setSelected(val:boolean){
        this.selected = val;
    }
}
