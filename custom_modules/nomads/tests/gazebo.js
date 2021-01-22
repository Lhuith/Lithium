import { Vector3 } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'


const box = (list, position, rot) => {
    var box = new gameobject(
        "gazebo_side", 
        position, 
        new Vector3(1,1,1), 
        rot)

    var gazebo_side_a = new gameobject(
        "gazebo_side", 
        new Vector3(0,0,-.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null))
    
    box.add_child(gazebo_side_a)
    gazebo_side_a.add_component(solid(get_meta().gazebo.gazebo_side))
    list.push(gazebo_side_a)

    var gazebo_side_b = new gameobject(
        "gazebo_side", 
        new Vector3(0,0,0.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null))
    box.add_child(gazebo_side_b)
    gazebo_side_b.add_component(solid(get_meta().gazebo.gazebo_side))
    list.push(gazebo_side_b)

    var gazebo_front_f = new gameobject(
        "gazebo_front", 
        new Vector3(.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null))
    box.add_child(gazebo_front_f)
    gazebo_front_f.add_component(solid(get_meta().gazebo.gazebo_front))
    list.push(gazebo_front_f)

    var gazebo_front_b = new gameobject(
        "gazebo_front", 
        new Vector3(-.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null))
    box.add_child(gazebo_front_b)
    gazebo_front_b.add_component(solid(get_meta().gazebo.gazebo_front))
    list.push(gazebo_front_b)

    var gazebo_top = new gameobject(
        "gazebo_front", 
        new Vector3(0,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1,0,0), Math.PI/2, null))
    box.add_child(gazebo_top)
    gazebo_top.add_component(solid(get_meta().gazebo.gazebo_top))
    list.push(gazebo_top)
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

