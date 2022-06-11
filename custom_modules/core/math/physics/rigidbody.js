import { component } from '/core/data/component.js';
import { get_data } from '/core/data/antlion.js'
import * as THREE from '/build/three.module.js'

export class rigidbody extends component {
    type = "rigidbody"
    required = ["transform"];
    constructor(three){
        super()
    }
    init(){
    }
    update(delta){
    }
    set_requirement(r) {
        if(r.type === "transform"){
            this.set_transform(r)
        }
    }
    set_transform(t) {
        this.transform = t
    }
}