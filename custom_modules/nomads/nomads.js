import { matrix } from '/core/math/matrix.js'
import { get_data } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js';
import { quadtree } from '/core/data/quadtree.js';
import { rectangle } from '/core/geometry/rectangle.js';

import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';
import { quaternion } from '/core/math/quaternion.js';
import { Vector3 } from '/build/three.module.js';
import { gameobject } from '/core/data/gameobject.js';
import { component } from '/nomads/components/component.js';

var show_data = false;

// game based variable setup
export const init = (data) => {
    console.log("%cNomads Initialized", "color:#FFE532");

    if(data.length != 0 && show_data) {
        console.log("%cData Loaded", "color:#1ED760")
        for(let page of data){
            console.log("%c -"+page.name, "color:#1C8D43")
        }
    }

    keyboard.init();
    physics.init();

    var object = new gameobject(
        "denis", 
        new Vector3(1,1,1), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    );

    object.add_child(
        new gameobject(
            "richard", 
            new Vector3(1,1,1), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)
        )
    );

    object.add_component(
        new component("jeff")
    )

    console.log(object)
}

export const update = (t) => {
    //console.log(t);
}
