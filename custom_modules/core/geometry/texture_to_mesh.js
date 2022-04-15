import { to, math, pixel} from '/meta/helpers/utils.js'
import * as THREE from '/build/three.module.js'

const map_rgba = (index, height, color) => {
    let red = height[(index * 4) + 0]
    let green = height[(index * 4) + 1]
    let blue = height[(index * 4) + 2]
    let alpha = height[(index* 4) + 3]


    // color map
    let redPercentage = (red/255)

    if (redPercentage < 0.1) {
        color[(index * 4) + 0] = 0
        color[(index * 4) + 1] = 0
        color[(index * 4) + 2] = 0
        color[(index * 4) + 3] = 1.0
    } else if (redPercentage > 0.1) {
        let brown = new THREE.Color( 0xffdba2 );
        color[(index * 4) + 0] = brown.r*255
        color[(index * 4) + 1] = brown.g*255
        color[(index * 4) + 2] = brown.b*255
        color[(index * 4) + 3] = 1.0
    }
    return {r:red, g:green,b:blue,a:alpha}
}

/**
 * generates map data to mesh data
 * texture data [r,g,b,a]
 * @param {*} height_map 
 * @param {*} detial_map 
 * @param {*} size 
*/
export const texture_to_mesh = (height_map, detial_map, lod) => {
    if (lod > 6 || lod < 0) {
        console.error("LOD must be between 0 - 6")
        lod = 1
    }
    let top_left_x = (height_map.width - 1) / -2
    let top_left_z = (height_map.width - 1) / +2

    let increment = 1//(lod == 0) ? 1 : lod * 2
    let vertices_per_line = Math.floor(((height_map.width - 1) / increment) + 1)
    
    let map_size = vertices_per_line * vertices_per_line
    let colorMap = new Uint8Array(map_size*4)

    // vertices
    let vertices = [(map_size) * 3]
    let vertex_index = 0

    // triangle indices
    let indices = [(vertices_per_line - 1) * (vertices_per_line - 1) * 6]
    let triangle_index = 0

    // normals
    let normals = [map_size * 3]
    let normals_index = 0

    // uvs
    let uvs = [map_size * 2]
    let uv_index = 0

    let max_height = -Infinity

    for(let y = 0; y < height_map.height; y+= increment)
        for(let x = 0; x < height_map.width; x+= increment){
        
        let index = (x + (height_map.width) * y)
        let map_data = map_rgba(index, height_map.data, colorMap)

        let height = math.easingFunctions.easeInOutCubic(math.normalize(0, 255, map_data.r))

        if (height > max_height){
            max_height = height
        }

        let vertex_0 = (top_left_x + x)
        let vertex_1 = height
        let vertex_2 = (top_left_z - y)

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

    let bufferGeometry = new THREE.BufferGeometry()

    bufferGeometry.setIndex(indices)
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    bufferGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    bufferGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

    bufferGeometry.computeTangents()
    bufferGeometry.computeVertexNormals()
    bufferGeometry.computeBoundingSphere()

    return {geo: bufferGeometry, colormap: colorMap}
}
 