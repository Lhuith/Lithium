import { zone } from '/nomads/components/zone.js'
import * as map from "./map.js";
import * as player from "../../core/math/transform.js";
import {get_game} from "../nomads.js";

export const init = () => {
    console.log("%cWorld Initialized", "color:#1ED35F")

    let world = new zone("world", 1, true)
    get_game().get_three().scene.add(world.tile)

    map.init(world.color)

    //let water = new zone("water",1, false, three)
    //water.add_to_scene(three.scene)
}

export const update = (delta) => {
    map.update(delta)
    map.setMapCoords(player.transform.position.x*-2, player.transform.position.z*2)
}