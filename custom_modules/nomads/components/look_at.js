import { component } from '/core/engine/component.js'

import {ArrowHelper, Vector3} from '/build/three.module.js'
import {get_game} from "../nomads.js";

export class look_at extends component {
    constructor(t){
        super()
        this.target = t
        this.arrow_helper = new ArrowHelper()
        get_game().get_three().scene.add(this.arrow_helper)
    }
    update(delta){
        this.arrow_helper.setDirection(this.get_parent().transform.rotation.get_forward())
        this.arrow_helper.position.copy(this.get_parent().transform.position)

        // look at function 
        this.get_parent().transform.rotation = this.get_parent().transform.rotation.slerp(
            this.get_parent().transform.get_look_direction(
                this.target, new Vector3(0,1,0)), delta * 2, true)
    }
    set_look(t){
        this.target = t
    }
}