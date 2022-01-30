import { to, math, pixel} from '/meta/helpers/utils.js'
import * as THREE from '/build/three.module.js'

import { quaternion } from '/core/math/quaternion.js'
import { gameobject } from '/core/data/gameobject.js'
import { transform } from '/core/math/transform.js'

const map_rgba = (index, map_data) => {
    var red = map_data[(index * 4) + 0]
    var green = map_data[(index * 4) + 1]
    var blue = map_data[(index * 4) + 2]
    var alpha = map_data[(index* 4) + 3]

    return {r:red, g:green,b:blue,a:alpha}
}

/**
 * generates map data to mesh data
 * texture data [r,g,b,a]
 * @param {*} height_map 
 * @param {*} detial_map 
 * @param {*} size 
*/
export const texture_to_mesh = (height_map, detial_map, lod, build) => {
    if (lod > 6 || lod < 0) {
        console.error("LOD must be between 0 - 6")
        lod = 1
    }

    var top_left_x = (height_map.width - 1) / -2
    var top_left_z = (height_map.width - 1) / +2

    var increment = (lod == 0) ? 1 : lod * 2
    var vertices_per_line = Math.floor(((height_map.width - 1) / increment) + 1)
    
    var map_size = vertices_per_line * vertices_per_line

    var vertices = [(map_size) * 3]
    var indices = [(vertices_per_line - 1) * (vertices_per_line - 1) * 6]

    var normals = [map_size * 3]
    var uvs = [map_size * 2]

    var vertex_index = 0
    var triangle_index = 0
    var normals_index = 0
    var uv_index = 0

    var max_height = -Infinity

    for(var y = 0; y < height_map.height; y+= increment)
        for(var x = 0; x < height_map.width; x+= increment){
        
        var index = (x + (height_map.width) * y)
        var map_data = map_rgba(index, height_map.data)
        var height = math.easingFunctions.easeInOutCubic(math.normalize(0, 255, map_data.r)) * 1.45
      
        if (height > max_height){
            max_height = height
        }

        if(detial_map != undefined) {
            var details = map_rgba(index, detial_map.data)
            
            var base_x = top_left_x + x;
            var next_x = top_left_x + (x + 1);
            var centre_x = ((base_x + next_x) / 2);

            var next_z = top_left_z - (y + 1);
            var base_z = top_left_z - y;
            var centre_z = ((base_z + next_z) / 2)-4;

            var next_map_data = map_rgba(((x + 1) + (height_map.width) * (y+1)), height_map.data)
            var height_next = math.easingFunctions.easeInOutCubic(math.normalize(0, 255, next_map_data.r)) * 1.45

            var centre_height = (height + height_next) / 2;

            if(details.g > 100){
            }
        }
        
        var vertex_0 = (top_left_x + x) * 0.125
        var vertex_1 = height
        var vertex_2 = (top_left_z - y) * 0.125

        vertices[(vertex_index * 3) + 0] = vertex_0
        vertices[(vertex_index * 3) + 1] = vertex_1
        vertices[(vertex_index * 3) + 2] = vertex_2
        
        // ¯\_(ツ)_/¯
       // normals.push(0, 1, 0)
       normals[(normals_index * 3) + 0] = 0.0
       normals[(normals_index * 3) + 1] = 1.0
       normals[(normals_index * 3) + 2] = 0.0
       normals_index++

        uvs[(uv_index * 2) + 0] = (x/height_map.width)
        uvs[(uv_index * 2) + 1] = 1 - (y/height_map.height)
        uv_index++

        if(x < height_map.width - increment && y < height_map.height - increment){
            indices[(triangle_index * 6) + 0] = vertex_index
            indices[(triangle_index * 6) + 1] = vertex_index + vertices_per_line + 1
            indices[(triangle_index * 6) + 2] = vertex_index + vertices_per_line

            indices[(triangle_index * 6) + 3] = vertex_index + vertices_per_line + 1
            indices[(triangle_index * 6) + 4] = vertex_index
            indices[(triangle_index * 6) + 5] = vertex_index + 1

            triangle_index ++
        }

        vertex_index ++
    }

    var bufferGeometry = new THREE.BufferGeometry()

    bufferGeometry.setIndex(indices)
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    bufferGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    bufferGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

    bufferGeometry.computeTangents()
    bufferGeometry.computeVertexNormals()
    bufferGeometry.computeBoundingSphere()

    return bufferGeometry
}
 