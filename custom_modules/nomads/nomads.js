import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';
import { transform } from '/core/math/transform.js';
import { quaternion } from '/core/math/quaternion.js';
import { matrix } from '/core/math/matrix.js'

// game based variable setup
export const init = () => {
    console.log("%cNomads Initialized", "color:#FFE532");

    keyboard.init();
    physics.init();
    var trans = new transform()
    console.log(trans.type)
    var rot;
    var quart = new quaternion(1,1,1,1,null,null,rot)
    var mat = new matrix();
    console.log(mat.to_three())
    
}

export const update = (t) => {
    //console.log(t);
}
