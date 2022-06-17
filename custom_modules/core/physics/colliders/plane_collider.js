import {collider} from "./collider.js";

// Screen space collider, usually used for GUI operations
export class plane_collider extends collider {
    type = "plane_collider"
    required = ["rigidbody"]

    constructor(three){
        super("plane_collider")
        this.colliding = false
    }
    init() {
    }
    update(delta){
    }
}