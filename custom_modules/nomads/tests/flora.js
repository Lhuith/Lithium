import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const bush = (t) => {
    var sprite_a = sprite(get_meta().ponyo_bush, new transform (
        new Vector3(0, 0.5, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    ))
    sprite_a.set_transform(t)
}

const unfold = (t, decomp_t, meta, decomp) => {
    var a = decomp(meta, decomp_t)

    var euler_values = decomp_t.rotation.to_euler()
    var b_decomp_t = decomp_t.clone()

    var rot = new quaternion().eulerToQuaternion(
        new Vector3(0, 90, 0))

    b_decomp_t.rotation = b_decomp_t.rotation.quat_mul(rot)
    var b = decomp(meta, b_decomp_t)

    a.set_transform(t)
    b.set_transform(t)
}

export const tree = (t) => {
    var roots = unfold(t, 
        new transform (
            new Vector3(0, 0.5, 0), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0))
        ), get_meta().ponyo_tree.roots, solid);

    var trunk_a_transform =    new transform (
        new Vector3(-0.05, 1.0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 10)))
    var trunk_a = unfold(t, trunk_a_transform, get_meta().ponyo_tree.trunk_a, solid);

    var trunk_b = unfold(trunk_a_transform, 
        new transform (
            new Vector3(0.03, pixel.map(15) + pixel.map(22), 0.2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(15, 0, -1))
        ), get_meta().ponyo_tree.trunk_b, solid);

    var large_branch_transform = new transform (
        new Vector3(-0.14, pixel.map(15) + pixel.map(20), -0.04), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 10))
    )
    var large_branch = unfold(trunk_a_transform, 
        large_branch_transform, get_meta().ponyo_tree.large_branch, solid);

    var small_branch_a_transform = new transform (
        new Vector3(0.3, pixel.map(28), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, -40))
    )

    var small_branch_a = unfold(large_branch_transform, 
        small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid);

    var small_branch_b = unfold(small_branch_a_transform, 
        new transform (
            new Vector3(-0.32, -pixel.map(1), 0), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 55))
        ), get_meta().ponyo_tree.small_branch_b, solid);

    var small_branch_a_transform = new transform (
        new Vector3(0.4, pixel.map(3), -0.2), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-20, 0, -65))
    )
    var small_branch_a = unfold(large_branch_transform, 
        small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid);

    var small_branch_a_transform = new transform (
        new Vector3(-0.23, pixel.map(20), -0.41), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-65, 34, 0))
    )
    var small_branch_a = unfold(large_branch_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)
    
    var small_branch_a_transform = new transform (
        new Vector3(-0.34, pixel.map(6), -0.11), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-45, 65, 0))
    )
    var small_branch_a = unfold(large_branch_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

}
