import { get_meta} from '/core/data/antlion.js'
import * as physics from '/core/physics/physics.js';
import * as keyboard from '/core/input/keyboard.js';
import { quaternion } from '/core/math/quaternion.js';
import { Vector3 } from '/build/three.module.js';
import { gameobject } from '/core/data/gameobject.js';
import { sprite, solid, particle } from '/nomads/components/decomposer.js';
import { animator } from '/nomads/components/animation/animator.js';
import { animation_sequence } from '/nomads/components/animation/animation_sequence.js';
import { animation } from '/nomads/components/animation/animation.js';

import { controller } from '/nomads/components/controller.js';

import * as sky from '/nomads/systems/sky.js'

import * as THREE from '/build/three.module.js';

export class game {
    constructor(n){
        this.name = n
        this.objects = []
        this.somthing = 0;
    }
    init(data, three){

        this.arrow_helper = new THREE.ArrowHelper()


        this.three = three;
        three.scene.add(this.arrow_helper)
        console.log("%c"+this.name+" Initialized", "color:#FFE532");
    
        this.show_data = false;
        this.time = 0;

        if(data.length != 0 && this.show_data) {
            console.log("%cData Loaded", "color:#1ED760")
            for(let page of data){
                console.log("%c -"+page.name, "color:#1C8D43")
            }
        }

        //! ---------- INIT ----------
            keyboard.init();
            physics.init();
            sky.init(three.renderer);
        //! ---------- INIT ----------

        var object = new gameobject(
            "denis", 
            new Vector3(0,0.5,0), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1, null, null, null)
        );
        object.add_component(solid(get_meta().crab))

        object.add_component(new animator([
            new animation_sequence("walk", [new animation("walk", 0, 3)], 2, true), 
            new animation_sequence("death", [ new animation("dead_start", 3, 3), 
            new animation("dead_end", 6, 1)], 2, false)]));

        var npc = new gameobject("steve", 
        new Vector3(0,0.5,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null))

        npc.add_component(solid(get_meta().default));

        npc.add_component( new animator([
                new animation_sequence("idle", [new animation("idle", 0, 4)], 8, true),
                new animation_sequence("wave", [new animation("wave", 4, 2)], 8, true)]));
        object.add_component(new controller(three))
       
        this.objects.push(object);
        this.objects.push(npc);

        this.objects[1].transform.look_at(
            new Vector3(0, 0, 0), new Vector3(0, 1, 0))
    }
    update(delta){
        for (let o of this.objects){    
            o.update(delta);
        }
        this.time += delta;
        //this.objects[0].transform.rotation.y += 0.1;
        var newRot = this.objects[1].transform.get_look_direction(
            this.objects[0].transform.position, new Vector3(0,1,0))

        this.arrow_helper.position.copy(this.objects[1].transform.position);

        this.objects[1].transform.rotation = this.objects[1].transform.rotation.slerp(newRot, delta * 5, true);
        this.arrow_helper.setDirection(newRot.get_forward())

        sky.update(delta);
    }
    get_time(){
        return this.time;
    }
}