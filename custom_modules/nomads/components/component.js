export class component {
    type = "component"
    constructor(n){
        this.name = n;
        this.parent = null;
    }
    init(){
    }
    update(){
        console.log("default component update.")
    }
    set_parent(p){
        this.parent = p;
        console.log("%c --component parent:","color:#7DC16D", p.name)
    }
}