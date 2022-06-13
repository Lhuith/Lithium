import { component } from '/core/data/component.js';

// Screen space collider, usually used for GUI operations
export class planecollider extends component {
    type = "planecollider"
    required = {
        "rigidbody" : this.set_rigidbody
    };
    constructor(three){
        super("planecollider")
        this.init()
    }
    init() {
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