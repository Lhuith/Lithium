import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math } from '/meta/helpers/utils.js'

export const wheelchair = (pos, scale, rotation) => {
    var box_obj = new gameobject("box", 
        pos, 
        scale, 
        rotation
    )
    var size = 0.125
    var height = (19/32)/2
    
    box_obj.add_component(solid(get_meta().wheelchair.frame, 
    new transform (
        new Vector3(-size, height, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    )))

    box_obj.add_component(solid(get_meta().wheelchair.frame, 
    new transform (
        new Vector3(size, height, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    )))

    box_obj.add_component(solid(get_meta().wheelchair.seat, 
    new transform (
        new Vector3(0, height, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 90, 0))
    )))

    box_obj.add_component(solid(get_meta().wheelchair.seat, 
    new transform (
        new Vector3(0, height - 0.125, size + 0.065), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 10, 90))
    )))

    box_obj.add_component(solid(get_meta().wheelchair.seat, 
    new transform (
        new Vector3(0, height + 0.125, -size), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90))
    )))

    return box_obj
}