import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const steps = (t, l) => {
    var lower_step_pos = new Vector3(0,0,0);

    lower_step_pos.y += pixel.map(1);
    lower_step_pos.z -= pixel.map(3);
    var sprite_a = solid(get_meta().ponyo_stairs.step_bottom, new transform (
        lower_step_pos, 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0))
    ))

    sprite_a.set_transform(t)

    var step_pos = new Vector3();
    for(var i = 0; i < l; i++){
        step_pos.y = pixel.map(2) * -i;
        step_pos.z =  pixel.map(6) * i;
        step(
            t,
            step_pos
        )
    }
    step_pos.y -= pixel.map(2);
    step_pos.z += pixel.map(6);
    var sprite_a = solid(get_meta().ponyo_stairs.step, new transform (
        step_pos, 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    ))
    sprite_a.set_transform(t)

    var length = (step_pos.sub(lower_step_pos).length())
    var c_y = ((step_pos.y + lower_step_pos.y) / 2) - 0.03;
    var c_width = pixel.map(9)

    var rail_transform = new transform(
        new Vector3(
            ((step_pos.x + lower_step_pos.x) / 2) + c_width,
            c_y,
            (step_pos.z + lower_step_pos.z) / 2,
        ),
        new Vector3(1,length,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(107, 0, 0))
    )
    rail_transform.set_parent(t);
    
    rail(rail_transform)

    var rail_transform = new transform(
        new Vector3(
            ((step_pos.x + lower_step_pos.x) / 2) - c_width,
            c_y,
            (step_pos.z + lower_step_pos.z) / 2,
        ),
        new Vector3(1,length,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(107, 0, 0))
    )
    rail_transform.set_parent(t);
    
    rail(rail_transform)
}

const rail = (t) => {
    rail_section(t)
}

const rail_section = (t) => {
    var sprite_a = solid(get_meta().ponyo_stairs.railing, new transform (
        new Vector3(pixel.map(1),0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    ))
    sprite_a.set_transform(t)
    var sprite_a = solid(get_meta().ponyo_stairs.railing_cap, new transform (
        new Vector3(0,0,pixel.map(-2)),
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0))
    ))
    sprite_a.set_transform(t)
    var sprite_a = solid(get_meta().ponyo_stairs.railing, new transform (
        new Vector3(pixel.map(-1),0,0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0))
    ))
    sprite_a.set_transform(t)
}

export const step = (t, p) => {
    var lower_step_pos = p.clone();
    lower_step_pos.y -= pixel.map(1);
    lower_step_pos.z += pixel.map(3);
    var sprite_a = solid(get_meta().ponyo_stairs.step_bottom, new transform (
        lower_step_pos, 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 0))
    ))
    sprite_a.set_transform(t)

    var sprite_a = solid(get_meta().ponyo_stairs.step, new transform (
        p, 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)
    ))
    sprite_a.set_transform(t)

}