import { component } from '/core/engine/component.js';

// Screen space collider, usually used for GUI operations
export class planecollider extends component {
    type = "planecollider"
    required = ["rigidbody"]
    constructor(three){
        super("planecollider")
    }
    init() {
        this.rigidbody = null
    }
    update(delta){
    }
    set_rigidbody(r) {
        this.rigidbody = r
        r.set_colliders(this)
    }
    fixed_update(){
    }
    set_parent(p) {
        this.parent = null
    }
}