import { to, math } from '/meta/helpers/utils.js'
import * as THREE from '/build/three.module.js'

import { quaternion } from '/core/math/quaternion.js'
import { gameobject } from '/core/data/gameobject.js'
import { transform } from '/core/math/transform.js'

import { build_gazebo } from '/nomads/tests/gazebo.js'
import { box } from '/nomads/tests/box.js'
import { wheelchair } from '/nomads/tests/wheelchair.js'
import { pole, pole_T, pole_R, pole_M, pole_M_fence} from '/nomads/tests/pole.js'
import { bench } from '/nomads/tests/bench.js'

const gazebo_build = (h) => {
    build_gazebo( new transform(
        new THREE.Vector3(1.35,h - 0.01,-0.4),
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
        new THREE.Vector3(-1.31,h-0.05,-1.5),
        new THREE.Vector3(1,1,1),
        new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, -15, 0))))
    pole_M_fence (
       new transform(
           new THREE.Vector3(2.5,0.15,-6.0),
           new THREE.Vector3(1,1,1),
           new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0, 90, 0)))
    , 10)
    var pole_obj = pole (
        new transform(
            new THREE.Vector3(2.52,0.55,-5.75),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(40, 31, -90))))
            
    var pole_obj = pole_M (
        new transform(
            new THREE.Vector3(3.1,0,-5.36),
            new THREE.Vector3(1,1,1),
            new quaternion(0,0,0,1).eulerToQuaternion(new THREE.Vector3(0,-30, 0))))
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
      
        //if(map_data.b != undefined){
        //   
        //
        if (height > max_height){
            max_height = height
        }
//
        //    if (height == 0){
        //        height = -5
        //    }
        //} else {
        //    height = 10000
        //}
        
        //if(detial_map != undefined){
        //    var detials = map_rgba(index, detial_map.data)
//
        //    if(detials.g > 100){
        //        tree_01_create(new THREE.Vector3((top_left_x + x), height, (top_left_z - y)), //new quaternion())
        //    } else {
        //       
        //    }
        //}

        vertices[(vertex_index * 3) + 0] = (top_left_x + x) * 0.125
        vertices[(vertex_index * 3) + 1] = height
        vertices[(vertex_index * 3) + 2] = (top_left_z - y) * 0.125
        
        // ¯\_(ツ)_/¯
       // normals.push(0, 1, 0);
        normals[(normals_index * 3) + 0] = 0.0
        normals[(normals_index * 3) + 1] = 1.0
        normals[(normals_index * 3) + 2] = 0.0
        normals_index++

        uvs[(uv_index * 2) + 0] = (x/height_map.width)
        uvs[(uv_index * 2) + 1] = 1 - (y/height_map.height)
        uv_index++

        if(x < height_map.width - increment && y < height_map.height - increment){
            //console.log(vertex_index)
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

    return geo
}
 