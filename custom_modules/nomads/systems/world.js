import { Color, Vector3 } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { math, to } from '/meta/helpers/utils.js' 

import { zone } from '/nomads/components/zone.js'
import { get_data} from '/core/data/antlion.js'

var renderer

export const init = (three, data) => {
    console.log("%cWorld Initialized", "color:#1ED35F")
    renderer = three.renderer

    var crab_isle = new zone("ponyo_island", "land_shader", 1, true, three)
    crab_isle.add_to_scene(three.scene)
    //crab_isle.tile.scale.set(0.25, 0.25, 0.25)
    var water = new zone("water", "land_shader", 1, false, three)
    water.add_to_scene(three.scene)
}

export const update = (delta) => {

}