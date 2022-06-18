import {collider} from "./collider.js";
import {rectangle} from "../../geometry/rectangle.js";

// Screen space collider, usually used for GUI operations
export class plane_collider extends collider {
    required = ["rigidbody"]

    constructor(w, h){
        super(new rectangle(0,0, w, h))
        this.colliding = false
    }
    init() {
    }
}