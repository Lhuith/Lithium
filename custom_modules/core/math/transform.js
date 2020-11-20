import {Vector3} from '/build/three.module.js';

export class transform  {
    type = "transform"
    // p : position
    // s : scale
    // r : rotation (custom quaternion class)
    constructor(p, s, r){
        self.position = p;
        self.scale = s;
        self.rotation = r;

        self.old_position = new Vector3(0,0,0)
        self.old_scale = new Vector3(1,1,1)
        self.old_rotation = new Vector3(0,0,0)
    }


}