import { component } from '/nomads/components/component.js';
import {Vector3, Euler} from '/build/three.module.js';
import {PointerLockControls} from '/jsm/controls/PointerLockControls.js';
import * as keyboard from '/core/input/keyboard.js';
import { quaternion } from '/core/math/quaternion.js'

export class controller extends component {
    type = "controller"
    required = ["transform"];
    
    constructor(three){
        super();
        
        console.log("%cController Initialized", "color:#7d57c1")

        var controller = new PointerLockControls(three.camera, document.body)
        //add event listener to your document.body
        document.body.addEventListener( 'click', function () {
            //lock mouse on screen
            controller.lock()
        }, false ) 
        this.controls = controller

        this.speed = 5.25;
        this.speed_mult = 1.5;
        this.direction = new Vector3();

        this.controls.getObject().position.y = .5
    }
    update(delta){
        this.movement(delta)
    }
    movement(delta){
        this.direction.z = Number( keyboard.input.w ) - Number( keyboard.input.s);
        this.direction.x = (Number( keyboard.input.a ) - Number( keyboard.input.d)) * -1;
        this.direction.y = Number( keyboard.input.q ) - Number( keyboard.input.e);

        this.direction.normalize(); 

        if(keyboard.input.shift) { 
            this.speed_mult = 2.1;
        } else { 
            this.speed_mult = 1;
        }

        if ((keyboard.input.q || keyboard.input.e)){
           this.controls.getObject().position.y +=  (this.direction.y * (this.speed * this.speed_mult) * delta);
        } 
        if ((keyboard.input.w || keyboard.input.s)){
            this.controls.moveForward(this.direction.z * (this.speed * this.speed_mult) * delta);
        } 
        if ((keyboard.input.a || keyboard.input.d)){
            this.controls.moveRight(this.direction.x * (this.speed * this.speed_mult) * delta);
        }

        if(keyboard.input.space){
        }
        
        if (this.controls.getObject().position.y == 0.0 ) {
           // canJump = true;
        }

        this.parent.transform.position = 
        new Vector3(this.controls.getObject().position.x, 
        this.controls.getObject().position.y, 
        this.controls.getObject().position.z - 1)
    }

    set_transform(t){
        this.transform = t;
    }
    set_requirement(r){
        if(r.type == "transform"){
            this.set_transform(r);
        }
    }
}