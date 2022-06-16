import { component } from '/core/engine/component.js'
import {Vector3, Euler} from '/build/three.module.js'
import {PointerLockControls} from '/jsm/controls/PointerLockControls.js'
import * as keyboard from '/core/input/keyboard.js'
import { get_data } from '/core/data/antlion.js'
import {subscribe_to_input_event} from "/core/input/keyboard.js"
import { get_input_meta } from "/core/data/antlion.js";
import {get_game} from "/nomads/nomads.js"

import * as file from '/core/meta/helpers/ajax.js'

export class controller extends component {
    type = "controller"
    required = ["transform"]
    
    constructor(three){
        super()
    
        console.log("%cController Initialized", "color:#7d57c1")

        let controller = new PointerLockControls(three.camera, document.body)

        // turn off right click menu from showing
        document.addEventListener("contextmenu", function (e){
            e.preventDefault();
        }, false);

        // click in add event listener to your document.body
        document.body.addEventListener( 'click', function (e) {
            //lock mouse on screen
            if(get_game().get_game_pause_state() || get_game().get_game_edit_state()) {
                e.preventDefault()
            } else {
                controller.lock()
            }
        }, false )

        document.body.addEventListener( 'mousedown', function (e) {
            //lock mouse on screen
            if(get_game().get_game_edit_state() && e.buttons == 2) {
                controller.lock()
            }
        }, false )

        document.body.addEventListener( 'mouseup', function (e) {
            //lock mouse on screen
            if(get_game().get_game_edit_state()) {
                controller.unlock()
            }
        }, false )

        // has to be part of the controller in order to reference the controller
        controller.input_event_handle = (e, n) => {
            if(get_game().get_game_edit_state() || get_game().get_game_pause_state()) {
                controller.unlock()
            } else {
                controller.lock()
            }
        }

        subscribe_to_input_event(
            get_input_meta().pause, controller.input_event_handle)

        subscribe_to_input_event(
            get_input_meta().edit, controller.input_event_handle)

        this.controls = controller
        this.speed = 10.25
        this.speed_mult = 4.5
        this.direction = new Vector3()

        let saved_player_information = JSON.parse(get_data("player").data)

        if (saved_player_information != undefined && saved_player_information.position != undefined)  {
            this.old_check = saved_player_information.position.x +
                saved_player_information.position.y + saved_player_information.position.z

            this.controls.getObject().position.x = saved_player_information.position.x
            this.controls.getObject().position.y = saved_player_information.position.y
            this.controls.getObject().position.z = saved_player_information.position.z

            this.controls.getObject().rotation.x = saved_player_information.rotation_euler.x
            this.controls.getObject().rotation.y = saved_player_information.rotation_euler.y
            this.controls.getObject().rotation.z = saved_player_information.rotation_euler.z
        }
    }
    update(delta){
        this.movement(delta)
    }

    movement(delta){
        this.direction.z = Number( keyboard.input.W ) - Number( keyboard.input.S)
        this.direction.x = (Number( keyboard.input.A ) - Number( keyboard.input.D)) * -1
        this.direction.y = Number( keyboard.input.Q ) - Number( keyboard.input.E)

        this.direction.normalize() 

        if(keyboard.input.shift) { 
            this.speed_mult = 12.1
        } else { 
            this.speed_mult = 1
        }

        if ((keyboard.input.Q || keyboard.input.E)){
           this.controls.getObject().position.y +=  (this.direction.y * (this.speed * this.speed_mult) * delta)
        } 
        if ((keyboard.input.W || keyboard.input.S)){
            this.controls.moveForward(this.direction.z * (this.speed * this.speed_mult) * delta)
        } 
        if ((keyboard.input.A || keyboard.input.D)){
            this.controls.moveRight(this.direction.x * (this.speed * this.speed_mult) * delta)
        }

        if(keyboard.input.space){
        }
        
        if (this.controls.getObject().position.y === 0.0 ) {
           // canJump = true
        }

        let checkSum = this.controls.getObject().position.x + this.controls.getObject().position.y +
            this.controls.getObject().position.z

        if (checkSum != this.old_check) {
            file.update({id: "player",
                position:{
                    x:this.controls.getObject().position.x,
                    y:this.controls.getObject().position.y,
                    z:this.controls.getObject().position.z
                },
                rotation_euler:{
                    x:this.controls.getObject().rotation.x,
                    y:this.controls.getObject().rotation.y,
                    z:this.controls.getObject().rotation.z
                }})
        }

        this.parent.transform.position =
            new Vector3(
                this.controls.getObject().position.x,
                this.controls.getObject().position.y - 0.25,
                this.controls.getObject().position.z - 1
            )

        this.old_check =
            this.controls.getObject().position.x +
            this.controls.getObject().position.y +
            this.controls.getObject().position.z

    }

    set_transform(t){
        this.transform = t
 
        this.parent.transform.position = 
        new Vector3(
            this.controls.getObject().position.x, 
            this.controls.getObject().position.y - 0.25, 
            this.controls.getObject().position.z - 1)

    }
    set_requirement(r){
        if(r.type === "transform"){
            this.set_transform(r)
        }
    }
}