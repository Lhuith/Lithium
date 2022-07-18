import {collider} from "./collider.js";
import {rectangle} from "../../geometry/rectangle.js";
import {plane_collider_helper} from "./utils/plane_collider_helper.js";

// Screen space collider, usually used for GUI operations
export class plane_collider extends collider {
    required = ["rigidbody"]

    constructor(w, h){
        super(new rectangle(0,0, w, h))
        this.colliding = false
        this.helper = new plane_collider_helper()
        console.log(this.helper)
    }
    awake(){
        console.log("calling awake? override")
        if(this.helper != undefined) {
            this.helper.set_mat(this.get_parent().transform.get_transformation().to_three())
        }
    }
    init() {
    }
}