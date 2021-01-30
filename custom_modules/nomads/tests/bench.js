import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const bench = (t) => {
    var top_transform = new transform (
        new Vector3(0, pixel.map(8), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )
    top_transform.set_parent(t)

    bench_top(top_transform)
    
    var leg_transform_a = new transform (
        new Vector3(pixel.map(9), pixel.map(3), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )
    leg_transform_a.set_parent(t)
    bench_leg(leg_transform_a)

    var leg_transform_a = new transform (
        new Vector3(-pixel.map(9), pixel.map(3), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )
    leg_transform_a.set_parent(t)
    bench_leg(leg_transform_a)

    return 
}

const bench_leg = (t) => {
    var list = []
    list.push(solid(get_meta().bench.leg_f, new transform (
        new Vector3(0, 0, pixel.map(4)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )))

    list.push(solid(get_meta().bench.leg_f, new transform (
        new Vector3(0, 0, -pixel.map(4)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )))

    list.push(solid(get_meta().bench.leg_s, new transform (
        new Vector3(-pixel.map(2), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 90))
    )))

    list.push(solid(get_meta().bench.leg_s, new transform (
        new Vector3(pixel.map(2), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 90))
    )))

    for(let d of list){
        d.set_transform(t)
    }
}

const bench_top = (t) => {
    var list = []
    list.push(solid(get_meta().bench.top_t, new transform (
        new Vector3(0, pixel.map(2), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0))
    )))

    list.push(solid(get_meta().bench.top_s, new transform (
        new Vector3(0, 0, pixel.map(5)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )))

    list.push(solid(get_meta().bench.top_s, new transform (
        new Vector3(0, 0, -pixel.map(5)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    )))

    list.push(solid(get_meta().bench.top_f, new transform (
        new Vector3(pixel.map(15), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    )))

    list.push(solid(get_meta().bench.top_f, new transform (
        new Vector3(-pixel.map(15), 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    )))

    list.push(solid(get_meta().bench.top_t, new transform (
        new Vector3(0, -pixel.map(2), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0))
    )))

    for(let d of list){
        d.set_transform(t)
    }

    return 
}