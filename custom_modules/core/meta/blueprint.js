import {get_game} from "../../nomads/nomads.js";

export class base {
    type = this.constructor.name
    constructor(){
    }
    init(){
        console.warn("base init called, override!")
    }
    set_parent_reference(i) {
        this.parent_reference_index = i
    }
    get_parent(){
        return get_game().current_scene.get_object(this.parent_reference_index)
    }
    update(delta){
        console.warn("base update called, override!")
    }
    information(){
        console.log(this)
    }
}