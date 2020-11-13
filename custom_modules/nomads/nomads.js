import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';

import {Vector3} from '/build/three.module.js';

// game based variable setup
export const init = () => {
    console.log("hello world!");

    keyboard.init();
    physics.init();
}

export const update = (t) => {
    //console.log(t);
    console.log(keyboard.input.shift)
}
