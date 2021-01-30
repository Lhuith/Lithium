import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const pole_M = (t) => {
    var t_a = new transform (
        new Vector3(0, 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
    var t_b = new transform (
        new Vector3(0, pixel.map(14) - pixel.map(4), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90)))
    t_b.set_parent(t)
    pole(t_b)
    var t_c = new transform (
        new Vector3(0, pixel.map(14) - pixel.map(4), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -90)))
    t_c.set_parent(t)
    pole(t_c)
    var t_a = new transform (
        new Vector3(pixel.map(14), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
    var t_a = new transform (
        new Vector3(-pixel.map(14), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
}

export const pole_T = (t) => {
    var t_a = new transform (
        new Vector3(0, 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)

    var t_b = new transform ( 
        new Vector3(0, (14/32) - (4/32), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90)))
    t_b.set_parent(t)
    pole(t_b)

    var t_c = new transform (
        new Vector3(0, (14/32) - (4/32), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -90)))
    t_c.set_parent(t)
    pole(t_c)
}

export const pole_R = (t) => {
    var t_a = new transform (
        new Vector3(0, 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)

    var t_b = new transform (
        new Vector3(0, (14/32) - (4/32), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90)))
    t_b.set_parent(t)
    pole(t_b)
}


export const pole = (t) => {
    var sprite_a = solid(get_meta().pole, new transform (
        new Vector3(0, (14/32)/2, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    ))
    var sprite_b = solid(get_meta().pole, new transform (
        new Vector3(0, (14/32)/2, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    ))

    sprite_a.set_transform(t)
    sprite_b.set_transform(t)

    return 
}