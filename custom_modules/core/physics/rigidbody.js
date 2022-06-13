import { component } from '/core/data/component.js';
import {post_to_worker} from "./physics.js";

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
    set_requirement(r) {
        if(r.type === "transform"){
            this.set_transform(r)
        }

        let parent_temp = this.parent
        this.parent = null
        post_to_worker(this)
        this.parent = parent_temp
        //console.log(JSON.stringify(this))
    }
    set_transform(t) {
        this.transform = t
    }
    set_colliders(c) {
        this.colliders.push(c)
    }
    fixed_update(){
        console.log("fixed")
        if (this.parent != undefined) {
            this.parent.transform.position = this.transform.position
        }
        //post_to_worker(this)
    }
}