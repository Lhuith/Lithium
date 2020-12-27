import { component } from '/nomads/components/component.js';
import {Vector3} from '/build/three.module.js';
import {PointerLockControls} from '/jsm/controls/PointerLockControls.js';
import * as keyboard from '/core/input/keyboard.js';

export class controller extends component {
    type = "controller"
    required = ["transform"];
    
    constructor(three){
        super();
        
        console.log("%cController Initialized", "color:#7d57c1")

        this.controls = new PointerLockControls(three.camera, document.body );
        this.speed = 5.25;
        this.speed_mult = 1.5;
        this.direction = new Vector3();
    }
    update(delta){
        this.movement(delta)
    }
    movement(delta){
        var step = this.speed;

        this.direction.z = Number( keyboard.input.w ) - Number( keyboard.input.s);
        this.direction.x = Number( keyboard.input.a ) - Number( keyboard.input.d);
        this.direction.normalize(); 

        if(keyboard.input.shift) { 
            this.speed_mult = 2.1;
        } else { 
            this.speed_mult = 1;
        }

        if ((keyboard.input.w || keyboard.input.s)){
            this.transform.position.z -= this.direction.z * (step * this.speed_mult) * delta;
        } 
    
        if ((keyboard.input.a || keyboard.input.d)){
            this.transform.position.x -= this.direction.x * (step * this.speed_mult) * delta;
        }

        if(keyboard.input.space){
        }

        //camera pos = player pos
        this.controls.getObject().position.copy(
            new Vector3(
                this.transform.position.x,
                this.transform.position.y,
                this.transform.position.z + 1
        ));

        if (this.controls.getObject().position.y == 0.0 ) {
           // canJump = true;
        }
    }

    set_transform(t){
        this.transform = t;
    }
    set_requirment(r){
        if(r.type == "transform"){
            this.set_transform(r);
        }
    }
}