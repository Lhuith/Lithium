import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math } from '/meta/helpers/utils.js'

const box = (box_transform) => {
    var new_list = []
    new_list.push(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,-.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    new_list.push(solid(get_meta().gazebo.gazebo_side, 
    new transform (
        new Vector3(0,0,0.156), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, null, null, null)
    )))
    new_list.push(solid(get_meta().gazebo.gazebo_front, 
    new transform (
        new Vector3(.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    new_list.push(solid(get_meta().gazebo.gazebo_front, 
    new transform(
        new Vector3(-.498,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0,1,0), Math.PI/2, null)
    )))
    new_list.push(solid(get_meta().gazebo.gazebo_top, 
    new transform(
        new Vector3(0,-(3/32),0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1,0,0), Math.PI/2, null)
    )))

    for(let d of new_list){
        d.set_transform(box_transform)
    }
    //list.push(box_obj)
    return new_list
}
const bench = (box_transform) => {
    var transformA = new transform( 
        new Vector3(0, 0.5, 0), 
        new Vector3(1,1,1),
        new quaternion(0,0,0,1, null, null, null))
    transformA.set_parent(box_transform)
    box(transformA)
    
    var transformB = new transform(
        new Vector3(0 - (0.5 - (10/32)/2), 0.5, 0 - (0.5 - (10/32)/2)),
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(0, 1, 0), Math.PI/2, null))
    transformB.set_parent(box_transform)
    box(transformB)
    
    solid(get_meta().gazebo.gazebo_pole, 
        new transform(
            new Vector3((-(10/32)/2),0.5,-((10/32)/2) - (2/32)/2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)
    )).set_transform(box_transform)

    solid(get_meta().gazebo.gazebo_pole, 
        new transform(
            new Vector3((-(10/32)/2),(0.5),-((10/32)/2) - (2/32)/2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1, new Vector3(0, 1, 0), Math.PI/2)
    )).set_transform(box_transform)
}
const build_bench = (t) => {
    var depth = (1.0 - (10/32)/2) * (1.35 -  (10/32)/2)
    var width = (1.0 - 0.5) * 1.35

    var benchA = new transform (
        new Vector3(-width,0, depth), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )
    benchA.set_parent(t)
    bench(benchA)

    var benchB = new transform(
    new Vector3(width,0, depth), 
    new Vector3(-1,1,1), 
    new quaternion(0,0,0,1))
    benchB.set_parent(t)
    bench(benchB)

    var benchC = new transform(
    new Vector3(-width,0,-depth), 
    new Vector3(1,1,-1), 
    new quaternion(0,0,0,1))
    benchC.set_parent(t)
    bench(benchC)

    var benchD =  new transform(
    new Vector3(width,0,-depth), 
    new Vector3(-1,1,-1), 
    new quaternion(0,0,0,1)) 
    benchD.set_parent(t)
    bench(benchD)
}
const build_roof = (t) => {
    var roof_transform = new transform(
        new Vector3(0,1.65,0), 
        new Vector3(1.25,1,1.25), 
        new quaternion(0,0,0,1))
    roof_transform.set_parent(t)

    var spread = 0.3
    var new_list = []
    var roof_rotation = Math.PI/4.45

    new_list.push(solid(get_meta().gazebo.gazebo_roof, new transform(
        new Vector3(0,0,-spread), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(1, 0, 0), roof_rotation))))
        
    new_list.push(solid(get_meta().gazebo.gazebo_roof,
    new transform(
        new Vector3(0,0,spread), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1, new Vector3(-1, 0, 0), roof_rotation))
    ))
    new_list.push(solid(get_meta().gazebo.gazebo_roof, 
    new transform(
        new Vector3(-spread,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(to.dag(roof_rotation), 90, 0)))
    ))
    new_list.push(solid(get_meta().gazebo.gazebo_roof, new transform (
        new Vector3(spread,0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-to.dag(roof_rotation), 90, 0)))
    ))
    for(let d of new_list){
        d.set_transform(roof_transform)
    }
}
export const build_gazebo = (t) => {
    build_bench(t)
    build_roof(t)

    //return gazebo
}
