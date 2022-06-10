import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_sprite_meta } from '/core/data/antlion.js'

export const arrow = (pos, scale, rotation, hex) => {
    let arrow = new gameobject("arrow", pos, scale, rotation)

    let a = new gameobject("arrow_a", new Vector3(0,0,0), new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0)))
    a.add_component(solid(get_sprite_meta().arrow))
    a.get_component("decomposer").set_color_attribute(hex)
    arrow.add_child(a)

    let b = new gameobject("arrow_b", new Vector3(0,0,0), new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0)))
    b.add_component(solid(get_sprite_meta().arrow))
    b.get_component("decomposer").set_color_attribute(hex)
    arrow.add_child(b)

    return arrow
}