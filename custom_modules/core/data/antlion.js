// data after being processed
import {image_meta}  from '/nomads/meta/image_meta.js'
import * as THREE from 'three'
import {img, is} from '/core/meta/helpers/utils.js'
import sprite_meta from '/nomads/meta/sprite_meta.json' assert { type: "json" }
import input_meta from '/nomads/meta/input_meta.json' assert { type: "json" }
import {render_meta} from '/nomads/meta/render_meta.js'
import {instance_geometry_renderer} from '/core/data/instance_geometry/instance_geometry_renderer.js'
import * as file from '/core/meta/helpers/ajax.js'


let compiled = []

// ensure nothing else interfaces as resources are loading
let DONE = false

let async_time = 0
let elapsed_time = 0

let map_index = 0
let renderers = new Map()
let completed = []
// init function of actual program 
let bootstrap = null

// used to grab all outside resources for the game since all resources
// are async and require some to be compiled
export const init = (bs) => {
    console.groupCollapsed("%cAntlion Initialized", "color:#F28022")
    //console.log()
    DONE = false

    load_game()
    load_renderers()

    bootstrap = bs
    async_time = Date.now()
    fall(image_meta.length - 1, [])
}

// TODO clean up after everything is confirmed to work
const load_renderers = () => {
    for(let i = 0; i < render_meta.length; i++){
        let renderer = new instance_geometry_renderer(
            i, render_meta[i].animate, render_meta[i].is3D,
        )
        renderers.set(render_meta[i].name, renderer)
        file.get({id: render_meta[i].name}, ajax_callback, render_meta[i].name)
    }
}

const bake_renderers = (completed) => {
    renderers.forEach(function(values, key){
        values.bake_attributes(JSON.parse(get_data(key).data))
    })
}

const fall = (i, data) => {
    // onload function will pass on to done
    if (i < 0) {return}

    // catch data dropping in from previse call, except the first init
    if(data.length !== 0) {completed.push(data)}
    // Keep falling baby
    if(image_meta[i].type == "s"){
        shader_loader(image_meta[i].name, image_meta[i].vert, image_meta[i].frag, image_meta[i].extra,
            (i == 0) ? done : fall, i - 1)
    } else if(image_meta[i].type == "t"){
        texture_loader(image_meta[i].name, image_meta[i].color, image_meta[i].height, image_meta[i].detail,
            (i == 0) ? done : fall, i - 1)
    } else if(image_meta[i].type == "m"){
        map_texture_loader(image_meta[i].name, image_meta[i].url, map_index++,
            (i == 0) ? done : fall, i - 1)
    }
    load_in_message(image_meta[i].name, i)
}

const load_in_message = (name, i) => {
    console.log("%cloading in "+ name, 'color: #FA'+i.toString(16)+i.toString(16)+'00')
}

const load_game = () => {
    file.get({ id: "player" }, ajax_callback, "player")
    load_renderers_state(ajax_callback)
}

export const save_game = () => {
    console.log("%cAntlion Saving Game", "color:#F28022")
    save_renderers_state()
}

const ajax_callback = (e, n) => {
    load_in_message(n + " data", 5)
    completed.push({name:n, data: e})
}

// push the last data, and flag for done
const done = (i, data) => {
    DONE = true
    completed.push(data)
    
    elapsed_time = Date.now() - async_time

    bake_renderers()

    // start up init after data loaded
    console.log("%cAntlion Completed in "+ elapsed_time*0.000001+" seconds", "color:#FF9900")
    console.groupEnd()
    bootstrap(completed)
}

// Credit to THeK3nger - https://gist.github.com/THeK3nger/300b6a62b923c913223fbd29c8b5ac73
// Sorry to any soul that bares witness to this Abomination....May the gods have mercy on me
const shader_loader = (name, vertex_url, fragment_url, custom, onLoad, i, onProgress, onError) => {
    let vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
    vertex_loader.setResponseType('text')
    vertex_loader.load(vertex_url, function (vertex_text) {
        let fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
        fragment_loader.setResponseType('text')
        fragment_loader.load(fragment_url, function (fragment_text) {
            let shadow_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
            shadow_loader.setResponseType('text')
            shadow_loader.load("/core/shaders/shadow.glsl", function (shadow_text) {
                let dither_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
                dither_loader.setResponseType('text')
                dither_loader.load("/core/shaders/dither.glsl", function (dither_text) {
                    onLoad(i, {name: name, extra: custom, vert: shader_parse(vertex_text, shadow_text, dither_text), frag: shader_parse(fragment_text, shadow_text, dither_text) })
                })
            })
        })
    }, onProgress, onError)
}

const texture_loader  = (name, urlc, urlh, urld, onLoad, i, onProgress, onError) => {
    let texture_c = new THREE.TextureLoader().load(urlc, function (event) {
        let texture_h = new THREE.TextureLoader().load(urlh, function (event) {
            let image_data = img.get_image_data(texture_h.image)
            let texture_d = new THREE.TextureLoader().load(urld, function (event) {
                let detail_data = img.get_image_data(texture_d.image)

                texture_c.magFilter = THREE.NearestFilter
                texture_c.minFilter = THREE.NearestFilter

                texture_h.magFilter = THREE.NearestFilter
                texture_h.minFilter = THREE.NearestFilter

                detail_data.magFilter = THREE.NearestFilter
                detail_data.minFilter = THREE.NearestFilter

                texture_d.magFilter = THREE.NearestFilter
                texture_d.minFilter = THREE.NearestFilter

                onLoad(i, {
                    name: name,
                    color: texture_c,
                    height: image_data,
                    detail: detail_data,
                    detail_test: texture_d
                }, onProgress, onError)
            })
        })
    })
}

const map_texture_loader = (name, url, index, onLoad, i, onProgress, onError) => {
    let texture = new THREE.TextureLoader().load(url, function () {
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        onLoad(i, {name:name, index:index, map: texture}, onProgress, onError)
    })
}

//Yummy Yum Yum
const shader_parse = (glsl, shadow_text, dither_text) => {
    let text = glsl.replace("AddShadow", shadow_text)
    text = text.replace("AddDither", dither_text)
    return text
}

export const get_data = (key) => {
    if(is.string(key)){
        for(let i = 0; i < completed.length; i++){
            if(completed[i].name == key){return completed[i]}
        }

    } else if(is.num(key)){
        for(let i = 0; i < completed.length; i++){
            if(completed[i].index != null){
                    if(completed[i].index == key){return completed[i]}
            }
        }
    }
}

export const get_sprite_meta = () => {
    return sprite_meta
}

export const get_input_meta = () => {
    return input_meta
}

export const get_renderers = () => {
    return renderers
}

export const get_renderer = (key) => {
    return renderers.get(key + "_render_meta")
}

export const save_renderers_state = () => {
    renderers.forEach(function(values,key){
        values.save_attributes()
    })
}

export const load_renderers_state = (call_back) => {
    renderers.forEach(function(values){
        values.load_attributes(call_back)
    })
}
