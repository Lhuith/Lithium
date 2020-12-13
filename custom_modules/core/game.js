import { matrix } from '/core/math/matrix.js'
import { get_data, get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js';
import { quadtree } from '/core/data/quadtree.js';
import { rectangle } from '/core/geometry/rectangle.js';

import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';
import { quaternion } from '/core/math/quaternion.js';
import { Vector3 } from '/build/three.module.js';
import { gameobject } from '/core/data/gameobject.js';
import { component} from '/nomads/components/component.js';
import { sprite } from '/nomads/components/decomposer.js';

import { animator } from '/nomads/components/animation/animator.js';
import { animation_sequence } from '/nomads/components/animation/animation_sequence.js';
import { animation } from '/nomads/components/animation/animation.js';

export class game {
    constructor(n){
        this.name = n
    }
    init(data){
        this.show_data = false;
        this.time = 0;

        console.log("%c"+this.name+" Initialized", "color:#FFE532");

        if(data.length != 0 && this.show_data) {
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
        object.add_component(sprite(get_meta().crab))
        object.add_child(
            new gameobject(
                "richard", 
                new Vector3(1,1,1), 
                new Vector3(1,1,1), 
                new quaternion(0,0,0,1)
            )
        );
        var anim =  new animator([new animation_sequence("walk", [new animation("walk", 0, 3)], 2, true)])
        object.add_component(anim)
        
        console.log(object)
        console.log(anim)
    }
    update(delta){
        this.time += delta;
    }
    get_time(){
        return this.time;
    }
}