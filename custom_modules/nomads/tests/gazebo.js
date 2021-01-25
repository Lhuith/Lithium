import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math } from '/meta/helpers/utils.js'

var roof_test = []
var rotation_test = 0

const box = (list, position, rot) => {
    var box_obj = new gameobject(
        "gazebo_armrest", 
        position, 
        new Vector3(1,1,1), 
        rot)
    box_obj.add_component(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,-.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    box_obj.add_component(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,0.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    box_obj.add_component(solid(get_meta().gazebo.gazebo_front, 
    new transform (
        new Vector3(.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    box_obj.add_component(solid(get_meta().gazebo.gazebo_front, 
    new transform(
        new Vector3(-.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    box_obj.add_component(solid(get_meta().gazebo.gazebo_top, 
    new transform(
        new Vector3(0,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1,0,0), Math.PI/2, null)
    )))
    list.push(box_obj)
    return box_obj
}

const bench = (list, position, scale, rot) => {
    var bench = new gameobject("gazebo_armrest", position, scale, rot)
    bench.add_child(box(list, new Vector3(0, 0.5, 0), 
        new quaternion(0,0,0,1, null, null, null)))
    bench.add_child(box(list, new Vector3(0 - (0.5 - (10/32)/2), 0.5, 0 - (0.5 - (10/32)/2)), 
        new quaternion(0,0,0,1, new Vector3(0, 1, 0), Math.PI/2, null)))
    bench.add_component(solid(get_meta().gazebo.gazebo_pole, 
        new transform(
            new Vector3((-(10/32)/2),0.5,-((10/32)/2) - (2/32)/2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)
    )))
    bench.add_component(solid(get_meta().gazebo.gazebo_pole, 
        new transform(
            new Vector3((-(10/32)/2),0.5,-((10/32)/2) - (2/32)/2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1, new Vector3(0, 1, 0), Math.PI/2)
    )))
}

const roof = (list, position, scale, rot) => {
    var roof_obj = new gameobject(
        "gazebo_armrest", 
        position, 
        scale, 
        rot)
    var spread = 0.3
    roof_obj.add_component(solid(get_meta().gazebo.gazebo_roof,
    new transform(
        new Vector3(0,0,-spread), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1, 0, 0), Math.PI/4))
    ))
    roof_obj.add_component(solid(get_meta().gazebo.gazebo_roof,
    new transform(
        new Vector3(0,0,spread), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(-1, 0, 0), Math.PI/4))
    ))
    roof_obj.add_component(solid(get_meta().gazebo.gazebo_roof, 
    new transform(
        new Vector3(-spread,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(45, 90, 0)))
    ))
    roof_obj.add_component(solid(get_meta().gazebo.gazebo_roof, 
    new transform(
        new Vector3(spread,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-45, 90, 0)))
    ))
    roof_test.push(roof_obj)
    return roof_obj
}

export const gazebo = (list) => {
    var depth = (1.0 - (10/32)/2) * (1.5 -  (10/32)/2)
    var width = (1.0 - 0.5) * 1.5
    bench(list, 
        new Vector3(-width,0, depth), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1))
    bench(list, 
        new Vector3(width,0, depth), 
        new Vector3(-1,1,1), 
        new quaternion(0,0,0,1))
    bench(list, 
        new Vector3(-width,0,-depth), 
        new Vector3(1,1,-1), 
        new quaternion(0,0,0,1))
    bench(list, 
        new Vector3(width,0,-depth), 
        new Vector3(-1,1,-1), 
        new quaternion(0,0,0,1))

    roof(list, 
        new Vector3(0,1.65,0), 
        new Vector3(1.25,1,1.25), 
        new quaternion(0,0,0,1))
}

export const gazebo_update = (delta) => {
}

