import {get_game} from "/nomads/nomads.js"

export class component {
    type = this.constructor.name
    required = [];
    constructor(n){
        this.name = n;
    }
    init(){
    }
    update(){
        console.warn("default component update.")
    }
    set_parent_reference(i){
        this.parent_reference_index = i;
    }
    get_parent(){
        return get_game().current_scene.get_object(this.parent_reference_index)
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