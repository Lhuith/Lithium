import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { sprite, solid, particle } from '/nomads/components/decomposer.js'
import { get_meta } from '/core/data/antlion.js'
import { transform } from '/core/math/transform.js'
import { to, math , pixel} from '/meta/helpers/utils.js'

export const point = (t) => {
    var sprite_a = sprite(get_meta().point, new transform (
        new Vector3(0, 0, 0), 
        new Vector3(1,1,1), 
        new quaternion(0,0,0,1)))
    
    sprite_a.set_transform(t)
}