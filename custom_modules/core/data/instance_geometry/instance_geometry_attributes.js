import { InstancedBufferAttribute, Vector4, Vector2, Vector3, Matrix4} from '/build/three.module.js'
import { math } from '/core/meta/helpers/utils.js'

export class instance_geometry_attributes {
    type = "instance_attributes"
    constructor(array, index){
        if(array != undefined) {
            console.warn("array was undefined, creating one instead.")
            this.populate(array, index)
        }
    }
    populate = (array, index) => {
        var states = []
        for(var i = 0; i < index; i++){
            states.push(false)
        }
        this.states =  new InstancedBufferAttribute(new Float32Array(states), 1)

        //this.translation = array[0] // ✓
        this.orientation = array[0] // ✓

        // color
        this.col = array[1] // ✓

        this.uvoffset = array[2] // ✓
        this.tile_size = array[3] // ✓
        this.scale = array[4] // ✓

        // animations
        this.animation_start = array[5] // ✓
        this.animation_end = array[6]  // ✓
        this.animation_time = array[7] // ✓
        
        this.render_type = array[8] // ✓
        this.fog = array[9] // ✓
        
        //transform
        this.m0 = array[10] // ✓
        this.m1 = array[11] // ✓
        this.m2 = array[12] // ✓
        this.m3 = array[13] // ✓

        this.index = 0
        this.max = index
    }
    set = (decomposer) => {
        var index = 0
    
        // grab the first empty slot in the buffer
        while (this.states.getX(index) != 0 && index < this.max){ index++ }
        
        this.states.setX(index, true)

        var uvs = decomposer.ssIndex[math.rounded_random_range(0, decomposer.ssIndex.length - 1)]
        this.set_uvoffset(index, uvs)

        this.set_tile_size(index, decomposer.tile_size)

        //var vector = new THREE.Vector4(
        //    decomposer.position.x, 
        //    decomposer.position.y, 
        //    decomposer.position.z, 0).normalize()
        //
        //
        //var translation = new THREE.Vector3(
        //    decomposer.position.x + vector.x, 
        //    decomposer.position.y + vector.y, 
        //    decomposer.position.z + vector.z
        //)
        //
        //this.set_translation(index, translation)
        this.set_orientation(index, decomposer.orient)
        this.set_scale(index, decomposer.scale)
        this.set_type(index, decomposer.render_type)
        this.set_fog(index, decomposer.fog)

        var col = decomposer.colors[math.rounded_random_range(0, decomposer.colors.length - 1)]
        var col_vector = new Vector4(col.r, col.g, col.b, 1.0)

        this.set_color(index, col_vector)

        this.set_transform(index, decomposer.matrix)
        decomposer.buffer_idx = index
    }
    unset = (index) => {
        //console.log("attributes being reset?", index)
        this.set_uvoffset(index, new Vector2(0,0))
        this.set_tile_size(index, new Vector2(0,0))
    
        this.set_orientation(index, new Vector4(0,0,0,0))
        this.set_scale(index, new Vector3(1,1,1))
        this.set_type(index, 0)
        this.set_fog(index, 0)
        var col_vector = new Vector3(0, 0, 0)
        this.set_color(index, col_vector)
    
        //this.set_animation(index, )
        this.set_transform(index, new Matrix4())
        this.states.setX(index, false)
    }
    set_uvoffset = (index, uv) => {
        this.uvoffset.setXY(index, uv.x, uv.y)
        this.uvoffset.needsUpdate = true
    }
    set_tile_size = (index, ts) => {
        this.tile_size.setXY(index, ts.x, ts.y)
        this.tile_size.needsUpdate = true
    }
    set_translation = (index, t) => {
        this.translation.setXYZ(index, t.x, t.y, t.z)
        this.translation.needsUpdate = true
    }
    set_orientation = (index, o) => {
        this.orientation.setXYZW(index, o.x, o.y, o.z, o.w)
        this.orientation.needsUpdate = true
    }
    set_scale = (index, s) => {
        this.scale.setXYZ(index, s.x, s.y, s.z)
        this.scale.needsUpdate = true
    }
    set_type = (index, type) => {
        this.render_type.setX(index, type)
        this.render_type.needsUpdate = true
    }
    set_fog = (index, fog) => {
        this.fog.setX(index, fog)
        this.fog.needsUpdate = true
    }
    set_color = (index, col) => {
        this.col.setXYZW(index, col.x, col.y, col.z, col.w)
        this.col.needsUpdate = true
    }
    set_alpha = (index, alpha) => {
        this.col.setW(index, alpha)
        this.col.needsUpdate = true
    }
    set_animation = (index, s, e, t) => {
        this.animation_start.setX  (index, s)
        this.animation_end.setX  (index, e)
        this.animation_time.setX  (index, t)
    
        this.animation_start.needsUpdate = true
        this.animation_end.needsUpdate = true
        this.animation_time.needsUpdate = true
    }

    set_transform = (index, matrix) => {
        this.m0.setXYZW(
            index,  
            matrix.elements[0],
            matrix.elements[1],
            matrix.elements[2],
            matrix.elements[3]
        )
        this.m1.setXYZW(
            index,  
            matrix.elements[4],
            matrix.elements[5],
            matrix.elements[6],
            matrix.elements[7]
        )
        this.m2.setXYZW(
            index,  
            matrix.elements[8],
            matrix.elements[9],
            matrix.elements[10],
            matrix.elements[11]
        )
        this.m3.setXYZW(
            index,  
            matrix.elements[12],
            matrix.elements[13],
            matrix.elements[14],
            matrix.elements[15]
        )
        this.m0.needsUpdate = true
        this.m1.needsUpdate = true
        this.m2.needsUpdate = true
        this.m3.needsUpdate = true
    }
}