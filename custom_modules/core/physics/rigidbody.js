import { component } from '/core/engine/component.js';
import {register_body} from "./physics.js";
import {transform} from "../math/transform.js";

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
        register_body(this)
    }
    set_colliders(c) {
        this.colliders.push(c)
    }
    fixed_update(){
        if (this.get_parent() != undefined) {
            this.get_parent().transform.position.set(
                this.transform.position.x, this.transform.position.y, this.transform.position.z)
        }
        //console.log("fixed", this.transform.position)
    }
}