import {get_input_meta, get_sprite_meta, save_game} from '/core/data/antlion.js'
import * as physics from '/core/math/physics/physics.js'
import * as keyboard from '/core/input/keyboard.js'
import { quaternion } from '/core/math/quaternion.js'
import { Vector3 } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { animator } from '/nomads/components/animation/animator.js'
import { animation_sequence } from '/nomads/components/animation/animation_sequence.js'
import { animation } from '/nomads/components/animation/animation.js'
import { controller } from '/nomads/components/controller.js'


import { box } from '/nomads/tests/box.js'

import * as sky from '/nomads/systems/sky.js'
import * as world from '/nomads/systems/world.js'
import * as time from '/nomads/systems/time.js'
import * as menu from '/nomads/systems/menu.js'

import { look_at } from '/nomads/components/look_at.js'
import {subscribe_to_input_event} from "/core/input/keyboard.js";


let player
let game_state = {
    paused:false,
    edit:false
}

export class game {
    constructor(n){
        this.name = n
        this.objects = []
    }
    init(data, three){
        this.three = three
        console.log("%c"+this.name+" Initialized", "color:#FFE532")

        this.show_data = false
        this.time = 0

        if(data.length != 0 && this.show_data) {
            console.log("%cData Loaded", "color:#1ED760")
            for(let page of data){
                console.log("%c -"+page.name, "color:#1C8D43")
            }
        }
        //! ---------- INIT ----------
            time.init()
            keyboard.init()
            physics.init()
            sky.init(three.renderer)
            world.init(three)
            menu.init(three)
        //! ---------- INIT ----------

        subscribe_to_input_event(
            get_input_meta().pause, this.toggle_pause_state)

        subscribe_to_input_event(
            get_input_meta().edit, this.toggle_edit_state)

        let npc = new gameobject("steve", new Vector3(3,0.8,0), new Vector3(1,1,1))
        npc.add_component(sprite(get_sprite_meta().lithy))
        npc.add_component(new look_at(three, three.camera.position))
        npc.transform.rotate(new Vector3(1, 0, 0), 180)

        npc.add_component(new animator([
                new animation_sequence("idle",
                    [new animation("idle", 0, 4)], 8, true),
                new animation_sequence("wave",
                    [new animation("wave", 4, 2)], 8, true)]))

        let arrow_container = new gameobject("arrow_guide", new Vector3(5,2,0), new Vector3(1,1,1))
        arrow_container.add_component(new look_at(three, npc.transform.position))

        let arrow_n = new gameobject("arrow_n", new Vector3(0,0,0), new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 90)))
        arrow_n.add_component(solid(get_sprite_meta().arrow))
        arrow_n.get_component("decomposer").set_color_attribute("#FF00FF")

        arrow_container.add_child(arrow_n)

        player = new gameobject(
            "Player",
            new Vector3(0,0.5,0),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1, null, null, null)
        )
        player.add_component(new controller(three))

        this.objects.push(player)
        this.objects.push(npc)
        this.objects.push(arrow_container)

        this.objects[1].transform.look_at(new Vector3(0, 0, 0), new Vector3(0, 1, 0))

        let box_obj = box (
            new Vector3(-2,0.31,0),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1)
        )
        this.objects.push(box_obj)
    }

    update(delta) {
        if (game_state.paused) {
            return
        }

        this.time += delta
        for (let o of this.objects){
            o.update(delta)
        }
        time.update(delta)
        sky.update(delta)
    }

    get_time(){
        return this.time
    }

    get_game_pause_state() {
        return game_state.paused
    }
    get_game_edit_state() {
        return game_state.edit
    }
    toggle_pause_state(e, n){
        game_state.edit  = false
        game_state.paused = !game_state.paused
    }
    toggle_edit_state(e, n){
        if (!game_state.paused) {
            game_state.edit = !game_state.edit
        }
    }
}