import { Vector3, Euler } from '/build/three.module.js'
import { gameobject } from '/core/data/gameobject.js'
import { quaternion } from '/core/math/quaternion.js'
import { solid } from '/nomads/components/decomposer.js'
import { get_sprite_meta } from '/core/data/antlion.js'
import {arrow} from "./arrow.js"

export const arrow_widget = (pos, scale, rotation) => {
    let arrow_container = new gameobject("box", pos, scale, rotation)

    let arrow_z = arrow(new Vector3(0,0,0.3), new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 0, 90)), "#0000FF" )
    arrow_container.add_child(arrow_z)

    let arrow_y = arrow(new Vector3(0,0.3,0), new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 90, 0)), "#00FF00" )
    arrow_container.add_child(arrow_y)

    let arrow_x = arrow(new Vector3(0.3,0,0), new Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(90, 90, 0)), "#FF0000" )
    arrow_container.add_child(arrow_x)

    return arrow_container
}