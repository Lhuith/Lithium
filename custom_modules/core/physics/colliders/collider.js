import { component } from '/core/engine/component.js';

// Screen space collider, usually used for GUI operations
export class collider extends component {
    required = ["rigidbody"]

    constructor(g){
        super("planecollider")
        this.colliding = false

        if (g != undefined) {
            this.geometry = g
        }
    }

    init() {
        this.rigidbody = null
    }
    update(delta){
        if (this.geometry != undefined) {
            this.geometry.mat = this.get_parent().transform.get_inverse_transformation().to_three()
            this.geometry.update()
        }
    }
    intersects(o){
        if (this.geometry != undefined) {
            this.colliding = this.geometry.intersects(o)
            return this.colliding
        }
    }
    set_rigidbody(r) {
        this.rigidbody = r
        r.set_colliders(this)
    }
}