export class component {
    type = "component"
    required = [];
    
    constructor(n){
        this.name = n;
        this.parent = null;
    }
    init(){
    }
    update(){
        console.warn("default component update.")
    }
    set_parent(p){
        this.parent = p;
    }
    set_requirement(r){
        console.warn("default component requirment set.")
    }
}