import {collider} from "./collider.js";

// Screen space collider, usually used for GUI operations
export class plane_collider extends collider {
    required = ["rigidbody"]

    constructor(){
        super()
        this.colliding = false
    }

    init() {
    }
    update(delta){
    }
}