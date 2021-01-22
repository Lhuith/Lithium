import { Vector3 } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'

const box = (list, position, rot) => {
    var box = new gameobject(
        "gazebo_armrest", 
        position, 
        new Vector3(1,1,1), 
        rot)
    box.add_component(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,-.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    box.add_component(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,0.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    box.add_component(solid(get_meta().gazebo.gazebo_front, 
    new transform (
        new Vector3(.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    box.add_component(solid(get_meta().gazebo.gazebo_front, 
    new transform(
        new Vector3(-.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    box.add_component(solid(get_meta().gazebo.gazebo_top, 
    new transform(
        new Vector3(0,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1,0,0), Math.PI/2, null)
    )))
    list.push(box)
}

export const gazebo = (list) => {
    box(list, new Vector3(-1, 0.5, 1), 
        new quaternion(0,0,0,1, null, null, null))
    box(list, new Vector3(1, 0.5, 1),
        new quaternion(0,0,0,1, null, null, null))
    box(list, new Vector3(-1, 0.5, -1), 
        new quaternion(0,0,0,1, null, null, null))
    box(list, new Vector3(1, 0.5, -1), 
        new quaternion(0,0,0,1, null, null, null))
}

