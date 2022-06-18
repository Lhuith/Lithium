import {collider} from "./collider.js";

// Screen space collider, usually used for GUI operations
export class plane_collider extends collider {
    required = ["rigidbody"]

    constructor(){
        super("plane_collider")
        console.log(this.type)
        this.colliding = false
    }

    init() {
    }
    update(delta){
    }
}