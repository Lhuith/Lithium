import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/engine/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_sprite_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math } from '/core/meta/helpers/utils.js'

export const box = (pos, scale, rotation) => {
    var box_obj = new gameobject("box", pos, scale, rotation)
    var size = 0.25
    var position = 0.25

    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(0, position, size),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1)
    )))

    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(0, position, -size),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1)
    )))

    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(size,position,0),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0)))
    ))
    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(-size,position,0),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0)))
    ))
    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(0,position + size,0),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0)))
    ))
    box_obj.add_component(solid(get_sprite_meta().box,
    new transform (
        new Vector3(0,position-size,0),
        new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0)))
    ))

    return box_obj
}