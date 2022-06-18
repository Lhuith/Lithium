import { to, math, pixel} from '/core/meta/helpers/utils.js'
import * as THREE from '/build/three.module.js'

const map_rgba = (index, height) => {
    return {r:height[(index * 4) + 0], g:height[(index * 4) + 1],b:height[(index * 4) + 2],a:height[(index* 4) + 3]}
}

const color_from_height = (colorBuffer, height_value, index) => {
    let height_percentage = (height_value/255)

    if (height_percentage != 0 && height_percentage <= 0.2) {
        let brown = new THREE.Color( 0xa3672a);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.2 && height_percentage <= 0.3) {
        let brown = new THREE.Color( 0xa3672a);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.3 && height_percentage <= 0.4) {
        let brown = new THREE.Color( 0xbd8c5b);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.4 && height_percentage <= 0.5) {
        let brown = new THREE.Color( 0xcc9762);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.5 && height_percentage <= 0.6) {
        let brown = new THREE.Color( 0xedaf72);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.6 && height_percentage <= 0.7) {
        let brown = new THREE.Color( 0xa8f576);
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    } else if (height_percentage >= 0.9 && height_percentage <= 1.0) {
        let brown = new THREE.Color( 0xffffff );
        colorBuffer[(index * 4) + 0] = brown.r*255
        colorBuffer[(index * 4) + 1] = brown.g*255
        colorBuffer[(index * 4) + 2] = brown.b*255
        colorBuffer[(index * 4) + 3] = 255
    }
}

export const color_and_mesh_from_height = (height_map, detail_map, lod) => {
    if (lod > 6 || lod < 0) {
        console.error("LOD must be between 0 - 6")
        lod = 1 // imageData issue to resolve :(
    }
    let top_left_x = (height_map.width - 1) / -2
    let top_left_z = (height_map.width - 1) / +2

    let increment = 1//(lod == 0) ? 1 : lod * 2
    let vertices_per_line = Math.floor(((height_map.width - 1) / increment) + 1)
    
    let map_size = vertices_per_line * vertices_per_line
    let color_map = new Uint8ClampedArray(map_size*4)

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

    for(let y = 0; y < height_map.height; y+= increment) {
        for (let x = 0; x < height_map.width; x += increment) {

            let index = (x + (height_map.width) * y)
            let map_data = map_rgba(index, height_map.data)
            color_from_height(color_map, map_data.r, index)

            //easeInQuad
            let height = math.easingFunctions.easeInQuad(math.normalize(0, 255, map_data.r)) * 35

            if (height == 0 || map_data.r == 0) {
                height = -10
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

            uvs[(uv_index * 2) + 0] = (x / height_map.width)
            uvs[(uv_index * 2) + 1] = (y / height_map.height)
            uv_index++

            if (x < height_map.width - increment && y < height_map.height - increment) {
                indices[(triangle_index * 6) + 0] = vertex_index
                indices[(triangle_index * 6) + 1] = vertex_index + vertices_per_line + 1
                indices[(triangle_index * 6) + 2] = vertex_index + vertices_per_line

                indices[(triangle_index * 6) + 3] = vertex_index + vertices_per_line + 1
                indices[(triangle_index * 6) + 4] = vertex_index
                indices[(triangle_index * 6) + 5] = vertex_index + 1
                triangle_index++
            }
            vertex_index++
        }
    }
    let bufferGeometry = new THREE.BufferGeometry()

    bufferGeometry.setIndex(indices)
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    bufferGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    bufferGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

    bufferGeometry.computeTangents()
    bufferGeometry.computeVertexNormals()
    bufferGeometry.computeBoundingSphere()
    bufferGeometry.computeBoundingBox()

    return {geo: bufferGeometry, color_map: color_map}
}
 