import {get_game} from "/nomads/nomads.js"
import {crypt} from "../meta/helpers/utils.js";

export class component {
    type = this.constructor.name
    id = crypt.newId()

    required = [];
    constructor(n){
        this.name = n;
    }
    awake(){
        console.warn("default awake called, override if needed")
    }
    init(){
    }
    update(){
        console.warn("default component update.")
    }
    set_parent_reference(i){
        this.parent_reference_index = i;
        this.awake()
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