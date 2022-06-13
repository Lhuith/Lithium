import { component } from '/core/data/component.js';
import { get_data } from '/core/data/antlion.js'
import * as THREE from '/build/three.module.js'
import {post_to_worker} from "./physics.js";

export class rigidbody extends component {
    type = "rigidbody"
    required = ["transform"];
    constructor(three){
        super("rigidbody")
        this.init()
    }
    init() {

    }
    update(delta){
    }
    set_requirement(r) {
        if(r.type === "transform"){
            this.set_transform(r)
        }
        var parent_temp = this.parent
        this.parent = null
        post_to_worker(this)
        this.parent = parent_temp
        //console.log(JSON.stringify(this))
    }
    set_transform(t) {
        this.transform = t
    }
    fixed_update(){
        if (this.parent != undefined) {
            this.parent.transform.position = this.transform.position
        }
    }
}