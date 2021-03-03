import { to, math, pixel} from '/meta/helpers/utils.js'
import * as THREE from '/build/three.module.js'

import { quaternion } from '/core/math/quaternion.js'
import { gameobject } from '/core/data/gameobject.js'
import { transform } from '/core/math/transform.js'

import { build_gazebo } from '/nomads/tests/gazebo.js'
import { box } from '/nomads/tests/box.js'
import { wheelchair } from '/nomads/tests/wheelchair.js'
import { pole, pole_T, pole_R, pole_M, pole_M_fence, pole_s, temp_inner_fence} from '/nomads/tests/pole.js'
import { bench } from '/nomads/tests/bench.js'
import { bush, tree, grass} from '/nomads/tests/flora.js'
import { steps } from '/nomads/tests/stairs.js'
import { point } from '/nomads/tests/point.js'

const gazebo_build = (h) => {
    build_gazebo( new transform(
        new THREE.Vector3(1.05,h - 0.01,-0.22),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 0, 0))
    ))
   wheelchair (
      new THREE.Vector3(5.6,0.55,0),
      new THREE.Vector3(1,1,1),
      new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 90, 0)))
   wheelchair (
       new THREE.Vector3(5.2,0.55,0.5),
       new THREE.Vector3(1,1,1),
       new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 80, 0)))
   wheelchair (
       new THREE.Vector3(4.9,0.55,0),
       new THREE.Vector3(1,1,1),
       new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 90, 0)))
   wheelchair (
           new THREE.Vector3(5.6,0.55,0.8),
           new THREE.Vector3(1,1,1),
           new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 65, 0)))
    bench (
    new transform(
        new THREE.Vector3(-1.2,h-0.15,-1.55),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, -25, 0))))
    pole_M_fence (
       new transform(
           new THREE.Vector3(1.75,0.15,-5.85),
           new THREE.Vector3(1,1,1),
           new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 90, 0)))
    , 15)
    pole_M (
        new transform(
            new THREE.Vector3(2.41,0,-5.17),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0,-30, 0))))
    pole (
        new transform(
            new THREE.Vector3(1.8,0.58,-5.6),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(40, 28, -90))))

    temp_inner_fence(0.22, -0.05);

    bush (
        new transform(
            new THREE.Vector3(-3.3,0.65,-1.5),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 0, 0))))
    tree (
        new transform(
            new THREE.Vector3(-1.75,0.77,-1.75),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 0, 5))))

    steps(new transform(
        new THREE.Vector3(2.55,1.15,-0.175),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 90, 0))), 11)

    steps(new transform(
        new THREE.Vector3(1,1.11,-2.45),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 180, 0))), 11)

    steps(new transform(
        new THREE.Vector3(1,0.44,-5.25),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 180, 0))), 5)
}

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

    console.log("verts length : ", vertices, "indices length: ", indices)

    var normals = [map_size * 3]
    var uvs = [map_size * 2]

    var vertex_index = 0
    var triangle_index = 0
    var normals_index = 0
    var uv_index = 0

    var cutoff = 0.4;
    // cloned for extrusion testing
    var vertices_copy = []
    var indices_copy = []
    var normals_copy = []
    var uvs_copy = []

    var vertex_copy_index = 0
    var triangle_copy_index = 0
    var normals_copy_index = 0
    var uvs_copy_index = 0

    var max_height = -Infinity

    for(var y = 0; y < height_map.height; y+= increment)
        for(var x = 0; x < height_map.width; x+= increment){
        
        var index = (x + (height_map.width) * y)
        var map_data = map_rgba(index, height_map.data)
        var height = math.easingFunctions.easeInOutCubic(math.normalize(0, 255, map_data.r)) * 1.45
      
        if (height > max_height){
            max_height = height
        }

        if(detial_map != undefined){
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
                //grass(
               //     new transform(
               //     new THREE.Vector3(
               //         (centre_x) * 0.125, 
               //         centre_height - pixel.map(12), 
               //         (centre_z) * 0.125), 
               //     new THREE.Vector3(1,1,1),
                //    new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(45 , 0, 0)//)))
            }
        }
        
        var vertex_0 = (top_left_x + x) * 0.125
        var vertex_1 = height
        var vertex_2 = (top_left_z - y) * 0.125

        // captured vertices past height
        if (height >= cutoff) {
            vertices_copy.push(vertex_0)
            vertices_copy.push(vertex_1)
            vertices_copy.push(vertex_2)

            vertex_copy_index++
        }

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

    if (build) gazebo_build(max_height)
    //console.log(vertices.length)
    var bufferGeometry = new THREE.BufferGeometry()

    bufferGeometry.setIndex(indices)
    bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    bufferGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    bufferGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

    var geo = new THREE.Geometry().fromBufferGeometry(bufferGeometry)
    geo.mergeVertices()
    geo.computeFaceNormals()
    geo.computeVertexNormals()
    geo.computeBoundingSphere()


    if(vertices_copy.length > 0 && build) {
        console.log(vertices_copy.length)
        
        //! Leaving it here
        //! leaving it here
        // need to create separated mesh for SOC style hair/grass
        for(var i = 0; i < vertices_copy.length; i+= 3){
            var index = i / 3;
        }
      
        console.log(indices_copy.length)
        var bufferGeometryCopy = new THREE.BufferGeometry()

        bufferGeometryCopy.setIndex(indices_copy)
        bufferGeometryCopy.setAttribute('position', new THREE.Float32BufferAttribute(vertices_copy, 3))
        bufferGeometryCopy.setAttribute('normal', new THREE.Float32BufferAttribute(normals_copy, 3))
        bufferGeometryCopy.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
       
        var geoCopy = new THREE.Geometry().fromBufferGeometry(bufferGeometryCopy)
        geoCopy.mergeVertices()
        geoCopy.computeFaceNormals()
        geoCopy.computeVertexNormals()
        geoCopy.computeBoundingSphere()
    }

    return geo
}
 