import {Vector3} from '/build/three.module.js';

export class transform  {
    type = "transform"
    // p : position
    // s : scale
    // r : rotation (custom quaternion class)
    constructor(p, s, r){
        this.position = p;
        this.scale = s;
        this.rotation = r;

        this.old_position = new Vector3(0,0,0)
        this.old_scale = new Vector3(1,1,1)
        this.old_rotation = new Vector3(0,0,0)
    }


}