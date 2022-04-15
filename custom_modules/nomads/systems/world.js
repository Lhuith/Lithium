import { zone } from '/nomads/components/zone.js'

export const init = (three, data) => {
    console.log("%cWorld Initialized", "color:#1ED35F")

    let world = new zone("world", 1, true, three)
    world.add_to_scene(three.scene)

    //var crab_isle = new zone("crab_isle", "land_shader", 1, true, three)
    //crab_isle.add_to_scene(three.scene)
    // crab_isle.tile.scale.set(0.25, 0.25, 0.25)
    //let water = new zone("water",1, false, three)
    //water.add_to_scene(three.scene)
}

export const update = (delta) => {

}