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

const leaves = (parent_t, t) => {
    var small_branch_leaves = sprite(get_meta().ponyo_tree.leaves, t)
    small_branch_leaves.set_transform(parent_t)
}

const branch = (parent_t, t) => {
    var small_branch_leaves = sprite(get_meta().ponyo_tree.leaves, t)
    small_branch_leaves.set_transform(parent_t)
}

export const tree = (t) => {
    // ------------------------- ROOTS -------------------------
    var roots = unfold(t, 
        new transform (
            new Vector3(0, 0.5, 0), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0))
    ), get_meta().ponyo_tree.roots, solid);
    // ------------------------- ROOTS -------------------------
    
    // ------------------------- TRUNK A -------------------------
    var trunk_a_transform = new transform (
        new Vector3(-0.05, 1.0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 10)))
    var trunk_a = unfold(t, trunk_a_transform, get_meta().ponyo_tree.trunk_a, solid);
    // ------------------------- TRUNK A -------------------------

    // ------------------------- TRUNK B -------------------------
    var trunk_b_transform = new transform (
        new Vector3(0.03, pixel.map(15) + pixel.map(22), 0.12), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(10, 0, -1)))
    var trunk_b = unfold(trunk_a_transform, 
        trunk_b_transform, get_meta().ponyo_tree.trunk_b, solid);
    // ------------------------- TRUNK B -------------------------

    var large_branch_transform = new transform (
        new Vector3(-0.14, pixel.map(15) + pixel.map(20), -0.04), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 10))
    )
    var large_branch = unfold(trunk_a_transform, 
        large_branch_transform, get_meta().ponyo_tree.large_branch, solid);

    //## ------------------------------ RIGHT SIDE ------------------------------##
    var small_branch_a_transform = new transform (
        new Vector3(0.16, pixel.map(28), 0.22), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(30, 0, -15)))

    var small_branch_a = unfold(large_branch_transform, 
        small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid);

    var small_branch_b_transform = new transform (
        new Vector3(-0.32, -pixel.map(1), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 55))
    )
    var small_branch_b = unfold(small_branch_a_transform, 
        small_branch_b_transform, get_meta().ponyo_tree.small_branch_b, solid);

    var small_branch_a_transform = new transform (
        new Vector3(0.4, pixel.map(3), -0.2), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-20, 0, -65))
    )
    var small_branch_a = unfold(large_branch_transform, 
        small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid);

    var small_branch_a_transform = new transform (
        new Vector3(-0.23, pixel.map(14), -0.41), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-65, 34, 0))
    )
    var small_branch_a = unfold(large_branch_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_branch_a_transform = new transform (
        new Vector3(pixel.map(4), -pixel.map(4), -0.47), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-100, 0, 90))
    )
    var small_branch_a = unfold(large_branch_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_branch_a_transform = new transform (
        new Vector3(-0.3, -pixel.map(3), 0.125), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(15, 0, 75)))
    var small_branch_a = unfold(large_branch_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_b, solid)

    //## ------------------------------ RIGHT SIDE ------------------------------##

    //## ------------------------------ LEFT SIDE ------------------------------##
    var small_branch_a_transform = new transform (
        new Vector3(pixel.map(12), pixel.map(23), pixel.map(5)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(20, 0, -45))
    )
    var small_branch_a = unfold(trunk_a_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_c_transform = new transform (
        new Vector3(pixel.map(4), pixel.map(1), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-5, 0, -30))
    )
    var small_branch_a = unfold(small_branch_a_transform, 
        small_c_transform, get_meta().ponyo_tree.small_branch_b, solid)

    var small_branch_a_transform = new transform (
        new Vector3(pixel.map(16), -pixel.map(8), -pixel.map(4)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-10, 0, -100))
    )
    var small_branch_a = unfold(trunk_b_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_branch_a_transform = new transform (
        new Vector3(pixel.map(14), pixel.map(9), pixel.map(4)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(15, 0, -60))
    )
    var small_branch_a = unfold(trunk_b_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_branch_b_transform = new transform (
        new Vector3(pixel.map(4), pixel.map(12), 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(-5, 0, -30))
    )
    var small_branch_a = unfold(trunk_b_transform, 
        small_branch_b_transform, get_meta().ponyo_tree.small_branch_b, solid)

    var small_branch_a_transform = new transform (
        new Vector3(pixel.map(1), -pixel.map(3), pixel.map(12)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(55, 0, 0))
    )
    var small_branch_a = unfold(trunk_b_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)

    var small_branch_a_transform = new transform (
        new Vector3(-pixel.map(6), pixel.map(20), pixel.map(10)), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(35, 0, 25))
    )
    var small_branch_a = unfold(trunk_b_transform, 
            small_branch_a_transform, get_meta().ponyo_tree.small_branch_a, solid)


    //## ------------------------------ LEFT SIDE ------------------------------##
    
    leaves(large_branch_transform, 
        new transform (
            new Vector3(-1, -.25, .2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.55, -.25, 0.3), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.35, -.45, -0.1), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.55, .1, 0.5), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.55, .1, -.05), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.55, .65, 0.6), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.2, .85, 0.2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

        leaves(large_branch_transform, 
            new transform (
                new Vector3(-0.4, .85, 0.5), 
                new Vector3(1,1,1), 
                new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.65, 1.25, 0.4), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-1.05, 0.75, 0.2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.65, 0.95, -0.3), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-1.05, 0.35, -0.6), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.55, 0.15, 0.4), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    
    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.55, 0.35, -0.3), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(0.35, 0.55, -0.3), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.65, 0.75, 0.9), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.2, 0.05, 0.9), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.2, 0, -0.8), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))
    leaves(large_branch_transform, 
        new transform (
            new Vector3(-0.2, -0.2, -0.2), 
            new Vector3(1,1,1), 
            new quaternion(0,0,0,1)))

}
