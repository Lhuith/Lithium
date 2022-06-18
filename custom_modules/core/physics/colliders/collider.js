import { component } from '/core/engine/component.js';

// Screen space collider, usually used for GUI operations
export class collider extends component {
    required = ["rigidbody"]

    constructor(){
        super("planecollider")
        this.colliding = false
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
}