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
        console.warn("default component requirement set.")
    }
    predefine_requirement_setters(){
        for(let i = 0; i < this.required.length; i++) {
            let evalParse = 'this.set_'+this.required+" = (r) => { this." + this.required + " = r }"
            eval(evalParse)
        }
    }
}