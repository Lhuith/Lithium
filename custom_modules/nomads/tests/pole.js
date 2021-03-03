import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const pole_M = (t) => {
    var t_a = new transform (
        new Vector3(0,  - pixel.map(1), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
    var t_c = new transform (
        new Vector3(pixel.map(7), pixel.map(14), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90)))
    t_c.set_parent(t)
    pole(t_c)
    var t_a = new transform (
        new Vector3(pixel.map(7), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
    var t_a = new transform (
        new Vector3(-pixel.map(7), 0, 0), 
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

export const pole_M_connector = (t) => {
    var t_a = new transform (
        new Vector3(0,  - pixel.map(1), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
    var t_c = new transform (
        new Vector3(pixel.map(7), pixel.map(14), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 90)))
    t_c.set_parent(t)
    pole(t_c)
    var t_a = new transform (
        new Vector3(pixel.map(7), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    t_a.set_parent(t)
    pole(t_a)
}

export const pole_M_fence = (t, length) => {
    if (length <= 0){return console.error("cant be less or = 0")}

    pole_M (t)

    if (length > 1) {
        for(var i = 1; i < length; i++) {
            pole_M_connector (new transform(
                new Vector3(t.position.x,0.15,t.position.z - (i * .44)),
                new Vector3(1,1,1),
                new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))))
        }
    }
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

export const pole_s = (t) => {
    var sprite_a = solid(get_meta().pole_s, new transform (
        new Vector3(0, (14/32)/2, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    ))
    var sprite_b = solid(get_meta().pole_s, new transform (
        new Vector3(0, (14/32)/2, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    ))

    sprite_a.set_transform(t)
    sprite_b.set_transform(t)

    return 
}

export const temp_inner_fence = (x_offset, h_offset) => {
    pole (
        new transform(
            new Vector3(2.7 - x_offset,1.11 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -5))))
    pole_s (
        new transform(
            new Vector3(3.11 - x_offset,1.5 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 75))))
    pole_s (
        new transform(
            new Vector3(3.55 - x_offset,1.3 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 65))))
    pole_s (
        new transform(
            new Vector3(3.96 - x_offset,1.08 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 63))))
    pole_s (
        new transform(
            new Vector3(4.4 - x_offset,0.862 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 62))))
    pole_s (
        new transform(
            new Vector3(4.8 - x_offset,0.72 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 70))))
    pole (
        new transform(
            new Vector3(3.12 - x_offset,1.02 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 9))))
    pole (
        new transform(
            new Vector3(3.46 - x_offset,0.79 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -5))))
    pole (
        new transform(
            new Vector3(3.92 - x_offset,0.60 - h_offset,0.51),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -5))))
    pole (
        new transform(
            new Vector3(4.35 - x_offset,0.4 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0))))
    pole (
        new transform(
            new Vector3(4.71 - x_offset,0.28 - h_offset,0.55),
            new Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0))))
}