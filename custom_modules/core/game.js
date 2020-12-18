import { matrix } from '/core/math/matrix.js'
import { get_data, get_meta, get_renderers} from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js';
import { quadtree } from '/core/data/quadtree.js';
import { rectangle } from '/core/geometry/rectangle.js';

import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';
import { quaternion } from '/core/math/quaternion.js';
import { Vector3 } from '/build/three.module.js';
import { gameobject } from '/core/data/gameobject.js';
import { component } from '/nomads/components/component.js';
import { sprite, solid, particle } from '/nomads/components/decomposer.js';

import { animator } from '/nomads/components/animation/animator.js';
import { animation_sequence } from '/nomads/components/animation/animation_sequence.js';
import { animation } from '/nomads/components/animation/animation.js';

import * as sky from '/nomads/systems/sky.js'
export class game {
    constructor(n){
        this.name = n
        this.objects = []
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
        sky.init();
        
        var object = new gameobject(
            "denis", 
            new Vector3(0,0.5,0), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1, null, null, null)
        );
        object.add_component(sprite(get_meta().crab))

        object.add_component(new animator([
            new animation_sequence("walk", [new animation("walk", 0, 3)], 2, true), 
            new animation_sequence("death", [ new animation("dead_start", 3, 3), 
            new animation("dead_end", 6, 1)], 2, false)]));

        var npc = new gameobject("steve", 
        new Vector3(0.5,0.5,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null))

        npc.add_component(sprite(get_meta().lithy));
        npc.add_component( new animator([
                new animation_sequence("idle", [new animation("idle", 0, 4)], 8, true),
                new animation_sequence("wave", [new animation("wave", 4, 2)], 8, true)]));

        this.objects.push(object);
        this.objects.push(npc);
    }
    update(delta){
        this.time += delta;
        for (let o of this.objects){
            o.update(delta);
        }
        sky.update(delta);
    }
    get_time(){
        return this.time;
    }
}