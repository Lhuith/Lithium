import { component } from '/core/engine/component.js';
import {register_body} from "./physics.js";

export class rigidbody extends component {
    type = "rigidbody"
    required = ["transform"];
    constructor(three){
        super("rigidbody")
        this.init()
    }
    init() {
        this.colliders = []
    }
    update(delta){
    }

    set_transform(r) {
        this.transform = r
        //register_body(this)
    }
    set_colliders(c) {
        this.colliders.push(c)
    }
    fixed_update(){
        //console.log("fixed", this.transform.position)
    }
}