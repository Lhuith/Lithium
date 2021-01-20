import { component } from '/nomads/components/component.js';

import {ArrowHelper, Vector3} from '/build/three.module.js'

export class look_at extends component {
    type = "look_at"
    required = ["transform"];
    
    //!add error checks 
    constructor(three, t){
        super()
        this.target = t
        this.arrow_helper = new ArrowHelper()
        three.scene.add(this.arrow_helper)
    }
    update(delta){
        this.arrow_helper.setDirection(this.parent.transform.rotation.get_forward())
        // look at function 
        this.parent.transform.rotation = this.parent.transform.rotation.slerp(
            this.parent.transform.get_look_direction(this.target, new Vector3(0,1,0)), delta * 2, true);
    }
    set_look(t){
        this.target = t;
    }
    set_transform(t){
        this.transform = t;
    }
    set_requirement(r) {
        if(r.type == "transform"){
            this.set_transform(r);
        }
    }
    /*
            //this.objects[0].transform.rotation.y += 0.1;
        

        this.arrow_helper.position.copy(this.objects[1].transform.position);

        
        this.arrow_helper.setDirection(newRot.get_forward())

    */
}